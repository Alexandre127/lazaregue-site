import type { Metadata } from "next";
import FormationLayout from "../_components/FormationLayout";
import { formationMetadata } from "../_data/metadata";
import { CYBER } from "../_data/cyber";

export const metadata: Metadata = formationMetadata(CYBER);

export default function Page() {
  return <FormationLayout f={CYBER} />;
}
