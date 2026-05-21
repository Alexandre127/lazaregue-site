import { Header5 } from "@/components/home/header-05";
import SectionCompetences from "@/components/home/section-competences";
import { SectionDifferenciateurs } from "@/components/home/section-differenciateurs";
import { SectionEnjeux } from "@/components/home/section-enjeux";
import { SectionEquipe } from "@/components/home/section-equipe";
import { SectionContributions } from "@/components/home/section-contributions";
import { SectionCas } from "@/components/home/section-cas";

export default function Home() {
  return (
    <>
      <Header5 />

      <SectionEnjeux />
      <SectionDifferenciateurs />
      <div id="section-competences">
        <SectionCompetences />
      </div>
      <SectionEquipe />
      <SectionContributions />
      <hr
        style={{
          border: "none",
          borderTop: "0.5px solid rgba(0,0,0,0.08)",
          margin: "0",
        }}
      />
      <SectionCas />
    </>
  );
}
