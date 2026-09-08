/**
 * Source unique des questions fréquentes de la page « Diffamation et retrait
 * de contenus ». Alimente à la fois l'accordéon visible (client) et le
 * balisage FAQPage (page serveur) : réponses en chaînes sérialisables, texte
 * rigoureusement identique de part et d'autre.
 */
export const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Une plateforme refuse de retirer un contenu. Que puis-je faire ?",
    a: "Le refus opposé à un signalement ne clôt rien. L'obligation de retrait prompt de l'hébergeur suppose une notification régulière, comportant les mentions prescrites ainsi que la description et la localisation précises des faits. C'est cette notification, et non le formulaire interne, qui fait courir l'obligation. À défaut d'action, le juge peut être saisi en référé.",
  },
  {
    q: "Dans quel délai un contenu peut-il être retiré ?",
    a: "Une plateforme régulièrement notifiée doit agir promptement, la promptitude s'appréciant au regard de la gravité du contenu. Lorsqu'elle ne le fait pas, le référé permet d'obtenir une décision en quelques semaines. En matière de presse, les délais de prescription sont en revanche très courts et commandent d'agir sans attendre.",
  },
  {
    q: "Combien coûte l'intervention d'un avocat pour faire retirer un contenu ?",
    a: "Le coût dépend du nombre de contenus et de plateformes concernés, de l'existence de reprises, de la nécessité d'un constat, du fondement retenu et du fait que l'affaire se règle par notification ou par une procédure judiciaire. Les modalités sont fixées par une convention d'honoraires signée avant toute intervention.",
  },
  {
    q: "Peut-on identifier le titulaire d'un compte anonyme ?",
    a: "Le juge peut enjoindre à une plateforme de communiquer les données d'identification du titulaire d'un compte lorsque la mesure est nécessaire et proportionnée au dommage démontré. Le périmètre de ce qui peut être obtenu est délimité et ne recouvre pas les données techniques de connexion, soumises à un régime distinct. Une demande calibrée sur ce périmètre a des chances sérieuses ; une demande générale n'en a pas.",
  },
  {
    q: "Peut-on faire supprimer un faux avis en ligne ?",
    a: "Tout avis négatif n'est pas illicite. Les avis relevant de la libre critique, même sévères, ne constituent pas un trouble manifestement illicite justifiant leur retrait en référé. Sont en revanche actionnables les avis diffamatoires ou injurieux, les faux avis émanant de personnes qui n'ont jamais été clientes, et les campagnes de dénigrement, chacun sur un fondement différent.",
  },
  {
    q: "Puis-je faire déréférencer une information si la page d'origine reste licite ?",
    a: "Oui. L'exploitant d'un moteur de recherche est responsable d'un traitement de données personnelles distinct de la publication d'origine. Il peut être tenu de supprimer des liens lorsque les données sont devenues inadéquates ou non pertinentes, sans qu'il soit nécessaire d'établir un préjudice ni d'obtenir la suppression de la page source.",
  },
  {
    q: "Faut-il faire constater le contenu avant d'agir ?",
    a: "C'est vivement recommandé. Un contenu se supprime, se modifie ou se déplace, et la capture d'écran isolée est fragile. Un constat dressé par un commissaire de justice, dans les formes techniques requises, fixe le contenu et sa localisation à une date certaine — c'est souvent la pièce qui décide de l'issue.",
  },
  {
    q: "Quelle différence entre retrait, effacement et déréférencement ?",
    a: "Le retrait fait disparaître le contenu de la plateforme qui l'héberge. L'effacement supprime des données personnelles chez celui qui les traite. Le déréférencement laisse la page en ligne mais la retire des résultats associés à un nom. Les trois obéissent à des fondements, des interlocuteurs et des conditions différents, et se combinent souvent dans un même dossier.",
  },
];
