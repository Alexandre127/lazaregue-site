import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { upsertContact } from "@/lib/hubspot";

/**
 * Traitement serveur du formulaire de contact.
 *
 * Choix retenu (21 sept. 2026) : envoi par le SMTP de la messagerie du cabinet
 * (IONOS/OVH), donc AUCUNE donnée chez un tiers supplémentaire et AUCUNE copie
 * conservée en base — le message ne fait que transiter par le SMTP du cabinet.
 * Les identifiants SMTP sont fournis par des variables d'environnement Vercel
 * (jamais en dur, jamais lues par l'assistant) :
 *   SMTP_HOST, SMTP_PORT, SMTP_SECURE ("true"/"false"), SMTP_USER, SMTP_PASS
 *   CONTACT_TO   (destinataire ; défaut contact@lazaregue-avocats.fr)
 *   CONTACT_FROM (expéditeur d'enveloppe ; défaut = SMTP_USER)
 *
 * nodemailer impose le runtime Node (pas Edge).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OBJETS = [
  "RGPD et données personnelles",
  "Intelligence artificielle et AI Act",
  "Cybersécurité et NIS 2",
  "Contrats informatiques",
  "Fusions-acquisitions technologiques",
  "Crypto-actifs et blockchain",
  "Contentieux informatique et commercial",
  "Cyberattaques et cybercriminalité",
  "Fraude bancaire et escroquerie en ligne",
  "Diffamation et retrait de contenus",
  "Autre demande",
];
const URGENCES = ["non", "echeance", "incident"] as const;
// Validation d'adresse e-mail : structure locale@domaine.tld, sans espace,
// longueur bornée. Volontairement simple (la seule preuve réelle d'une adresse
// est l'envoi ; on ne cherche qu'à écarter les saisies manifestement invalides).
const EMAIL_RE = /^[^@\s]{1,64}@[^@\s]{1,255}\.[^@\s]{2,}$/;

// Tailles maximales par champ et pour le corps entier (anti-abus). Au-delà, la
// requête est rejetée avec un message générique, sans détail technique.
const MAX = {
  nom: 120,
  org: 160,
  email: 254,
  tel: 40,
  echeance: 120,
  message: 2000,
  page: 300,
  utm: 150,
  body: 16 * 1024, // 16 Ko : très au-dessus d'un message légitime.
} as const;

// Signal anti-spam : nombre de liens dans le message. Utilisé comme INDICE, pas
// comme motif unique de rejet d'un vrai prospect (seuil élevé).
const LINK_RE = /https?:\/\/|www\.|\[url|<a\s/gi;
const MAX_LINKS = 8;

// Normalise une saisie : espaces condensés, bornée en longueur.
function clean(v: unknown, max: number): string {
  return String(v ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/* Anti-spam discret : limitation en mémoire par IP (BEST-EFFORT uniquement ;
   les fonctions serverless Vercel sont éphémères et multi-instances, ce compteur
   n'est donc PAS fiable d'une instance à l'autre). La protection réelle doit se
   faire au niveau du pare-feu Vercel (règle de rate limiting sur /api/contact) —
   voir le rapport. Cette barrière reste utile contre les rafales sur une même
   instance chaude. */
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000; // 1 heure
const MAX_HITS = 5; // 5 envois / heure / IP (best-effort)
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  HITS.set(ip, arr);
  // Garde la table bornée (évite une croissance mémoire non maîtrisée).
  if (HITS.size > 5000) for (const k of HITS.keys()) { HITS.delete(k); if (HITS.size <= 2500) break; }
  return arr.length > MAX_HITS;
}

