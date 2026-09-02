/**
 * FAQ NIS 2 en texte brut — sert uniquement aux données structurées
 * (schema.org FAQPage). Les réponses affichées restent celles du composant,
 * qui contient de la mise en forme. Toute modification de la FAQ doit être
 * reportée ici pour que le balisage reste fidèle à la page.
 */

export const FAQ_TEXTE: { q: string; a: string }[] = [
  {
    "q": "Ma PME est-elle concernée par NIS 2 ?",
    "a": "Pas nécessairement de façon directe. Si votre entreprise exerce dans un secteur critique et dépasse certains seuils, elle peut être qualifiée d'entité importante ou essentielle. Mais même sans l'être, vos clients peuvent vous imposer des exigences NIS 2 si vous intervenez dans leur chaîne d'approvisionnement."
  },
  {
    "q": "Je suis une société informatique de 15 salariés. Suis-je concerné ?",
    "a": "Peut-être. Si vous hébergez, maintenez ou développez des systèmes utilisés par un hôpital, une banque, une collectivité ou un opérateur critique, vous serez probablement soumis à des exigences contractuelles proches de NIS 2 — même sans être juridiquement une entité NIS 2."
  },
  {
    "q": "Mon client vient de m'envoyer un questionnaire cybersécurité. Que faire ?",
    "a": "Ne répondez pas trop vite. Certaines réponses peuvent engager la responsabilité de votre entreprise ou de ses dirigeants. Avant de confirmer l'existence d'un PRA, d'une PSSI ou d'une authentification forte, vérifiez que ces dispositifs existent réellement et sont documentés."
  },
  {
    "q": "Dois-je recruter un RSSI ?",
    "a": "Pas forcément. Une PME peut désigner un responsable cybersécurité interne ou s'appuyer sur un prestataire externe. L'essentiel : pouvoir démontrer qu' une personne est clairement responsable de la sécurité des systèmes d'information."
  },
  {
    "q": "Dois-je obtenir une certification ISO 27001 ?",
    "a": "Non. NIS 2 n'impose pas ISO 27001. En revanche, certaines grandes entreprises ou administrations peuvent l'exiger contractuellement. Ce n'est pas une obligation légale — c'est parfois une condition commerciale."
  },
  {
    "q": "Quelles sont les premières mesures à mettre en place ?",
    "a": "La plupart des PME commencent par : Activer l'authentification multifacteur (MFA) ; Sécuriser les accès administrateurs ; Tester les sauvegardes ; Rédiger une politique de sécurité (PSSI) ; Formaliser un plan de continuité d'activité ; Documenter la gestion des incidents ; Sensibiliser les collaborateurs..map((li) => ( ))}."
  },
  {
    "q": "Que risque mon entreprise en cas de non-conformité NIS 2 ?",
    "a": "Les sanctions peuvent atteindre plusieurs millions d'euros pour les entités directement soumises à NIS 2. Mais dans la pratique, le premier risque est souvent commercial : perte d'un appel d'offres, résiliation d'un contrat ou refus de référencement par un donneur d'ordre."
  },
  {
    "q": "Que se passe-t-il après une cyberattaque ?",
    "a": "L'entreprise doit rapidement qualifier l'incident, préserver les preuves, identifier les systèmes affectés, déterminer si une notification est nécessaire et documenter les mesures correctives. Selon les cas, plusieurs autorités peuvent être impliquées simultanément : ANSSI, CNIL ou régulateur sectoriel."
  },
  {
    "q": "Quelle différence entre NIS 2 et le RGPD ?",
    "a": "Le RGPD protège les données personnelles. NIS 2 protège les systèmes d'information et la continuité des activités essentielles. Une cyberattaque peut déclencher simultanément des obligations au titre des deux régimes."
  },
  {
    "q": "Mon entreprise sera-t-elle contrôlée ?",
    "a": "Oui, potentiellement. Les autorités compétentes pourront réaliser des contrôles documentaires, demander des justificatifs, vérifier les mesures de sécurité mises en place et exiger des actions correctrices."
  }
];
