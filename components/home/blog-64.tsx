"use client";
// @ts-nocheck
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronRight } from "relume-icons";

export function Blog64() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-1">
      <div className="container">
        <div className="grid grid-cols-1 gap-12 lg:mb-20 lg:grid-cols-2 lg:gap-x-20">
          <div className="flex flex-col md:items-end md:justify-between">
            <div className="w-full max-w-lg">
              <p className="text-eyebrow mb-3 md:mb-4">Actualités</p>
              <h1 className="mb-5 text-h2 font-bold md:mb-6">
                Nos publications récentes
              </h1>
              <p className="text-medium">
                Pensées et analyses sur le droit numérique d'aujourd'hui.
              </p>
              <div className="mt-6 md:mt-8">
                <Button title="Tous les articles" variant="secondary">
                  Tous les articles
                </Button>
              </div>
            </div>
          </div>
          <div className="grid auto-cols-fr items-start gap-12 md:gap-y-16">
            <div className="flex flex-col items-start gap-x-8 gap-y-6 md:flex-row md:gap-y-4">
              <a className="w-full shrink-0 grow basis-2/5 overflow-hidden">
                <img
                  src="https://d1p38huyj6upaa.cloudfront.net/default-16.jpg"
                  alt="Relume placeholder image"
                  className="aspect-square size-full rounded-image object-cover"
                />
              </a>
              <div className="flex w-full flex-col justify-center">
                <div className="mb-3 flex w-full items-center justify-start md:mb-4">
                  <Badge className="mr-4">Cybersécurité</Badge>
                  <p className="inline text-small font-semibold">
                    Huit minutes
                  </p>
                </div>
                <a href="#" className="mb-2">
                  <h3 className="text-h5 font-bold">
                    Quand la sécurité devient un enjeu stratégique
                  </h3>
                </a>
                <p className="line-clamp-2">
                  Les entreprises doivent repenser leur approche de la
                  cybersécurité.
                </p>
                <div className="mt-5 md:mt-6">
                  <Button
                    variant="link"
                    size="link"
                    iconRight={<ChevronRight className="text-scheme-text" />}
                  >
                    Lire
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-x-8 gap-y-6 md:flex-row md:gap-y-4">
              <a className="w-full shrink-0 grow basis-2/5 overflow-hidden">
                <img
                  src="https://d1p38huyj6upaa.cloudfront.net/default-39.jpg"
                  alt="Relume placeholder image"
                  className="aspect-square size-full rounded-image object-cover"
                />
              </a>
              <div className="flex w-full flex-col justify-center">
                <div className="mb-3 flex w-full items-center justify-start md:mb-4">
                  <Badge className="mr-4">Données</Badge>
                  <p className="inline text-small font-semibold">Dix minutes</p>
                </div>
                <a href="#" className="mb-2">
                  <h3 className="text-h5 font-bold">
                    RGPD, trois ans après, où en sommes-nous
                  </h3>
                </a>
                <p className="line-clamp-2">
                  Le RGPD a transformé la relation entre entreprises et données.
                </p>
                <div className="mt-5 md:mt-6">
                  <Button
                    variant="link"
                    size="link"
                    iconRight={<ChevronRight className="text-scheme-text" />}
                  >
                    Lire
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-x-8 gap-y-6 md:flex-row md:gap-y-4">
              <a className="w-full shrink-0 grow basis-2/5 overflow-hidden">
                <img
                  src="https://d1p38huyj6upaa.cloudfront.net/default-21.jpg"
                  alt="Relume placeholder image"
                  className="aspect-square size-full rounded-image object-cover"
                />
              </a>
              <div className="flex w-full flex-col justify-center">
                <div className="mb-3 flex w-full items-center justify-start md:mb-4">
                  <Badge className="mr-4">Intelligence artificielle</Badge>
                  <p className="inline text-small font-semibold">
                    Douze minutes
                  </p>
                </div>
                <a href="#" className="mb-2">
                  <h3 className="text-h5 font-bold">
                    L'IA sans cadre juridique, un risque réel
                  </h3>
                </a>
                <p className="line-clamp-2">
                  Les entreprises qui adoptent l'IA doivent anticiper les
                  responsabilités.
                </p>
                <div className="mt-5 md:mt-6">
                  <Button
                    variant="link"
                    size="link"
                    iconRight={<ChevronRight className="text-scheme-text" />}
                  >
                    Lire
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
