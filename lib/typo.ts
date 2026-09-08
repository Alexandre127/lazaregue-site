/**
 * Composition typographique française.
 *
 * En français, les signes de ponctuation « doubles » (? ! ; ») et le guillemet
 * ouvrant (« ) prennent une espace fine insécable (U+202F). Une espace
 * ordinaire y autoriserait la césure, laissant le signe seul en début ou en
 * fin de ligne — défaut visible sur les titres en écran étroit.
 *
 * `fr()` normalise ces espaces : toute espace déjà présente (ordinaire,
 * insécable classique U+00A0 ou fine U+202F) est ramenée à une espace fine
 * insécable ; si le signe suit directement un mot sans espace, l'espace fine
 * est insérée. La fonction est idempotente et ne touche pas aux suites de
 * ponctuation (« ?! », « !! ») ni aux signes précédés d'une parenthèse ou
 * d'un guillemet ouvrant.
 *
 * On n'utilise pas `&nbsp;` (U+00A0) : l'espace insécable ordinaire est trop
 * large devant un signe double.
 */
const THIN = " "; // espace fine insécable
const SPACES = "[\\u0020\\u00A0\\u202F]*"; // toute espace, éventuelle

const BEFORE_DOUBLE = new RegExp(`([^\\s([{«!?;:.,»])${SPACES}([?!;»])`, "g");
const AFTER_OPEN = new RegExp(`(«)${SPACES}`, "g");

export function fr(input: string): string {
  return input.replace(BEFORE_DOUBLE, `$1${THIN}$2`).replace(AFTER_OPEN, `$1${THIN}`);
}
