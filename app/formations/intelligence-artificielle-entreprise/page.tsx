import type { Metadata } from "next";
import FormationLayout from "../_components/FormationLayout";
import { formationMetadata } from "../_data/metadata";
import { IA_ACT } from "../_data/ia-act";

export const metadata: Metadata = formationMetadata(IA_ACT);

export default function Page() {
  return <FormationLayout f={IA_ACT} />;
}
