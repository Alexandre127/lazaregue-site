/**
 * FAQ RGPD — fichier neutre (ni serveur ni client).
 * Les données ne peuvent pas être importées depuis un module « use client » :
 * Next.js y substitue des références client, et le balisage structuré échouait.
 */

export const FAQ_ITEMS = [
  {
    q: "Une PME de moins de 250 salariés doit-elle tenir un registre RGPD ?",
    a: "Juridiquement, l'obligation de registre ne vise en principe que les entreprises de 250 salariés et plus. Mais en pratique, toute PME qui met en œuvre des traitements non occasionnels ou à risque doit tenir un registre — car c'est la base de la démonstration de conformité (accountability) en cas de contrôle CNIL.",
  },
  {
    q: "Le RGPD s'applique-t-il aux outils d'IA générative ?",
    a: "Oui. Dès lors qu'un outil d'IA traite des données personnelles — même indirectement — le RGPD s'applique pleinement. Base légale, minimisation, durée de conservation, information des personnes : les obligations sont identiques. L'AI Act ajoute une couche supplémentaire pour les systèmes à risque élevé.",
  },
  {
    q: "Peut-on utiliser des outils américains (Google, Microsoft, Salesforce...) ?",
    a: "Oui, mais avec des garanties appropriées. Les transferts vers les États-Unis nécessitent des clauses contractuelles types (CCT) conformes à la décision d'adéquation UE-USA. En pratique, la plupart des grands éditeurs proposent ces garanties — mais elles doivent être vérifiées et documentées contrat par contrat.",
  },
  {
    q: "Une levée de fonds peut-elle révéler des risques RGPD ?",
    a: "Oui — et c'est l'un des angles les plus sous-estimés. Dans toute due diligence, les investisseurs vérifient la conformité RGPD. Un fichier clients sans base légale valide ou un contrat sous-traitant non conforme peut être qualifié d'actif illicite — avec impact direct sur la valorisation et les garanties négociées.",
  },
  {
    q: "Que risque réellement une PME en cas de contrôle CNIL ?",
    a: "Les sanctions peuvent atteindre 20M€ ou 4% du CA mondial. Mais au-delà du montant, c'est la publicité de la sanction qui frappe : les délibérations CNIL sont publiées en ligne. Plusieurs PME ont subi des pertes clients et partenaires directement liées à une sanction publiée. La CNIL sanctionne aussi l'absence de documentation — sans violation effective.",
  },
  {
    q: "Quels contrats doivent intégrer l'article 28 RGPD ?",
    a: "Tout contrat avec un prestataire qui traite des données personnelles pour votre compte : hébergeur, éditeur SaaS, agence marketing, cabinet de paie, intégrateur IT, prestataire RH. Sans clause article 28 conforme, vous restez responsable en cas de violation chez le prestataire — et vous perdez tout recours contractuel.",
  },
] as const;
