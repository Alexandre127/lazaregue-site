'use client'
import { useState } from 'react'

const clauses = [
  {
    num: '01',
    nom: 'La clause de sauvegarde',
    hint: '"Mon prestataire gère les sauvegardes." — Pas forcément.',
    intro: 'Il y a trois obligations différentes — et les tribunaux les distinguent. Effectuer des sauvegardes, vérifier qu\'elles fonctionnent, tester une restauration. Ce ne sont pas les mêmes mots. Ce ne sont pas les mêmes responsabilités.',
    citation: '"Le prestataire met à disposition un système de sauvegarde."',
    items: [
      'Effectuer les sauvegardes',
      'Vérifier qu\'elles sont exploitables',
      'Tester une restauration régulièrement et en produire un rapport',
    ],
    risque: 'Après un ransomware, vous découvrez que les sauvegardes n\'ont jamais été testées. Elles existaient sur le papier. Pas dans la réalité.',
  },
  {
    num: '02',
    nom: 'La clause de réversibilité',
    hint: '"Comment récupérez-vous vos données le jour où vous partez ?"',
    intro: 'La plupart des contrats SaaS répondent mal à cette question. Une clause de réversibilité sérieuse doit préciser le format, les délais, le coût et l\'assistance. Sans ça, le client devient dépendant de son fournisseur.',
    citation: null,
    items: [
      'Format de restitution — CSV, JSON, formats ouverts',
      'Délai maximum — 30 jours',
      'Coût plafonné aux coûts réels (loi SREN 2024, art. 27)',
      'Suppression certifiée des données restantes',
    ],
    risque: 'Vous voulez partir. Vous découvrez que récupérer vos propres données coûte plusieurs milliers d\'euros — et qu\'elles seront supprimées dans 30 jours si vous ne payez pas.',
  },
  {
    num: '03',
    nom: 'La clause de responsabilité',
    hint: '"Limitée aux 12 derniers mois." — Cohérente avec le risque réel ?',
    intro: 'Cette clause peut être valable. Mais elle doit être cohérente avec le risque réel. Un prestataire qui gère votre ERP, votre comptabilité et vos données RH pour 500€/mois ne peut pas toujours limiter sa responsabilité à 6 000€.',
    citation: '"La responsabilité du prestataire est limitée au montant des douze derniers mois de facturation."',
    items: [],
    risque: '40 000€ de préjudice. 800€ d\'indemnisation maximale. Le prestataire invoque la clause — et elle tient, faute de faute lourde documentée.',
  },
  {
    num: '04',
    nom: 'Le SLA — niveau de service',
    hint: '"Que se passe-t-il si le service tombe ?" — Sans pénalité, c\'est une promesse.',
    intro: 'Sans SLA précis, il devient difficile de démontrer qu\'une prestation n\'a pas été exécutée. Un SLA sans pénalité est une promesse commerciale — pas une obligation juridique.',
    citation: null,
    items: [
      'Disponibilité garantie — ex. 99,5%',
      'Délais d\'intervention par niveau de criticité',
      'Délais de rétablissement',
      'Pénalités automatiques par dépassement',
      'Procédures d\'escalade documentées',
    ],
    risque: 'Le prestataire intervient rapidement. Mais le système reste indisponible plusieurs jours. Sans pénalité contractuelle, vous ne pouvez rien réclamer.',
  },
  {
    num: '05',
    nom: 'La clause d\'interdépendance',
    hint: '"Si l\'un tombe, les autres tombent-ils aussi ?" — La clause que personne ne regarde.',
    intro: 'Vous avez souvent signé séparément un contrat logiciel, de maintenance, de location financière et cloud. La jurisprudence reconnaît fréquemment leur interdépendance économique. La défaillance de l\'un peut entraîner la caducité des autres.',
    citation: null,
    items: [
      'Contrat logiciel',
      'Contrat de maintenance',
      'Contrat de location financière',
      'Contrat cloud ou d\'hébergement',
    ],
    risque: 'Le logiciel ne fonctionne plus. Vous continuez pourtant à payer le financement pendant plusieurs années — parce que les contrats n\'étaient pas liés.',
  },
]

export default function ClausesRisque() {
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '40px 48px' }}>
      <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', margin: '0 0 4px' }}>Les clauses à risque</p>
      <h2 style={{ fontSize: 24, fontWeight: 500, color: 'var(--color-text-primary)', margin: '0 0 6px', lineHeight: 1.3 }}>Les 5 clauses qui décident du sort d'un contentieux IT</h2>
      <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: '0 0 28px', maxWidth: 520 }}>La plupart des litiges informatiques ne se gagnent pas sur la technique. Ils se gagnent — ou se perdent — dans cinq clauses souvent négligées au moment de la signature.</p>

      {clauses.map((cl, i) => (
        <div key={i} style={{ borderTop: '0.5px solid var(--color-border-tertiary)', ...(i === clauses.length - 1 ? { borderBottom: '0.5px solid var(--color-border-tertiary)' } : {}) }}>
          <div
            onClick={() => toggle(i)}
            style={{ display: 'grid', gridTemplateColumns: '48px 1fr 24px', alignItems: 'start', padding: '20px 0', cursor: 'pointer', gap: 16 }}
          >
            <span style={{ fontSize: 32, fontWeight: 500, color: open === i ? 'var(--color-text-primary)' : 'var(--color-border-secondary)', lineHeight: 1, paddingTop: 2, transition: 'color .2s' }}>{cl.num}</span>
            <div>
              <p style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-text-primary)', margin: '0 0 3px', lineHeight: 1.3 }}>{cl.nom}</p>
              <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', margin: 0, fontStyle: 'italic' }}>{cl.hint}</p>
            </div>
            <span style={{ fontSize: 16, color: 'var(--color-text-tertiary)', marginTop: 4, transform: open === i ? 'rotate(180deg)' : 'none', transition: 'transform .22s', display: 'block' }}>⌄</span>
          </div>

          {open === i && (
            <div style={{ paddingBottom: 24, paddingLeft: 64 }}>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.75, margin: '0 0 14px' }}>{cl.intro}</p>
              {cl.citation && (
                <div style={{ borderLeft: '2px solid var(--color-border-tertiary)', padding: '8px 14px', margin: '0 0 14px' }}>
                  <p style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.6 }}>{cl.citation}</p>
                </div>
              )}
              {cl.items.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '0 0 16px' }}>
                  {cl.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--color-text-tertiary)', flexShrink: 0 }}>—</span>
                      {item}
                    </div>
                  ))}
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, paddingTop: 12, borderTop: '0.5px solid var(--color-border-tertiary)' }}>
                <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', flexShrink: 0 }}>Risque réel</span>
                <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.5 }}>{cl.risque}</p>
              </div>
            </div>
          )}
        </div>
      ))}

      <div style={{ marginTop: 32, paddingTop: 24, borderTop: '0.5px solid var(--color-border-tertiary)', paddingLeft: 64 }}>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: '0 0 4px' }}>Avant de signer, la question n'est pas seulement de savoir ce que le prestataire va faire.</p>
        <p style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-text-primary)', margin: 0, lineHeight: 1.4 }}>La question est de savoir ce qui se passera lorsqu'il ne pourra plus le faire.</p>
      </div>
    </section>
  )
}
