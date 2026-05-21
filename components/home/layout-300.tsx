"use client";
// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronRight } from "relume-icons";

export function Layout300() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container">
        <div className="flex flex-col items-start">
          <div className="mx-auto mb-12 w-full max-w-lg items-start justify-between gap-5 md:mb-18 lg:mb-20">
            <p className="text-eyebrow mb-3 text-center md:mb-4">Pourquoi</p>
            <h2 className="mb-5 text-center text-h2 font-bold md:mb-6">
              Le droit du numérique, notre seul métier
            </h2>
            <p className="text-center text-medium">
              Depuis le premier jour, nous avons construit ce cabinet avec une
              conviction simple : les enjeux juridiques du numérique exigent une
              expertise totale, pas partielle. Chaque avocat ne travaille que
              sur ces sujets.
            </p>
          </div>
          <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-4">
            <div className="flex w-full flex-col flex-nowrap justify-start text-center">
              <div className="mx-auto mb-5 w-full md:mb-6">
                <img
                  src="https://d1p38huyj6upaa.cloudfront.net/default-36.jpg"
                  alt="Relume placeholder image 1"
                  className="aspect-video size-full rounded-image object-cover"
                />
              </div>
              <h3 className="mb-3 text-center text-h5 font-bold md:mb-4">
                Spécialisation totale, maîtrise en profondeur
              </h3>
              <p className="text-center">
                IA Act, RGPD, NIS2, cybersécurité, contrats tech, propriété
                intellectuelle numérique uniquement.
              </p>
            </div>
            <div className="flex w-full flex-col flex-nowrap justify-start text-center">
              <div className="mx-auto mb-5 w-full md:mb-6">
                <img
                  src="https://d1p38huyj6upaa.cloudfront.net/default-30.jpg"
                  alt="Relume placeholder image 1"
                  className="aspect-video size-full rounded-image object-cover"
                />
              </div>
              <h3 className="mb-3 text-center text-h5 font-bold md:mb-4">
                Culture industrielle, réalité opérationnelle
              </h3>
              <p className="text-center">
                Nous accompagnons les ETI et groupes en transformation numérique
                depuis leurs débuts.
              </p>
            </div>
            <div className="flex w-full flex-col flex-nowrap justify-start text-center">
              <div className="mx-auto mb-5 w-full md:mb-6">
                <img
                  src="https://d1p38huyj6upaa.cloudfront.net/default-45.jpg"
                  alt="Relume placeholder image 1"
                  className="aspect-video size-full rounded-image object-cover"
                />
              </div>
              <h3 className="mb-3 text-center text-h5 font-bold md:mb-4">
                Continuité en toute situation, même en crise
              </h3>
              <p className="text-center">
                Le même avocat intervient avant et pendant l'incident, sans
                transfert ni délai.
              </p>
            </div>
            <div className="flex w-full flex-col flex-nowrap justify-start text-center">
              <div className="mx-auto mb-5 w-full md:mb-6">
                <img
                  src="https://d1p38huyj6upaa.cloudfront.net/default-46.jpg"
                  alt="Relume placeholder image 1"
                  className="aspect-video size-full rounded-image object-cover"
                />
              </div>
              <h3 className="mb-3 text-center text-h5 font-bold md:mb-4">
                Engagement éditorial, façonner la doctrine
              </h3>
              <p className="text-center">
                Nos avocats publient et forment sur les sujets qu'ils traitent
                au quotidien.
              </p>
            </div>
          </div>
          <div className="mt-12 flex w-full flex-wrap items-center justify-center gap-4 md:mt-18 lg:mt-20">
            <Button title="Explorer" variant="secondary">
              Explorer
            </Button>
            <Button
              title="Flèche"
              variant="link"
              size="link"
              iconRight={<ChevronRight className="text-scheme-text" />}
            >
              Flèche
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
