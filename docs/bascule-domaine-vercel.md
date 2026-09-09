# Bascule du domaine `lazaregue-avocats.fr` vers Vercel — procédure

> À lire avant de faire pointer le domaine de production sur ce projet Vercel.
> Objectif : comprendre pourquoi le site est en `noindex` aujourd'hui, et
> ouvrir l'indexation **au bon moment, sur le bon domaine**, sans surprise.

## ⚠️ Condition bloquante — contenu escroquerie à valider AVANT bascule

La page **« Avocat escroquerie et fraude »** (`/nos-domaines/avocat-escroquerie-fraude`)
est **déjà fusionnée dans `main`** : elle partira **au premier déploiement de
production réussi**. Trois points de contenu ne sont **pas encore validés** et
doivent l'être **avant** de faire passer le domaine `lazaregue-avocats.fr` sur
Vercel (sans quoi ils seraient publiés en l'état) :

1. **Descriptifs d'Amir Ben Majed et de Sarah Hinderer** — provisoires, à valider
   par le cabinet.
2. **Relecture des trois dossiers anonymisés** (`#dossiers`) au regard du **secret
   professionnel** — ils sont tirés d'affaires en cours.
3. **Mention du régime PSAN / MiCA** (section placement) — à confirmer sur le
   texte en vigueur.

Tant que ces trois points ne sont pas tranchés, **ne pas rattacher le domaine de
production**. Le hero (passerelle + voile 72 %, accroche grise) est, lui, arbitré.

## État au moment où ce document est écrit (8 sept. 2026)

- Le **nouveau site** (ce dépôt, Next.js) vit sur **Vercel**, servi à
  `https://lazaregue-site.vercel.app`.
- Le domaine **`lazaregue-avocats.fr` est encore sur Netlify** (l'**ancien**
  site, une SPA marketing) et sera **décommissionné**.
- Le nouveau site est **volontairement en `noindex`** sur `*.vercel.app`, pour
  que Google **n'indexe pas deux versions en parallèle** (Vercel + Netlify)
  pendant la coexistence.

## Le mécanisme d'anti-indexation (ne pas le contourner par accident)

Deux fichiers, deux rôles distincts :

1. **`proxy.ts`** (middleware, à la racine) — **c'est le verrou d'indexation.**
   Il pose l'en-tête `X-Robots-Tag: noindex, nofollow` sur **toute requête dont
   le host n'est pas le domaine de production**. Condition exacte :

   ```ts
   const PROD_HOST = (process.env.PROD_HOST ?? "lazaregue-avocats.fr").toLowerCase();
   const servedFromProd = host === PROD_HOST || host === `www.${PROD_HOST}`;
   if (!servedFromProd) response.headers.set("X-Robots-Tag", "noindex, nofollow");
   ```

   - Servi depuis `lazaregue-avocats.fr` ou `www.lazaregue-avocats.fr` →
     **pas d'en-tête, page indexable**.
   - Servi depuis n'importe quoi d'autre, **`lazaregue-site.vercel.app`
     compris → `noindex, nofollow`**.
   - Le contrôle porte sur le **host servi**, pas sur le type de déploiement
     Vercel. Conséquence clé : **l'en-tête disparaît de lui-même dès que le
     domaine de production est rattaché**, sans nouveau déploiement.

2. **`app/robots.ts`** (`/robots.txt`) — **n'est PAS le verrou.** Il autorise
   déjà tout le monde (`allow: "/"`, ne bloque que `/_next/` et `/api/`).
   L'indexation n'est donc jamais bloquée par le `robots.txt` : Google **peut
   crawler**, c'est l'en-tête `X-Robots-Tag` qui **empêche d'indexer**. Ne pas
   chercher un `Disallow: /` ici, il n'y en a pas et il n'en faut pas.

3. **`lib/site-url.ts`** — `NEXT_PUBLIC_SITE_URL` pilote les **canoniques, l'Open
   Graph et le sitemap**. En production Vercel (`VERCEL_ENV === "production"`),
   son absence fait **échouer le build** (garde-fou anti-canoniques-`.vercel.app`).
   Ces valeurs sont figées **au build** : les changer impose un **redéploiement**.

## Procédure de bascule (le jour J)

1. **Vercel — rattacher le domaine.** Project Settings → Domains → ajouter
   `lazaregue-avocats.fr` **et** `www.lazaregue-avocats.fr` au projet.
2. **DNS (registrar, IONOS).** Faire pointer `lazaregue-avocats.fr` vers Vercel
   (A `76.76.21.21` / CNAME selon l'indication Vercel), **en retirant** les
   enregistrements Netlify. Prévoir le `www` (301 → apex ou l'inverse, garder
   la même forme que les canoniques).
3. **Vercel — variables d'environnement (Production) :**
   - `NEXT_PUBLIC_SITE_URL = https://lazaregue-avocats.fr` (**obligatoire** ;
     sans elle le build de prod échoue — c'est voulu). Vérifier qu'elle vaut
     bien le domaine définitif et non l'URL `.vercel.app`.
   - `PROD_HOST` : facultatif (le repli vaut déjà `lazaregue-avocats.fr`). Ne la
     définir que si le domaine de prod diffère de ce repli.
4. **Redéployer la production.** Nécessaire pour que **canoniques + sitemap**
   passent au domaine définitif (valeurs de build). Le `noindex`, lui, tombe
   sans redéploiement dès que le host devient `lazaregue-avocats.fr` — mais on
   redéploie de toute façon pour les canoniques.
5. **Décommissionner l'ancien site Netlify** (ou le mettre en 301 vers le
   nouveau) pour supprimer toute coexistence / contenu dupliqué.

## Comment vérifier que l'indexation s'ouvre bien

Une fois le domaine rattaché et redéployé :

```bash
# 1. Plus de noindex sur le domaine de production (au moins 3 pages, dont l'accueil)
for p in "/" "/nos-domaines/rgpd-donnees" "/nos-domaines/diffamation-retrait-de-contenus"; do
  echo -n "$p -> "; curl -sI "https://lazaregue-avocats.fr$p" | grep -i 'x-robots-tag' || echo "(pas de X-Robots-Tag = indexable, OK)"
done

# 2. La préprod .vercel.app reste, elle, en noindex (pas de double indexation)
curl -sI "https://lazaregue-site.vercel.app/" | grep -i 'x-robots-tag'   # doit afficher: noindex, nofollow

# 3. Canoniques sur le bon domaine (pas .vercel.app)
curl -s "https://lazaregue-avocats.fr/" | grep -oi '<link rel="canonical"[^>]*>'

# 4. Sitemap sur le bon domaine + routes attendues
curl -s "https://lazaregue-avocats.fr/sitemap.xml" | grep -oE 'https://[^<]+' | head
```

Attendu : (1) aucun `X-Robots-Tag` sur `lazaregue-avocats.fr` ; (2) `noindex,
nofollow` toujours présent sur `*.vercel.app` ; (3) canoniques en
`https://lazaregue-avocats.fr/...` ; (4) sitemap listant les routes en
`lazaregue-avocats.fr`, dont `/nos-domaines/diffamation-retrait-de-contenus` et
`/nos-domaines/cybersecurite/nis2`.

Enfin : dans la **Search Console** de `lazaregue-avocats.fr`, soumettre le
sitemap et demander l'indexation des pages prioritaires.

## Rollback

Le tag **`prod-avant-fusion-seo`** (commit `4055fed`) marque l'état de
production **avant** la mise en ligne du site retravaillé. Pour revenir en
arrière : redéployer ce tag / réinitialiser `main` dessus.

## Historique — page Escroquerie et fraude (rebranchée)

La page **Escroquerie et fraude** (`/nos-domaines/avocat-escroquerie-fraude`) a
été **fusionnée dans `main`**. Son maillage est rebranché partout — menu, pied de
page (8 domaines), sitemap, redirection 301 de l'ancienne route top-level, renvoi
« Recours contre les banques » depuis Cybercriminalité, et, dans `/le-cabinet`,
la grille des domaines (8 entrées) et la carte dossier « Fraude ». La note de
suivi provisoire qui listait ces points n'a plus d'objet et a été retirée.
