import type { Formation } from "./types";
import { IA_ACT } from "./ia-act";
import { RGPD } from "./rgpd";
import { CYBER } from "./cyber";
import { AVOCATS } from "./avocats";

/** Les quatre formations, dans l'ordre d'affichage (hub, « autres formations »). */
export const ALL_FORMATIONS: Formation[] = [IA_ACT, RGPD, CYBER, AVOCATS];
