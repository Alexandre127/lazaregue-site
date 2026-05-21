"use client";
// @ts-nocheck
"use client";

import { Card } from "@/components/ui/card";
import { useMediaQuery } from "@/hooks/use-media-query";
import { motion } from "motion/react";
import React, { useState } from "react";

const useRelume = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useMediaQuery("(max-width: 991px)", {
    initializeWithValue: false,
  });
  const CardContent = isMobile ? motion.div : "div";
  const animateWidth = (index: number) => {
    return isMobile ? "100%" : index === activeIndex ? "100%" : "5rem";
  };
  const animateHeight = (index: number) => {
    return index === activeIndex ? "auto" : "0px";
  };
  const handleSetIsActive = (index: number) => () => {
    setActiveIndex((prevIndex) => (prevIndex === index ? prevIndex : index));
  };
  return {
    handleSetIsActive,
    CardContent,
    animateWidth,
    animateHeight,
  };
};

export function Layout351() {
  const useSctoll = useRelume();
  return (
    <section className="px-[5%] py-16 md:py-24 lg:py-28 scheme-3">
      <div className="container">
        <div className="md:mb-18 mb-12 w-full max-w-lg lg:mb-20">
          <p className="text-eyebrow mb-3 md:mb-4">Spécialités</p>
          <h1 className="text-h2 mb-5 font-bold md:mb-6">
            Nos domaines de compétence
          </h1>
          <p className="text-medium">
            Chaque problème numérique exige une réponse précise. Nous maîtrisons
            les trois piliers qui façonnent le droit de demain.
          </p>
        </div>
        <Card className="flex w-full flex-col overflow-hidden lg:h-[90vh] lg:flex-row">
          <motion.div
            className="border-scheme-border flex flex-col justify-start overflow-hidden border-b last:border-b-0 lg:h-[90vh] lg:min-w-20 lg:flex-row lg:border-b-0 lg:border-r lg:last:border-r-0"
            onClick={useSctoll.handleSetIsActive(0)}
            initial={false}
            animate={{ width: useSctoll.animateWidth(0) }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="relative flex h-16 w-full min-w-full cursor-pointer items-center justify-center py-8 md:h-20 lg:h-[90vh] lg:w-20 lg:min-w-20 lg:flex-col lg:justify-between">
              <h5 className="text-h5 absolute left-6 whitespace-nowrap font-bold md:left-10 lg:relative lg:left-0">
                01
              </h5>
              <h2 className="text-h5 hidden [writing-mode:vertical-rl] lg:block lg:rotate-180 lg:font-bold">
                Intelligence artificielle
              </h2>
              <h5 className="text-h5 font-bold lg:hidden">
                Intelligence artificielle
              </h5>
            </div>
            <useSctoll.CardContent
              className="w-full overflow-hidden lg:h-full lg:w-auto lg:min-w-[200vw] lg:overflow-auto"
              animate={{ height: useSctoll.animateHeight(0) }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col px-6 pb-8 pt-4 md:px-10 md:pb-12 md:pt-12 lg:w-[40rem] lg:px-12 lg:pb-16 lg:pt-16">
                <h3 className="text-h3 mb-5 font-bold md:mb-6">
                  Protéger vos intérêts
                </h3>
                <p className="text-medium">
                  Chaque contrat tech doit anticiper les risques. Nous les
                  négocions, les rédigeons, les défendons en cas de litige.
                </p>
                <div className="mt-8 h-80 md:mt-10 md:h-[25rem] lg:mt-12">
                  <img
                    src="https://d1p38huyj6upaa.cloudfront.net/default-19.jpg"
                    alt="Relume placeholder image 1"
                    className="rounded-image size-full object-cover"
                  />
                </div>
              </div>
            </useSctoll.CardContent>
          </motion.div>
          <motion.div
            className="border-scheme-border flex flex-col justify-start overflow-hidden border-b last:border-b-0 lg:h-[90vh] lg:min-w-20 lg:flex-row lg:border-b-0 lg:border-r lg:last:border-r-0"
            onClick={useSctoll.handleSetIsActive(1)}
            initial={false}
            animate={{ width: useSctoll.animateWidth(1) }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="relative flex h-16 w-full min-w-full cursor-pointer items-center justify-center py-8 md:h-20 lg:h-[90vh] lg:w-20 lg:min-w-20 lg:flex-col lg:justify-between">
              <h5 className="text-h5 absolute left-6 whitespace-nowrap font-bold md:left-10 lg:relative lg:left-0">
                02
              </h5>
              <h2 className="text-h5 hidden [writing-mode:vertical-rl] lg:block lg:rotate-180 lg:font-bold">
                Données et sécurité
              </h2>
              <h5 className="text-h5 font-bold lg:hidden">
                Données et sécurité
              </h5>
            </div>
            <useSctoll.CardContent
              className="w-full overflow-hidden lg:h-full lg:w-auto lg:min-w-[200vw] lg:overflow-auto"
              animate={{ height: useSctoll.animateHeight(1) }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col px-6 pb-8 pt-4 md:px-10 md:pb-12 md:pt-12 lg:w-[40rem] lg:px-12 lg:pb-16 lg:pt-16">
                <h3 className="text-h3 mb-5 font-bold md:mb-6">
                  Protéger vos intérêts
                </h3>
                <p className="text-medium">
                  Chaque contrat tech doit anticiper les risques. Nous les
                  négocions, les rédigeons, les défendons en cas de litige.
                </p>
                <div className="mt-8 h-80 md:mt-10 md:h-[25rem] lg:mt-12">
                  <img
                    src="https://d1p38huyj6upaa.cloudfront.net/default-43.jpg"
                    alt="Relume placeholder image 2"
                    className="rounded-image size-full object-cover"
                  />
                </div>
              </div>
            </useSctoll.CardContent>
          </motion.div>
          <motion.div
            className="border-scheme-border flex flex-col justify-start overflow-hidden border-b last:border-b-0 lg:h-[90vh] lg:min-w-20 lg:flex-row lg:border-b-0 lg:border-r lg:last:border-r-0"
            onClick={useSctoll.handleSetIsActive(2)}
            initial={false}
            animate={{ width: useSctoll.animateWidth(2) }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="relative flex h-16 w-full min-w-full cursor-pointer items-center justify-center py-8 md:h-20 lg:h-[90vh] lg:w-20 lg:min-w-20 lg:flex-col lg:justify-between">
              <h5 className="text-h5 absolute left-6 whitespace-nowrap font-bold md:left-10 lg:relative lg:left-0">
                03
              </h5>
              <h2 className="text-h5 hidden [writing-mode:vertical-rl] lg:block lg:rotate-180 lg:font-bold">
                Conformité réglementaire
              </h2>
              <h5 className="text-h5 font-bold lg:hidden">
                Conformité réglementaire
              </h5>
            </div>
            <useSctoll.CardContent
              className="w-full overflow-hidden lg:h-full lg:w-auto lg:min-w-[200vw] lg:overflow-auto"
              animate={{ height: useSctoll.animateHeight(2) }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col px-6 pb-8 pt-4 md:px-10 md:pb-12 md:pt-12 lg:w-[40rem] lg:px-12 lg:pb-16 lg:pt-16">
                <h3 className="text-h3 mb-5 font-bold md:mb-6">
                  Protéger vos intérêts
                </h3>
                <p className="text-medium">
                  Chaque contrat tech doit anticiper les risques. Nous les
                  négocions, les rédigeons, les défendons en cas de litige.
                </p>
                <div className="mt-8 h-80 md:mt-10 md:h-[25rem] lg:mt-12">
                  <img
                    src="https://d1p38huyj6upaa.cloudfront.net/default-5.jpg"
                    alt="Relume placeholder image 3"
                    className="rounded-image size-full object-cover"
                  />
                </div>
              </div>
            </useSctoll.CardContent>
          </motion.div>
          <motion.div
            className="border-scheme-border flex flex-col justify-start overflow-hidden border-b last:border-b-0 lg:h-[90vh] lg:min-w-20 lg:flex-row lg:border-b-0 lg:border-r lg:last:border-r-0"
            onClick={useSctoll.handleSetIsActive(3)}
            initial={false}
            animate={{ width: useSctoll.animateWidth(3) }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="relative flex h-16 w-full min-w-full cursor-pointer items-center justify-center py-8 md:h-20 lg:h-[90vh] lg:w-20 lg:min-w-20 lg:flex-col lg:justify-between">
              <h5 className="text-h5 absolute left-6 whitespace-nowrap font-bold md:left-10 lg:relative lg:left-0">
                04
              </h5>
              <h2 className="text-h5 hidden [writing-mode:vertical-rl] lg:block lg:rotate-180 lg:font-bold">
                Contrats technologiques
              </h2>
              <h5 className="text-h5 font-bold lg:hidden">
                Contrats technologiques
              </h5>
            </div>
            <useSctoll.CardContent
              className="w-full overflow-hidden lg:h-full lg:w-auto lg:min-w-[200vw] lg:overflow-auto"
              animate={{ height: useSctoll.animateHeight(3) }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col px-6 pb-8 pt-4 md:px-10 md:pb-12 md:pt-12 lg:w-[40rem] lg:px-12 lg:pb-16 lg:pt-16">
                <h3 className="text-h3 mb-5 font-bold md:mb-6">
                  Protéger vos intérêts
                </h3>
                <p className="text-medium">
                  Chaque contrat tech doit anticiper les risques. Nous les
                  négocions, les rédigeons, les défendons en cas de litige.
                </p>
                <div className="mt-8 h-80 md:mt-10 md:h-[25rem] lg:mt-12">
                  <img
                    src="https://d1p38huyj6upaa.cloudfront.net/default-25.jpg"
                    alt="Relume placeholder image 4"
                    className="rounded-image size-full object-cover"
                  />
                </div>
              </div>
            </useSctoll.CardContent>
          </motion.div>
        </Card>
      </div>
    </section>
  );
}
