import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

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
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/* Anti-spam discret : limitation en mémoire par IP (best-effort ; les fonctions
   serverless sont éphémères, c'est une barrière simple, pas une garantie). */
const HITS = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  HITS.set(ip, arr);
  return arr.length > MAX_HITS;
}

function esc(s: string): string {
  return s.replace(/[<>&]/g, (c) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"));
}

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
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

  const objet = String(data.objet ?? "").trim();
  const urgence = String(data.urgence ?? "").trim();
  const echeance = String(data.echeance ?? "").trim();
  const nom = String(data.nom ?? "").trim();
  const org = String(data.org ?? "").trim();
  const email = String(data.email ?? "").trim();
  const tel = String(data.tel ?? "").trim();
  const message = String(data.message ?? "").trim();

  const invalides: string[] = [];
  if (!OBJETS.includes(objet)) invalides.push("objet");
  if (!URGENCES.includes(urgence as (typeof URGENCES)[number])) invalides.push("urgence");
  if (!nom) invalides.push("nom");
  if (!EMAIL_RE.test(email)) invalides.push("email");
  if (message.length < 10 || message.length > 2000) invalides.push("message");
  if (invalides.length) {
    return NextResponse.json({ ok: false, error: "Champs invalides.", invalides }, { status: 422 });
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    // Service non configuré : on le signale clairement pour que le client
    // conserve la saisie et propose téléphone + e-mail.
    return NextResponse.json(
      { ok: false, error: "Le service d'envoi n'est pas encore configuré." },
      { status: 503 },
    );
  }

  const to = process.env.CONTACT_TO || "contact@lazaregue-avocats.fr";
  const from = process.env.CONTACT_FROM || user;
  const urgenceLabel =
    urgence === "incident"
      ? "Incident ou contentieux en cours"
      : urgence === "echeance"
        ? "Une échéance approche"
        : "Projet ou demande de conseil";

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
        "Nous avons bien reçu votre demande. Un avocat du cabinet l'examine et vous recontactera dans les 24 heures ouvrées.",
        "",
        "En cas d'urgence, vous pouvez appeler le cabinet au 01 81 70 62 00 (du lundi au vendredi, 9 h – 19 h).",
        "",
        "Cet e-mail confirme la réception de votre message ; il ne vaut pas acceptation du dossier ni création d'une relation avocat-client.",
        "",
        "Lazarègue Avocats — 18 rue de Tilsitt, 75017 Paris",
      ].join("\n"),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué. Réessayez, ou contactez le cabinet par téléphone ou e-mail." },
      { status: 502 },
    );
  }
}
