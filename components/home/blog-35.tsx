"use client";
// @ts-nocheck
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React from "react";

export function Blog35() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="text-eyebrow mb-3 md:mb-4">Résultats</p>
            <h2 className="mb-5 text-h2 font-bold md:mb-6">
              Cas clients et résultats
            </h2>
            <p className="text-medium">
              Des solutions qui transforment les risques en opportunités.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
          <Card>
            <a href="#" className="w-full max-w-full">
              <div className="w-full overflow-hidden">
                <img
                  src="https://d1p38huyj6upaa.cloudfront.net/default-25.jpg"
                  alt="Relume placeholder image"
                  className="aspect-[3/2] size-full object-cover"
                />
              </div>
            </a>
            <div className="px-5 py-6 md:p-6">
              <a href="#" className="font-mono-label mb-2 flex text-[9px] font-normal uppercase tracking-[0.25em] text-blue">
                Cybersécurité
              </a>
              <a href="#" className="mb-2 block max-w-full">
                <h5 className="text-h5 font-bold">Fintech en crise</h5>
              </a>
              <p>
                Incident de sécurité maîtrisé en quarante-huit heures,
                conformité restaurée.
              </p>
              <div className="mt-5 flex items-center md:mt-6">
                <div className="mr-4 size-12 min-h-12 min-w-12 shrink-0 overflow-hidden rounded-image">
                  <img
                    src="https://d1p38huyj6upaa.cloudfront.net/team-8.jpg"
                    alt="Relume placeholder avatar"
                    className="size-full object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-small font-semibold">Sophie Martin</h6>
                  <div className="flex items-center">
                    <p className="text-small">15 Nov 2024</p>
                    <span className="mx-2">•</span>
                    <p className="text-small">4 min read</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <a href="#" className="w-full max-w-full">
              <div className="w-full overflow-hidden">
                <img
                  src="https://d1p38huyj6upaa.cloudfront.net/default-7.jpg"
                  alt="Relume placeholder image"
                  className="aspect-[3/2] size-full object-cover"
                />
              </div>
            </a>
            <div className="px-5 py-6 md:p-6">
              <a href="#" className="font-mono-label mb-2 flex text-[9px] font-normal uppercase tracking-[0.25em] text-blue">
                Incident management
              </a>
              <a href="#" className="mb-2 block max-w-full">
                <h5 className="text-h5 font-bold">Startup en IA</h5>
              </a>
              <p>
                Gouvernance algorithmique mise en place, risques légaux
                éliminés.
              </p>
              <div className="mt-5 flex items-center md:mt-6">
                <div className="mr-4 size-12 min-h-12 min-w-12 shrink-0 overflow-hidden rounded-image">
                  <img
                    src="https://d1p38huyj6upaa.cloudfront.net/team-7.jpg"
                    alt="Relume placeholder avatar"
                    className="size-full object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-small font-semibold">Luc Arnaud</h6>
                  <div className="flex items-center">
                    <p className="text-small">8 Oct 2024</p>
                    <span className="mx-2">•</span>
                    <p className="text-small">6 min read</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <a href="#" className="w-full max-w-full">
              <div className="w-full overflow-hidden">
                <img
                  src="https://d1p38huyj6upaa.cloudfront.net/default-24.jpg"
                  alt="Relume placeholder image"
                  className="aspect-[3/2] size-full object-cover"
                />
              </div>
            </a>
            <div className="px-5 py-6 md:p-6">
              <a href="#" className="font-mono-label mb-2 flex text-[9px] font-normal uppercase tracking-[0.25em] text-blue">
                Fintech
              </a>
              <a href="#" className="mb-2 block max-w-full">
                <h5 className="text-h5 font-bold">E-commerce RGPD</h5>
              </a>
              <p>Audit complet réalisé, mise en conformité en trois mois.</p>
              <div className="mt-5 flex items-center md:mt-6">
                <div className="mr-4 size-12 min-h-12 min-w-12 shrink-0 overflow-hidden rounded-image">
                  <img
                    src="https://d1p38huyj6upaa.cloudfront.net/team-5.jpg"
                    alt="Relume placeholder avatar"
                    className="size-full object-cover"
                  />
                </div>
                <div>
                  <h6 className="text-small font-semibold">Claire Rousseau</h6>
                  <div className="flex items-center">
                    <p className="text-small">22 Sep 2024</p>
                    <span className="mx-2">•</span>
                    <p className="text-small">5 min read</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex items-center justify-center">
          <Button
            title="Voir le cas"
            variant="secondary"
            className="mt-12 md:mt-18 lg:mt-20"
          >
            Voir le cas
          </Button>
        </div>
      </div>
    </section>
  );
}
