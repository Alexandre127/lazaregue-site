import fs from "node:fs";
import path from "node:path";
import { article } from "./articles";

/**
 * Temps de lecture CALCULÉ (jamais saisi) : nombre de mots du corps de la page
 * + chapô + « L'essentiel » + FAQ, à 230 mots par minute. Lu dans le fichier
 * source au moment du rendu serveur (pages statiques : au build). Si le fichier
 * n'est pas lisible, renvoie null et rien ne s'affiche.
 */
const MOTS_PAR_MINUTE = 230;

const compter = (texte: string) => texte.split(/\s+/).filter((m) => /[\p{L}\d]/u.test(m)).length;

export function minutesDeLecture(slug: string): number | null {
  let source: string;
  try {
    source = fs.readFileSync(path.join(process.cwd(), "app", "ressources", slug, "page.tsx"), "utf8");
  } catch {
    return null;
  }
  const debut = source.indexOf("<ArticleLayout");
  if (debut < 0) return null;
  const corps = source
    .slice(debut)
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ") // commentaires JSX
    .replace(/\b(className|href|id|src|alt|sizes|style|target|rel|slug|key)=(\{[^}]*\}+|"[^"]*")/g, " ") // attributs techniques
    .replace(/<\/?[A-Za-z][\w.]*|\/?>/g, " ") // balises (les attributs de contenu restent comptés)
    .replace(/&[a-z]+;/g, "'")
    .replace(/[{}=]/g, " ");
  const a = article(slug);
  const mots = compter(corps) + compter([a.chapo, ...a.essentiel, ...a.faq.flatMap((f) => [f.q, f.a])].join(" "));
  return Math.max(1, Math.round(mots / MOTS_PAR_MINUTE));
}
