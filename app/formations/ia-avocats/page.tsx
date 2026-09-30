import type { Metadata } from "next";
import FormationLayout from "../_components/FormationLayout";
import { formationMetadata } from "../_data/metadata";
import { AVOCATS } from "../_data/avocats";

export const metadata: Metadata = formationMetadata(AVOCATS);

export default function Page() {
  return <FormationLayout f={AVOCATS} />;
}
