/**
 * Source unique des questions fréquentes.
 *
 * Elle vit dans un module neutre parce qu'un composant `"use client"` ne peut
 * pas exporter de données vers un composant serveur — Next y substitue une
 * référence client. La page en a besoin pour produire le balisage FAQPage,
 * qui doit rester rigoureusement identique au texte affiché.
 */
export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Mon prestataire IT est-il responsable en cas de perte de données ?",
    a: "Cela dépend entièrement de ce que dit le contrat — et de ce que le prestataire a effectivement mis en œuvre. Sans clause de sauvegarde ni obligation de résultat documentée, la responsabilité est difficile à engager. Avec une clause claire et des preuves de défaillance, les tribunaux condamnent régulièrement les prestataires.",
  },
  {
    q: "Puis-je résilier mon contrat IT avant terme ?",
    a: "Un contrat à durée déterminée ne peut être résilié sans manquement grave et non réparable du cocontractant. La simple insatisfaction ou un changement de prestataire ne suffit pas — vous risquez de devoir payer l'intégralité des sommes restantes dues.",
  },
  {
    q: "Que doit contenir un cahier des charges IT ?",
    a: "Objectifs fonctionnels, périmètre technique, critères de recette, délais, responsabilités de chaque partie, exigences de sécurité et de sauvegarde. Sans cahier des charges signé, le prestataire peut invoquer des besoins mal exprimés — et le client peut voir sa responsabilité engagée pour défaut de collaboration.",
  },
  {
    q: "Comment récupérer mes données en fin de contrat cloud ?",
    a: "Uniquement si une clause de réversibilité existe et est correctement rédigée : format des données, délai de restitution, plafond des frais de sortie, astreinte en cas de retard. Sans cette clause, le prestataire peut légalement conserver ou supprimer vos données après résiliation.",
  },
  {
    q: "Je suis prestataire IT — comment limiter ma responsabilité ?",
    a: "Par des clauses limitatives proportionnées à votre prestation, une définition claire du périmètre, des exclusions de force majeure encadrées, et surtout une documentation de vos mises en garde écrites. Une clause limitative trop basse peut être écartée si elle ne couvre pas le préjudice réel.",
  },
];
