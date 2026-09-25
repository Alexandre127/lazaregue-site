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
 * Deux-points, « NIS 2 », « art./article N » et numéros de téléphone reçoivent
 * une espace insécable ORDINAIRE (U+00A0), plus adaptée qu'une fine à une
 * liaison mot-signe ou mot-nombre :
 *  - « : » : seulement là où une espace existe déjà (les heures « 10:30 » et les
 *    URL « http://… » n'ont pas d'espace avant le « : » et ne sont pas touchées) ;
 *  - « NIS 2 », « art. N », « article N » : le nombre est lié au terme ;
 *  - « 01 81 70 62 00 » : les groupes du numéro de téléphone sont liés.
 * On n'utilise pas la fine devant un signe double via `&nbsp;` : elle serait
 * trop large.
 */
const THIN = " "; // espace fine insécable
const NB = " "; // espace insécable ordinaire
const SP = "[\\u0020\\u00A0\\u202F]"; // une espace (ordinaire, insécable ou fine)
const SPACES = SP + "*"; // toute espace, éventuelle

// Signes doubles ? ! ; et guillemet fermant » : espace fine insécable.
const BEFORE_DOUBLE = new RegExp(`([^\\s([{«!?;:.,»])${SPACES}([?!;»])`, "g");
const AFTER_OPEN = new RegExp(`(«)${SPACES}`, "g");
// Deux-points : espace insécable ordinaire, UNIQUEMENT si une espace existe déjà.
const BEFORE_COLON = new RegExp(`([^\\s([{«])${SP}+(:)`, "g");
// « NIS 2 » lié.
const NIS2 = new RegExp(`(NIS)${SP}+(2)`, "g");
// « art. N » / « article N » / « articles N » liés (le nombre au terme).
const ART = new RegExp(`\\b(art\\.|articles?)${SP}+(\\d)`, "gi");
// Numéro de téléphone français « 0X XX XX XX XX » : groupes liés.
const TEL = new RegExp(`\\b(0\\d)${SP}(\\d\\d)${SP}(\\d\\d)${SP}(\\d\\d)${SP}(\\d\\d)\\b`, "g");

export function fr(input: string): string {
  return input
    .replace(BEFORE_DOUBLE, `$1${THIN}$2`)
    .replace(AFTER_OPEN, `$1${THIN}`)
    .replace(BEFORE_COLON, `$1${NB}$2`)
    .replace(NIS2, `$1${NB}$2`)
    .replace(ART, `$1${NB}$2`)
    .replace(TEL, `$1${NB}$2${NB}$3${NB}$4${NB}$5`);
}