function esc(s: string): string {
  return s.replace(/[<>&]/g, (c) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"));
}

export async function POST(req: Request) {
  // Garde-fou de taille : refuse un corps anormalement gros AVANT tout parsing
  // (protection mémoire/CPU). Message générique, sans détail.
  const declared = Number(req.headers.get("content-length") || 0);
  if (declared > MAX.body) {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 413 });
  }
  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  if (raw.length > MAX.body) {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 413 });
  }
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }
  if (typeof data !== "object" || data === null) {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Champ piège : rempli = robot. On répond 200 sans rien envoyer.
  if (typeof data.website === "string" && data.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "inconnu";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Trop de demandes envoyées. Réessayez dans quelques minutes ou appelez le cabinet." },
      { status: 429 },
    );
  }

  // Extraction + normalisation (espaces condensés, bornes de longueur). Le
  // message garde ses sauts de ligne (lisibilité) ; les autres champs non.
  const objet = clean(data.objet, 120);
  const urgence = clean(data.urgence, 20);
  const echeance = clean(data.echeance, MAX.echeance);
  const nom = clean(data.nom, MAX.nom);
  const org = clean(data.org, MAX.org);
  const email = clean(data.email, MAX.email).toLowerCase();
  const tel = clean(data.tel, MAX.tel);
  const message = String(data.message ?? "").replace(/\r\n/g, "\n").trim().slice(0, MAX.message);
  const page = clean(data.page, MAX.page);
  const rawUtm = (data.utm && typeof data.utm === "object" ? data.utm : {}) as Record<string, unknown>;
  const utm = {
    source: clean(rawUtm.source, MAX.utm) || undefined,
    medium: clean(rawUtm.medium, MAX.utm) || undefined,
    campaign: clean(rawUtm.campaign, MAX.utm) || undefined,
    term: clean(rawUtm.term, MAX.utm) || undefined,
    content: clean(rawUtm.content, MAX.utm) || undefined,
  };

  const invalides: string[] = [];
  if (!OBJETS.includes(objet)) invalides.push("objet");
  if (!URGENCES.includes(urgence as (typeof URGENCES)[number])) invalides.push("urgence");
  if (!nom) invalides.push("nom");
  if (!EMAIL_RE.test(email)) invalides.push("email");
  if (message.length < 10) invalides.push("message");
  if (invalides.length) {
    return NextResponse.json({ ok: false, error: "Champs invalides.", invalides }, { status: 422 });
  }

  // Indice anti-spam : un message truffé de liens est très probablement du spam.
  // Seuil ÉLEVÉ pour ne pas écarter un prospect légitime (qui met rarement plus
  // de huit liens). Réponse 200 silencieuse : on n'informe pas le robot.
  const liens = (message.match(LINK_RE) || []).length;
  if (liens > MAX_LINKS) {
    return NextResponse.json({ ok: true });
  }

  const urgenceLabel =
    urgence === "incident"
      ? "Incident ou contentieux en cours"
      : urgence === "echeance"
        ? "Une échéance approche"
        : "Projet ou demande de conseil";

  // Enregistrement dans le CRM HubSpot : côté serveur, donc INDÉPENDANT des
  // cookies et du choix de consentement (il a lieu même après « Tout refuser »).
  // Démarré ici et attendu avant chaque réponse, pour qu'il aboutisse même si
  // l'instance serverless se fige juste après la réponse. Ne bloque JAMAIS
  // l'e-mail : toute erreur est seulement journalisée.
  const crm = upsertContact({
    email,
    nom,
    org,
    tel,
    objet,
    urgenceLabel,
    echeance,
    message,
    page,
    utm,
  })
    .then((r) => {
      if (!r.ok) console.error("[contact] HubSpot:", r.reason);
      return r;
    })
    .catch((e) => {
      console.error("[contact] HubSpot:", e);
      return { ok: false as const };
    });

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    // Service d'e-mail non configuré : la capture CRM a tout de même lieu.
    await crm;
    return NextResponse.json(
      { ok: false, error: "Le service d'envoi n'est pas encore configuré." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO || "contact@lazaregue-avocats.fr";
  const from = process.env.CONTACT_FROM || user;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  const lignes = [
    `Objet : ${objet}`,
    `Urgence : ${urgenceLabel}`,
    echeance ? `Prochaine échéance : ${echeance}` : null,
    `Nom et prénom : ${nom}`,
    org ? `Entreprise ou organisation : ${org}` : null,
    `E-mail : ${email}`,
    tel ? `Téléphone : ${tel}` : null,
    "",
    "Situation décrite :",
    message,
  ].filter(Boolean) as string[];

  try {
    // 1) Demande au cabinet (reply-to = le demandeur).
    await transporter.sendMail({
      from: `"Formulaire lazaregue-avocats.fr" <${from}>`,
      to,
      replyTo: `"${nom}" <${email}>`,
      subject: `Nouvelle demande — ${objet}${urgence !== "non" ? " (urgent)" : ""}`,
      text: lignes.join("\n"),
      html: `<p>${lignes.map((l) => esc(l)).join("<br>")}</p>`,
    });

    // 2) Accusé de réception au demandeur.
    await transporter.sendMail({
      from: `"Lazarègue Avocats" <${from}>`,
      to: `"${nom}" <${email}>`,
      subject: "Votre demande a bien été reçue — Lazarègue Avocats",
      text: [
        `Bonjour ${nom},`,
        "",
        "Nous avons bien reçu votre demande. Un avocat du cabinet l'examine et vous recontactera.",
        "",
        "En cas d'urgence, vous pouvez appeler le cabinet au 01 81 70 62 00 (du lundi au vendredi, 9 h – 19 h).",
        "",
        "Cet e-mail confirme la réception de votre message ; il ne vaut pas acceptation du dossier ni création d'une relation avocat-client.",
        "",
        "Lazarègue Avocats — 18 rue de Tilsitt, 75017 Paris",
      ].join("\n"),
    });

    await crm;
    return NextResponse.json({ ok: true });
  } catch {
    // L'e-mail a échoué : la capture CRM, elle, a pu aboutir — on l'attend.
    await crm;
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué. Réessayez, ou contactez le cabinet par téléphone ou e-mail." },
      { status: 502 },
    );
  }
}
