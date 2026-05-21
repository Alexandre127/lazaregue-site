"use client";
// @ts-nocheck
"use client";

import React from "react";

export function Stats19() {
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-2">
      <div className="container">
        <div className="mx-auto mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="text-eyebrow mb-3 md:mb-4">Menaces</p>
          <h2 className="mb-5 text-h2 font-bold md:mb-6">
            Les risques que vos pairs gèrent maintenant
          </h2>
          <p className="text-medium">
            Les chiffres parlent d'eux-mêmes. Soixante-treize pour cent de
            cyberattaques supplémentaires cette année. Quatre-vingts pour cent
            des ETI et PME se sentent mal armées. Ce n'est pas une question de
            si, mais de quand.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-6 md:gap-y-0 lg:grid-cols-[1fr_0.5fr]">
          <div>
            <img
              className="aspect-[3/2] size-full rounded-image object-cover"
              src="https://d1p38huyj6upaa.cloudfront.net/default-20.jpg"
              alt="Relume placeholder image"
            />
          </div>
          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-8 md:gap-y-12 md:p-8 lg:grid-cols-1 lg:gap-x-0 lg:p-12">
            <div>
              <h1 className="text-stat-accent mb-2 text-h1 font-bold">73%</h1>
              <h3 className="text-h6 font-bold">
                Fraudes au virement en hausse
              </h3>
            </div>
            <div>
              <h1 className="text-stat-accent mb-2 text-h1 font-bold">80%</h1>
              <h3 className="text-h6 font-bold">
                Délai critique pour notifier
              </h3>
            </div>
            <div>
              <h1 className="text-stat-accent mb-2 text-h1 font-bold">93%</h1>
              <h3 className="text-h6 font-bold">
                Fraudes au virement explosent
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
