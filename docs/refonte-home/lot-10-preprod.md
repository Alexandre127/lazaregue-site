# Lot 10 — validation de préproduction (aucune modification d'indexation)

Validation seule, sans toucher à aucune directive `noindex` (consigne).

- **Indexation inchangée** : `<meta name="robots" content="noindex, nofollow">`
  présent ; `/robots.txt` = `User-Agent: *` / `Disallow: /`. Aucun fichier
  d'indexation (robots, layout, site-url) modifié sur la branche `refonte-home`.
- **Canonique de la home** : `https://lazaregue-avocats.fr`.
- **Sitemap** : liste la home et les neuf domaines aux slugs renommés (+
  cybersécurité/nis2) ; `contentieux-informatique` EXCLU (page inexistante).
- **Redirections** : les cinq anciens slugs et les deux redirections
  préexistantes résolvent en un saut (301) vers le slug définitif.

Le retrait du `noindex` relève de la mise en ligne, décidée séparément — hors de
ce chantier.
