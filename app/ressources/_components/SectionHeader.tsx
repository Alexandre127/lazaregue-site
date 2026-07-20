import styles from "../ressources.module.css";

/** Folio bleu + rôle de la section en italique. */
export default function SectionHeader({
  folio,
  role,
}: {
  folio: string;
  role: string;
}) {
  return (
    <>
      <div className={styles.folio}>{folio}</div>
      <p className={styles.secRole}>{role}</p>
    </>
  );
}
