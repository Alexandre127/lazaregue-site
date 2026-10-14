import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ENTREES, MAX_FICHIERS } from "@/app/rejoindre-le-cabinet/data/entrees";

/**
 * Traitement serveur du formulaire de candidature (/rejoindre-le-cabinet).
 *
 * Même mécanisme que /api/contact — SMTP de la messagerie du cabinet, aucune
 * copie conservée en base — mais route DISTINCTE, pour que les candidatures
 * arrivent identifiées comme telles et séparées des demandes clients :
 *  · objet préfixé « [Candidature] » ;
 *  · AUCUN enregistrement HubSpot (le CRM est réservé aux prospects) ;
 *  · AUCUN e-mail automatique au candidat (décision du cabinet, 14 oct. 2026) :
 *    seule la confirmation à l'écran l'informe de la réception ;
 *  · aucun tri ni classement automatisé : le message est transmis tel quel.
 *
 * Les deux PDF (CV obligatoire, exemple de travail facultatif) sont joints à
 * l'e-mail : aucun service de stockage. Plafond de 4 Mo au total, sous la
 * limite de 4,5 Mo que Vercel impose au corps d'une requête.
 *
 * Variables d'environnement : celles de /api/contact (SMTP_*, CONTACT_TO,
 * CONTACT_FROM), plus CANDIDATURE_TO (destinataire des candidatures ; défaut =
 * CONTACT_TO, puis contact@lazaregue-avocats.fr).
 *
 * Région d'exécution : Paris (cdg1), fixée pour toutes les fonctions dans
 * vercel.json — l'export `preferredRegion` est déprécié dans cette version de
 * Next et n'accepte plus de code de région sur le runtime Node.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIBELLES = ENTREES.map((e) => e.formulaire);
const EMAIL_RE = /^[^@\s]{1,64}@[^@\s]{1,255}\.[^@\s]{2,}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
// Marge pour les champs texte et l'enveloppe multipart, au-delà des fichiers.
const MAX_BODY = MAX_FICHIERS + 64 * 1024;

function clean(v: unknown, max: number): string {
  return String(v ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

/* Limitation en mémoire par IP — BEST-EFFORT, comme sur /api/contact (les
   fonctions serverless sont éphémères et multi-instances). */
const HITS = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_HITS = 5;
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (HITS.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  HITS.set(ip, arr);
  if (HITS.size > 5000) for (const k of HITS.keys()) { HITS.delete(k); if (HITS.size <= 2500) break; }
  return arr.length > MAX_HITS;
}

function esc(s: string): string {
  return s.replace(/[<>&]/g, (c) => (c === "<" ? "&lt;" : c === ">" ? "&gt;" : "&amp;"));
}

/** Vrai PDF : signature « %PDF- » en tête de fichier (le type MIME déclaré
 *  par le navigateur ne suffit pas). */
async function lirePdf(f: File): Promise<Buffer | null> {
  const buf = Buffer.from(await f.arrayBuffer());
  return buf.subarray(0, 5).toString("latin1") === "%PDF-" ? buf : null;
}

/** Nom de pièce jointe sûr : lettres, chiffres, espaces et tirets. */
function nomFichier(prefixe: string, nom: string): string {
  const base = nom.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9 -]/g, "").trim();
  return `${prefixe} - ${base || "candidat"}.pdf`;
}

export async function POST(req: Request) {
  const declared = Number(req.headers.get("content-length") || 0);
  if (declared > MAX_BODY) {
    return NextResponse.json(
      { ok: false, error: "Les fichiers dépassent 4 Mo au total pour les deux fichiers." },
      { status: 413 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Requête invalide." }, { status: 400 });
  }

  // Champ piège : rempli = robot. Réponse 200 sans rien envoyer.
  const piege = form.get("website");
  if (typeof piege === "string" && piege.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "inconnu";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Trop d'envois depuis cette connexion. Réessayez plus tard." },
      { status: 429 },
    );
  }

  const entree = clean(form.get("entree"), 80);
  const nom = clean(form.get("nom"), 120);
  const email = clean(form.get("email"), 254).toLowerCase();
  const disponibilite = clean(form.get("disponibilite"), 10);
  const mention = form.get("mention") === "oui";
  const cv = form.get("cv");
  const travail = form.get("travail");
  const cvFichier = cv instanceof File && cv.size > 0 ? cv : null;
  const travailFichier = travail instanceof File && travail.size > 0 ? travail : null;

  const invalides: string[] = [];
  if (!LIBELLES.includes(entree)) invalides.push("entree");
  if (!nom) invalides.push("nom");
  if (!EMAIL_RE.test(email)) invalides.push("email");
  if (!DATE_RE.test(disponibilite)) invalides.push("disponibilite");
  if (!mention) invalides.push("mention");
  if (!cvFichier) invalides.push("cv");
  if (invalides.length) {
    return NextResponse.json({ ok: false, error: "Champs invalides.", invalides }, { status: 422 });
  }

  if ((cvFichier?.size ?? 0) + (travailFichier?.size ?? 0) > MAX_FICHIERS) {
    return NextResponse.json(
      { ok: false, error: "Les fichiers dépassent 4 Mo au total pour les deux fichiers." },
      { status: 413 },
    );
  }

  const cvPdf = await lirePdf(cvFichier!);
  const travailPdf = travailFichier ? await lirePdf(travailFichier) : null;
  if (!cvPdf || (travailFichier && !travailPdf)) {
    return NextResponse.json(
      { ok: false, error: "Seuls les fichiers PDF sont acceptés.", invalides: [!cvPdf ? "cv" : "travail"] },
      { status: 422 },
    );
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    return NextResponse.json(
      { ok: false, error: "Le service d'envoi n'est pas encore configuré." },
      { status: 503 },
    );
  }

  const to = process.env.CANDIDATURE_TO || process.env.CONTACT_TO || "contact@lazaregue-avocats.fr";
  const from = process.env.CONTACT_FROM || user;

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  const lignes = [
    "Candidature déposée sur /rejoindre-le-cabinet",
    "",
    `Entrée visée : ${entree}`,
    `Prénom et nom : ${nom}`,
    `Adresse électronique : ${email}`,
    `Disponibilité : ${disponibilite.split("-").reverse().join("/")}`,
    `Curriculum vitæ : joint`,
    `Exemple de travail personnel : ${travailPdf ? "joint" : "non fourni"}`,
    "Mention d'information : prise de connaissance confirmée",
  ];

  const pieces = [{ filename: nomFichier("CV", nom), content: cvPdf, contentType: "application/pdf" }];
  if (travailPdf) {
    pieces.push({ filename: nomFichier("Travail", nom), content: travailPdf, contentType: "application/pdf" });
  }

  try {
    await transporter.sendMail({
      from: `"Candidatures lazaregue-avocats.fr" <${from}>`,
      to,
      replyTo: `"${nom.replace(/"/g, "")}" <${email}>`,
      subject: `[Candidature] ${entree} — ${nom}`,
      text: lignes.join("\n"),
      html: `<p>${lignes.map((l) => esc(l)).join("<br>")}</p>`,
      attachments: pieces,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "L'envoi a échoué. Réessayez dans quelques instants." },
      { status: 502 },
    );
  }
}
