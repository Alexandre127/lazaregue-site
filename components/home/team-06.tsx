"use client";

// @ts-nocheck

import { Button } from "@/components/ui/button";
import React from "react";
import { DribbbleLogo, LinkedinLogo, XLogo } from "relume-icons";

export function Team6() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="text-eyebrow mb-3 md:mb-4">Équipe</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">Les avocats</h2>
          <p className="text-medium">
            Chacun maîtrise son domaine sans compromis.
          </p>
        </div>
        <div className="grid grid-cols-1 items-start justify-center gap-x-8 gap-y-12 md:grid-cols-3 md:gap-x-8 md:gap-y-16 lg:gap-x-12">
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <img
                className="mx-auto aspect-square size-full rounded-image object-cover"
                src="https://d1p38huyj6upaa.cloudfront.net/team-3.jpg"
                alt="Pierre Leclerc"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-large font-semibold">Pierre Leclerc</h5>
              <h6 className="text-medium">Fondateur</h6>
            </div>
            <p>
              Vingt ans de droit numérique et cybersécurité en cabinet
              international.
            </p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <img
                className="mx-auto aspect-square size-full rounded-image object-cover"
                src="https://d1p38huyj6upaa.cloudfront.net/team-7.jpg"
                alt="Marie Dubois"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-large font-semibold">Marie Dubois</h5>
              <h6 className="text-medium">Associée</h6>
            </div>
            <p>
              Spécialiste RGPD et conformité, elle guide les transformations
              données.
            </p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
          <div className="flex flex-col text-center">
            <div className="mb-5 flex flex-col flex-nowrap text-center md:mb-6">
              <img
                className="mx-auto aspect-square size-full rounded-image object-cover"
                src="https://d1p38huyj6upaa.cloudfront.net/team-8.jpg"
                alt="Thomas Moreau"
              />
            </div>
            <div className="mb-3 md:mb-4">
              <h5 className="text-large font-semibold">Thomas Moreau</h5>
              <h6 className="text-medium">Counsel</h6>
            </div>
            <p>
              Intelligence artificielle et gouvernance algorithmique, son
              terrain.
            </p>
            <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
              <a href="#">
                <LinkedinLogo className="size-6 text-scheme-text" />
              </a>
              <a href="#">
                <XLogo className="size-6 p-0.5 text-scheme-text" />
              </a>
              <a href="#">
                <DribbbleLogo className="size-6 text-scheme-text" />
              </a>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-14 w-full max-w-md text-center md:mt-20 lg:mt-24">
          <h4 className="mb-3 text-h4 font-bold md:mb-4">Nous recrutons</h4>
          <p className="text-medium">Associate</p>
          <div className="mt-5 grid grid-flow-col grid-cols-[max-content] gap-3.5 self-center md:mt-6">
            <Button title="Postes ouverts" variant="secondary">
              Postes ouverts
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
