"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../ressources.module.css";
import { A_PARAITRE, DOMAINES, DOM_LABEL, SITUATIONS, aLaUne, chemin, publiees, ARTICLES, type Dom } from "../data/articles";

/**
 * Page /ressources (refonte du 9 octobre 2026, maquette
 * docs/maquettes/ressources_mobile_effet_une.html).
 *
 * Bandeau de rubrique (H1) · la une · bandeau défilant des domaines · liste
 * numérotée · « Trouver par situation » · appel final. Toutes les données
 * viennent du registre data/articles.ts ; rien n'est saisi ici.
 *
 * Le filtre par domaine vient de l'URL (?domaine=…, rendu serveur : il marche
 * sans JavaScript). La recherche s'ouvre depuis l'icône de l'en-tête (ancre
 * #recherche, affichée par :target sans JavaScript) et filtre la liste.
 */

type Ligne = { cle: string; dom: Dom; titre: string; href: string | null };

const normaliser = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
const deuxChiffres = (n: number) => String(n).padStart(2, "0");

export default function RessourcesIndex({ domaine }: { domaine?: Dom }) {
  const une = aLaUne();
  const [requete, setRequete] = useState("");
  const [rechercheOuverte, setRechercheOuverte] = useState(false);
  const champ = useRef<HTMLInputElement>(null);

  /* Ouverture de la recherche : icône de l'en-tête (événement) ou arrivée sur
     /ressources#recherche. */
  useEffect(() => {
    const ouvrir = () => {
      setRechercheOuverte(true);
      requestAnimationFrame(() => champ.current?.focus());
    };
    if (window.location.hash === "#recherche") ouvrir();
    window.addEventListener("ressources:recherche", ouvrir);
    return () => window.removeEventListener("ressources:recherche", ouvrir);
  }, []);

  const terme = normaliser(requete.trim());
  const filtre = !!domaine || terme !== "";

  /* Liste : ressources publiées (par `ordre`), puis « à paraître » sans lien.
     Hors filtre, l'article à la une n'est pas répété dans la liste. */
  const lignes = useMemo<Ligne[]>(() => {
    const pub: Ligne[] = publiees()
      .filter((a) => filtre || a.slug !== une?.slug)
      .map((a) => ({ cle: a.slug, dom: a.dom, titre: a.title, href: chemin(a.slug) }));
    const brouillons: Ligne[] = ARTICLES.filter((a) => !a.publie).map((a) => ({ cle: a.slug, dom: a.dom, titre: a.title, href: null }));
    const annonces: Ligne[] = A_PARAITRE.map((a) => ({ cle: a.id, dom: a.dom, titre: a.titre, href: null }));
    return [...pub, ...brouillons, ...annonces].filter(
      (l) => (!domaine || l.dom === domaine) && (terme === "" || normaliser(`${l.titre} ${DOM_LABEL[l.dom]}`).includes(terme)),
    );
  }, [domaine, terme, filtre, une?.slug]);

  const lignesUne = (une?.titreUne || une?.title || "").split("|").map((l) => l.trim()).filter(Boolean);
  const bandeau = [...DOMAINES, ...DOMAINES]; // deux fois : boucle continue du défilement

  return (
    <>
      {/* ---------- Bandeau de rubrique (H1) ---------- */}
      <div className={styles.rubrique}>
        <h1 className={styles.rubTitre}>Ressources</h1>
        {une ? <p className={styles.rubMention}>À la une</p> : null}
      </div>

      {/* ---------- Recherche (ouverte par l'icône de l'en-tête) ---------- */}
      <div id="recherche" role="search" className={`${styles.recherche}${rechercheOuverte ? ` ${styles.rechercheOuverte}` : ""}`}>
        <label htmlFor="q-ressources" className={styles.srOnly}>Rechercher dans les ressources</label>
        <input
          ref={champ}
          id="q-ressources"
          type="search"
          value={requete}
          onChange={(e) => setRequete(e.target.value)}
          placeholder="Rechercher une ressource"
          autoComplete="off"
        />
      </div>

      {/* ---------- La une ---------- */}
      {une ? (
        <section className={styles.une} aria-labelledby="une-titre">
          <p className={styles.surtitre}>{DOM_LABEL[une.dom]}</p>
          <h2 className={styles.uneTitre} id="une-titre">
            {lignesUne.map((ligne) => (
              <span key={ligne}>{ligne}</span>
            ))}
          </h2>
          {une.chapo ? <p className={styles.uneChapo}>{une.chapo}</p> : null}
          <Link className={styles.uneLien} href={chemin(une.slug)}>
            Lire la ressource <span aria-hidden="true">→</span>
          </Link>
        </section>
      ) : null}

      {/* ---------- Bandeau défilant des domaines ---------- */}
      <nav className={styles.bandeau} aria-label="Filtrer les ressources par domaine">
        <ul className={styles.defile}>
          {bandeau.map((d, i) => (
            <li key={`${d.key}-${i}`} aria-hidden={i >= DOMAINES.length ? true : undefined}>
              <Link href={`/ressources?domaine=${d.key}#liste`} tabIndex={i >= DOMAINES.length ? -1 : undefined} aria-current={domaine === d.key ? "true" : undefined}>
                {d.label}
              </Link>
              <b aria-hidden="true">/</b>
            </li>
          ))}
        </ul>
      </nav>

      {/* ---------- Liste numérotée ---------- */}
      <section className={styles.liste} id="liste" aria-labelledby="liste-titre">
        <h2 className={styles.srOnly} id="liste-titre">Toutes les ressources</h2>
        {filtre ? (
          <p className={styles.etat} aria-live="polite">
            {lignes.length} ressource{lignes.length > 1 ? "s" : ""}
            {domaine ? ` · ${DOM_LABEL[domaine]}` : ""}
            {terme ? ` · « ${requete.trim()} »` : ""}
            {domaine ? (
              <>
                {" · "}
                <Link href="/ressources#liste">Tout afficher</Link>
              </>
            ) : null}
          </p>
        ) : null}
        {lignes.length ? (
          <ol className={styles.items}>
            {lignes.map((l, i) => (
              <li key={l.cle} className={styles.item}>
                <span className={styles.numero} aria-hidden="true">{deuxChiffres(i + 1)}</span>
                <div>
                  <p className={styles.surtitre}>{DOM_LABEL[l.dom]}</p>
                  {l.href ? (
                    <Link className={styles.itemTitre} href={l.href}>{l.titre}</Link>
                  ) : (
                    <p className={`${styles.itemTitre} ${styles.aParaitre}`}>
                      {l.titre} <span className={styles.bientot}>à paraître</span>
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <p className={styles.vide}>Aucune ressource ne correspond. <Link href="/ressources#liste">Tout afficher</Link></p>
        )}
      </section>

      {/* ---------- Trouver par situation ---------- */}
      <section className={styles.situations}>
        <details>
          <summary>
            <span>Trouver par situation</span>
            <span className={styles.chevron} aria-hidden="true" />
          </summary>
          <ul>
            {SITUATIONS.map((s) => (
              <li key={s.texte}>
                <Link href={s.href}>{s.texte}</Link>
              </li>
            ))}
          </ul>
        </details>
      </section>

      {/* ---------- Appel final ---------- */}
      <section className={styles.appel} aria-labelledby="appel-titre">
        <div className={styles.appelInner}>
          <h2 className={styles.appelTitre} id="appel-titre">Votre situation est particulière ?</h2>
          <Link className={styles.appelBtn} href="/contact">Échanger avec un avocat</Link>
        </div>
      </section>
    </>
  );
}
