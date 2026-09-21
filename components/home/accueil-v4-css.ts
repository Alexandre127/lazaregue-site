// AUTO-GÉNÉRÉ depuis la maquette V4 (styles.css) — port scopé sous .accueilV4.
// Rendu via <style> dans le composant Accueil. Ne pas éditer à la main :
// régénérer avec le script de port si la maquette change.
export const ACCUEIL_V4_CSS = String.raw`
/* Accueil V4 — port scopé de la maquette validée (styles.css) sous .accueilV4.
   Aucune fuite globale ; polices remappées sur les tokens du site.
   Globe = composant THREE.js du projet ; portail = PortailDemo. */
.accueilV4 {--blue:#1a47ff;--deep:#0a2acc;--navy:#0a0f2e;--ink:#0a0a14;--off:#f4f4f8;--white:#fff;--muted:#4a4a63;--light:#ffffff;--line:#e0e0ee;--measure:1200px}
.accueilV4 * {box-sizing:border-box}
.accueilV4 {scroll-behavior:smooth;scroll-padding-top:96px}
.accueilV4 {margin:0;background:var(--white);color:var(--ink);font:400 1.0625rem/1.6 var(--ff-body);-webkit-font-smoothing:antialiased}
.accueilV4 button, .accueilV4 input, .accueilV4 textarea {font:inherit}
.accueilV4 button, .accueilV4 a {-webkit-tap-highlight-color:transparent}
.accueilV4 a {color:inherit;text-underline-offset:5px}
.accueilV4 button {cursor:pointer}
.accueilV4 button:disabled {cursor:default;opacity:.45}
.accueilV4 button:focus-visible, .accueilV4 a:focus-visible, .accueilV4 summary:focus-visible {outline:3px solid var(--blue);outline-offset:5px}
.accueilV4 .dark :focus-visible {outline-color:var(--light)}
.accueilV4 h1, .accueilV4 h2, .accueilV4 h3, .accueilV4 p, .accueilV4 figure {margin:0}
.accueilV4 h1, .accueilV4 h2, .accueilV4 h3 {font-weight:500}
.accueilV4 h2 {font-size:clamp(1.75rem,1.05rem + 2.15vw,2.5rem);line-height:1.16;letter-spacing:-.035em}
.accueilV4 h3 {font-size:1.375rem;line-height:1.3;letter-spacing:-.025em}
.accueilV4 p {max-width:72ch}
.accueilV4 img {display:block;max-width:100%;height:auto}
.accueilV4 svg {display:block}
.accueilV4 button {border:0;background:none;color:inherit}
.accueilV4 ul {margin:0;padding:0;list-style:none}
.accueilV4 .wrap {width:min(var(--measure),calc(100% - 80px));margin-inline:auto}
.accueilV4 .section {padding-block:88px}
.accueilV4 .dark {background:var(--navy);color:white}
.accueilV4 .soft {background:var(--off)}
.accueilV4 .eyebrow {font-family:var(--ff-mono);font-size:.75rem;line-height:1.5;letter-spacing:.09em;text-transform:uppercase;color:var(--blue);display:block;margin-bottom:18px}
.accueilV4 .dark .eyebrow {color:var(--light)}
.accueilV4 .muted {color:var(--muted)}
.accueilV4 .btn {display:inline-flex;align-items:center;justify-content:center;gap:28px;min-height:48px;padding:13px 22px;background:var(--blue);color:#fff;text-decoration:none;font-size:1rem;font-weight:600;line-height:1.4;transition:background .18s}
.accueilV4 .btn:hover {background:var(--deep)}
.accueilV4 .btn.secondary {background:transparent;border:1px solid var(--muted);color:var(--ink)}
.accueilV4 .dark .btn.secondary {color:white;border-color:var(--light)}
.accueilV4 .text-link {display:inline-flex;gap:20px;align-items:center;min-height:44px;font-size:.9375rem;color:var(--blue);font-weight:500}
.accueilV4 .dark .text-link {color:var(--light)}
.accueilV4 .arrow {font-family:Arial,sans-serif;font-size:1.35em;font-weight:400}
.accueilV4 .sr-only {position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.accueilV4 .skip {position:fixed;top:8px;left:8px;z-index:200;background:white;color:var(--navy);padding:10px 18px;transform:translateY(-200%)}
.accueilV4 .skip:focus {transform:translateY(0)}
.accueilV4 .header {background:var(--navy);color:white;border-bottom:1px solid #ffffff25;position:relative;z-index:30}
.accueilV4 .header-inner {min-height:84px;display:flex;align-items:center;justify-content:space-between;gap:30px}
.accueilV4 .wordmark {font-family:var(--ff-display);font-size:1.8rem;letter-spacing:.015em;line-height:1;text-decoration:none;white-space:nowrap}
.accueilV4 .wordmark span {color:var(--light)}
.accueilV4 .nav {display:flex;align-items:center;gap:31px;font-size:.9375rem}
.accueilV4 .nav a {text-decoration:none;min-height:44px;display:flex;align-items:center}
.accueilV4 .nav a:hover {text-decoration:underline}
.accueilV4 .nav .nav-contact {border:1px solid var(--light);padding-inline:20px}
.accueilV4 .menu-toggle {display:none;min-width:48px;min-height:48px;border:1px solid var(--light);font-size:.875rem}
.accueilV4 .hero {position:relative;overflow:hidden;padding:65px 0 72px}
.accueilV4 .hero-grid {display:grid;grid-template-columns:1.15fr 1fr;align-items:center;gap:40px}
.accueilV4 .hero h1 {font:400 clamp(3rem,1rem + 5vw,5.5rem)/1.01 var(--ff-display);letter-spacing:-.005em}
.accueilV4 .hero-prefix {display:block}
.accueilV4 .rotating {display:grid;color:var(--light);position:relative;margin-top:4px}
.accueilV4 .rotating>span {grid-area:1/1;max-width:100%;visibility:hidden}
.accueilV4 .rotating>span.active {visibility:visible}
.accueilV4 .hero-copy {max-width:490px;font-size:1.125rem;line-height:1.55;margin-top:28px;color:#e5e5ea}
.accueilV4 .hero-copy strong {font-weight:500;color:white}
.accueilV4 .hero-actions {display:flex;gap:18px;align-items:center;flex-wrap:wrap;margin-top:28px}
.accueilV4 .hero-actions .text-link {font-size:.875rem}
.accueilV4 .motion-control {display:flex;align-items:center;gap:9px;font-size:.8125rem;color:var(--light);min-height:44px;margin-top:16px;padding:4px 0}
.accueilV4 .motion-control .motion-icon {font-family:Arial;font-size:1rem}
.accueilV4 .hero-art {position:relative;aspect-ratio:1/1;display:flex;align-items:center;justify-content:center}
.accueilV4 .globe {width:100%;height:auto;overflow:visible;color:#4d6fff}
.accueilV4 .globe .grid-line {fill:none;stroke:currentColor;stroke-width:1;opacity:.46}
.accueilV4 .globe .cross-line {stroke:#ffffff;stroke-width:1;opacity:.25}
.accueilV4 .globe .orbit {fill:none;stroke:#ffffff;stroke-width:1;stroke-dasharray:3 7;opacity:.35}
.accueilV4 .globe .node {fill:var(--navy);stroke:var(--light);stroke-width:1.5}
.accueilV4 .globe .node.active {fill:#fff;stroke:#fff}
.accueilV4 .globe .node-halo {fill:none;stroke:var(--blue);stroke-width:1;opacity:.8}
.accueilV4 .atlas-label {position:absolute;left:0;bottom:2px;color:var(--light);font:400 .75rem/1.6 var(--ff-mono);letter-spacing:.05em}
.accueilV4 .globe-axis {position:absolute;right:0;top:5px;color:var(--light);font:400 .75rem/1.5 var(--ff-mono);text-align:right}
.accueilV4 .hero-baseline {display:flex;gap:32px;margin-top:46px;padding-top:22px;border-top:1px solid #ffffff25;font-size:.8125rem;color:#d7d7df}
.accueilV4 .hero-baseline span {display:flex;gap:10px;align-items:center}
.accueilV4 .square {width:5px;height:5px;background:var(--light);display:inline-block;flex-shrink:0}
.accueilV4 .intro {padding-top:0}
.accueilV4 .team-panorama {margin:0;background:var(--off)}
.accueilV4 .team-panorama img {width:100%;aspect-ratio:3.25;object-fit:cover;object-position:center 43%}
.accueilV4 .intro-body {padding-top:56px;display:grid;grid-template-columns:1fr 1fr;gap:70px}
.accueilV4 .intro-body h2 {font-size:clamp(1.75rem,1.35rem + 1vw,2.125rem)}
.accueilV4 .intro-body p {color:var(--muted);line-height:1.7}
.accueilV4 .intro-body .text-link {margin-top:18px}
.accueilV4 .section-heading {display:flex;align-items:flex-end;justify-content:space-between;gap:48px;margin-bottom:40px}
.accueilV4 .section-heading>p {max-width:400px;font-size:1rem;color:var(--muted)}
.accueilV4 .section-heading .eyebrow {margin-bottom:12px}
.accueilV4 .domain-groups {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:30px}
.accueilV4 .domain-family {border-top:2px solid var(--ink)}
.accueilV4 .family-heading {padding:22px 0 25px;display:flex;align-items:start;gap:15px;min-height:112px}
.accueilV4 .family-number {font:400 2.6rem/1 var(--ff-display);color:var(--blue)}
.accueilV4 .family-heading h3 {font-size:1.2rem;line-height:1.35}
.accueilV4 .domain-item {border-top:1px solid #c8c8d6;padding:22px 0}
.accueilV4 .domain-item a {display:flex;align-items:start;justify-content:space-between;gap:18px;min-height:44px;color:var(--ink);font-size:1.0625rem;line-height:1.35;font-weight:600;text-decoration:none}
.accueilV4 .domain-item a:hover .domain-title {text-decoration:underline;text-underline-offset:4px}
.accueilV4 .domain-item a .arrow {color:var(--blue);flex-shrink:0}
.accueilV4 .domain-item p {font-size:.9375rem;color:var(--muted);line-height:1.6;margin-top:7px}
.accueilV4 .why-layout {display:grid;grid-template-columns:1fr 1.3fr;gap:100px}
.accueilV4 .why-layout h2 {max-width:370px}
.accueilV4 .why-intro {margin-top:25px;color:var(--muted);max-width:365px}
.accueilV4 .why-list {display:grid;gap:27px}
.accueilV4 .why-row {padding-top:21px;border-top:1px solid #bbbbce;display:grid;grid-template-columns:38px 1fr;gap:18px}
.accueilV4 .why-row .num {font:400 .8rem/1.5 var(--ff-mono);color:var(--blue)}
.accueilV4 .why-row h3 {font-size:1.25rem;margin-bottom:10px}
.accueilV4 .why-row p {font-size:1rem;color:var(--muted)}
.accueilV4 .portal-strip {display:grid;grid-template-columns:.9fr 1.1fr;gap:60px;margin-top:60px;padding:36px;background:var(--navy);color:#fff}
.accueilV4 .portal-strip h3 {font-size:1.6rem;margin-bottom:14px;max-width:350px}
.accueilV4 .portal-strip p {color:#e5e5ea;font-size:.9375rem}
.accueilV4 .portal-mini {background:#fff;color:var(--ink);padding:22px;align-self:center}
.accueilV4 .portal-top {display:flex;justify-content:space-between;font:400 .6875rem/1.5 var(--ff-mono);color:var(--muted);border-bottom:1px solid var(--line);padding-bottom:12px}
.accueilV4 .portal-mini h4 {font-size:1rem;font-weight:500;margin:14px 0}
.accueilV4 .portal-mini ul {display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.accueilV4 .portal-mini li {padding:12px 8px;background:var(--off);font-size:.8125rem;line-height:1.5}
.accueilV4 .portal-mini li span {display:block;color:var(--blue);font:400 1.3rem/1 var(--ff-display);margin-bottom:7px}
.accueilV4 .case-grid {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-top:1px solid var(--ink);border-bottom:1px solid var(--line)}
.accueilV4 .case-card {padding:29px 27px 28px 0;display:flex;flex-direction:column;min-width:0}
.accueilV4 .case-card+article {border-left:1px solid var(--line);padding-left:27px}
.accueilV4 .case-kicker {font:400 .75rem/1.5 var(--ff-mono);letter-spacing:.045em;color:var(--blue);margin-bottom:19px}
.accueilV4 .case-card h3 {font-size:1.5rem;line-height:1.25;margin-bottom:24px}
.accueilV4 .case-card dl {margin:0;display:grid;gap:22px;height:100%}
.accueilV4 .case-card dt {font:400 .75rem/1.5 var(--ff-mono);letter-spacing:.045em;color:var(--muted);margin-bottom:7px}
.accueilV4 .case-card dd {margin:0;font-size:.9375rem;line-height:1.65}
.accueilV4 .case-outcome {padding:18px;background:var(--off);align-self:end}
.accueilV4 .case-outcome dt {color:var(--blue)}
.accueilV4 .case-outcome dd {font-weight:500}
.accueilV4 .case-note {font-size:.8125rem;color:var(--muted);margin-top:18px}
.accueilV4 .lawyers {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:28px}
.accueilV4 .person-photo {overflow:hidden;background:var(--navy)}
.accueilV4 .person-photo img {width:100%;aspect-ratio:1.12;object-fit:cover;object-position:50% 25%;transition:transform .2s}
.accueilV4 .person-card:hover img {transform:scale(1.025)}
.accueilV4 .person-card h3 {font-size:1.35rem;margin-top:20px}
.accueilV4 .person-role {font-size:.875rem;line-height:1.5;margin-top:7px;color:var(--muted);min-height:42px}
.accueilV4 .person-expertise {font-size:.9375rem;margin-top:15px;padding-top:13px;border-top:1px solid #c9c9d7}
.accueilV4 .technical-heading {margin-top:44px;font:400 .75rem/1.5 var(--ff-mono);letter-spacing:.07em;text-transform:uppercase;color:var(--muted)}
.accueilV4 .technical {margin-top:18px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px}
.accueilV4 .tech-person {padding:22px;background:#fff;display:flex;gap:22px;align-items:center}
.accueilV4 .tech-portrait {width:100px;align-self:stretch;flex-shrink:0;object-fit:cover;object-position:center 23%}
.accueilV4 .tech-monogram {width:100px;align-self:stretch;background:var(--navy);display:flex;align-items:center;justify-content:center;color:var(--light);font:400 2.5rem/1 var(--ff-display);flex-shrink:0}
.accueilV4 .tech-person h3 {font-size:1.125rem;line-height:1.35}
.accueilV4 .tech-person p {font-size:.8125rem;color:var(--muted);line-height:1.5;margin-top:5px}
.accueilV4 .tech-person .expertise {font-size:.875rem;color:var(--ink);margin-top:10px}
.accueilV4 .technical-note {font-size:.8125rem;color:var(--muted);margin-top:18px}
.accueilV4 .press-section {overflow:hidden}
.accueilV4 .press-heading {align-items:flex-end}
.accueilV4 .press-heading h2 {max-width:650px}
.accueilV4 .carousel-controls {display:flex;align-items:center;gap:9px;flex-shrink:0}
.accueilV4 .round-button {width:48px;height:48px;border:1px solid var(--muted);display:grid;place-items:center;font-size:1.35rem;transition:background .15s}
.accueilV4 .round-button:hover:not(:disabled) {background:var(--navy);color:#fff}
.accueilV4 .press-track {display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:thin;scrollbar-color:#a7acc1 var(--off);gap:32px;padding-bottom:26px;scroll-padding-inline:0}
.accueilV4 .press-card {flex:0 0 calc((100% - 64px)/3);scroll-snap-align:start;min-width:0;border-top:2px solid var(--ink);padding-top:22px;display:flex;flex-direction:column}
.accueilV4 .press-media {font-family:var(--ff-display);font-size:2.1rem;line-height:1.1;margin-bottom:25px}
.accueilV4 .press-card[data-media="Le Monde"] .press-media {font-family:Georgia,serif;font-size:1.9rem;letter-spacing:-.065em;font-weight:700}
.accueilV4 .press-meta {font:400 .75rem/1.65 var(--ff-mono);color:var(--muted);margin-bottom:16px}
.accueilV4 .press-card h3 {font-size:1.25rem;line-height:1.4;margin-bottom:17px;letter-spacing:-.02em}
.accueilV4 .press-card .topic {font-size:.8125rem;color:var(--muted);margin-top:auto;padding-top:10px}
.accueilV4 .press-card .text-link {align-self:start;font-size:.875rem;margin-top:10px}
.accueilV4 .press-card .access {font-size:.75rem;color:var(--muted);margin-top:4px}
.accueilV4 .press-bottom {display:flex;align-items:center;justify-content:space-between;gap:20px;margin-top:17px}
.accueilV4 .press-counter {font:400 .75rem/1.5 var(--ff-mono);color:var(--muted)}
.accueilV4 .press-archive {margin-top:32px;border-top:1px solid var(--line);padding-top:20px}
.accueilV4 .press-archive li+li {border-top:1px solid var(--line)}
.accueilV4 .archive-link {display:grid;grid-template-columns:140px 1fr 115px;gap:20px;padding:20px 0;align-items:start;text-decoration:none;font-size:.9375rem}
.accueilV4 .archive-link:hover .archive-title {text-decoration:underline}
.accueilV4 .archive-medium {font-weight:600}
.accueilV4 .archive-date {font-size:.8125rem;color:var(--muted)}
.accueilV4 .contact {padding-block:74px}
.accueilV4 .contact-layout {display:grid;grid-template-columns:1.3fr 1fr;gap:90px;align-items:center}
.accueilV4 .contact h2 {font-size:clamp(2rem,1.2rem + 2vw,2.8rem);max-width:620px}
.accueilV4 .contact p {color:#e5e5ea;font-size:1rem;margin-top:22px;max-width:520px}
.accueilV4 .contact-actions {display:flex;flex-direction:column;align-items:flex-start;gap:18px}
.accueilV4 .contact-phone {font-size:1.6rem;line-height:1.3;text-decoration:none}
.accueilV4 .contact-phone:hover {text-decoration:underline}
.accueilV4 .contact-small {color:var(--light);font-size:.8125rem}
.accueilV4 .footer {background:var(--ink);color:white;padding:48px 0 30px}
.accueilV4 .footer-top {display:grid;grid-template-columns:1.4fr 1fr 1fr;gap:60px}
.accueilV4 .footer .wordmark {font-size:1.6rem}
.accueilV4 .footer p {font-size:.875rem;color:#d7d7df;max-width:320px;margin-top:18px}
.accueilV4 .footer h3 {font:400 .75rem/1.5 var(--ff-mono);color:var(--light);letter-spacing:.05em;margin-bottom:14px}
.accueilV4 .footer address {font-style:normal;font-size:.9375rem;line-height:1.7}
.accueilV4 .footer-links {display:flex;flex-direction:column;align-items:start;font-size:.875rem}
.accueilV4 .footer-links a {min-height:36px;display:flex;align-items:center}
.accueilV4 .footer-bottom {margin-top:40px;padding-top:23px;border-top:1px solid #ffffff24;display:flex;justify-content:space-between;gap:20px;font-size:.75rem;color:#d7d7df}
.accueilV4 dialog {color:var(--ink);background:white;border:0;padding:0;max-width:min(650px,calc(100% - 32px));max-height:calc(100% - 48px);width:650px;box-shadow:0 25px 100px #0005}
.accueilV4 dialog::backdrop {background:#0a0f2ecc}
.accueilV4 dialog .dialog-body {padding:44px}
.accueilV4 dialog h2 {font-size:2rem;padding-right:35px}
.accueilV4 dialog p {margin-top:20px;color:var(--muted)}
.accueilV4 dialog .btn {margin-top:28px}
.accueilV4 dialog .close {position:absolute;top:10px;right:10px;width:44px;height:44px;font-size:1.75rem}
.accueilV4 .dialog-meta {font:400 .75rem/1.5 var(--ff-mono);color:var(--blue);margin-bottom:18px}
.accueilV4 .dialog-route-note {font-size:.8125rem;border-top:1px solid var(--line);padding-top:18px}
.accueilV4 .route-fallback {margin-top:30px}
.accueilV4 .route-fallback summary {cursor:pointer;min-height:44px}
.accueilV4 .route-fallback>div {padding:24px 0}
.accueilV4 .route-fallback {display:none}
@media(min-width:1600px){
.accueilV4 .hero-art {max-width:510px;margin-left:auto}
.accueilV4 .hero {padding-top:78px}
.accueilV4 .team-panorama img {aspect-ratio:3.6}
}
@media(max-width:1100px){
.accueilV4 .wrap {width:calc(100% - 56px)}
.accueilV4 .hero-grid {grid-template-columns:1.2fr 1fr;gap:20px}
.accueilV4 .hero h1 {font-size:clamp(3rem,1rem + 5vw,5.5rem)}
.accueilV4 .nav {gap:20px}
.accueilV4 .section {padding-block:70px}
.accueilV4 .intro {padding-top:0}
.accueilV4 .intro-body {gap:44px}
.accueilV4 .why-layout {gap:60px}
.accueilV4 .case-card {padding-right:20px}
.accueilV4 .case-card+article {padding-left:20px}
.accueilV4 .tech-person {gap:16px;padding:18px}
.accueilV4 .tech-portrait, .accueilV4 .tech-monogram {width:76px}
.accueilV4 .contact-layout {gap:45px}
.accueilV4 .domain-groups {gap:24px}
.accueilV4 .family-heading {min-height:128px}
}
@media(max-width:850px){
.accueilV4 .wrap {width:calc(100% - 48px)}
.accueilV4 .header-inner {min-height:74px}
.accueilV4 .wordmark {font-size:1.65rem}
.accueilV4 .menu-toggle {display:block}
.accueilV4 .nav {display:none;position:absolute;left:0;right:0;top:100%;padding:20px 24px 28px;background:var(--navy);border-bottom:1px solid var(--light);flex-direction:column;align-items:stretch;gap:10px}
.accueilV4 .nav.open {display:flex}
.accueilV4 .nav a {min-height:48px}
.accueilV4 .hero-grid {grid-template-columns:1.25fr .8fr}
.accueilV4 .hero {padding-top:44px;padding-bottom:45px}
.accueilV4 .hero-art {align-self:center}
.accueilV4 .hero-copy {font-size:1.0625rem}
.accueilV4 .hero-actions {gap:6px}
.accueilV4 .hero-baseline {flex-wrap:wrap;gap:15px 25px}
.accueilV4 .atlas-label, .accueilV4 .globe-axis {font-size:.625rem}
.accueilV4 .intro-body {gap:32px}
.accueilV4 .domain-groups {grid-template-columns:1fr}
.accueilV4 .domain-family {display:grid;grid-template-columns:.65fr 1.35fr;gap:30px;padding-top:10px}
.accueilV4 .family-heading {min-height:0;padding-top:18px}
.accueilV4 .domain-list {padding-top:4px}
.accueilV4 .domain-item:first-child {border-top:0}
.accueilV4 .domain-item {padding-block:18px}
.accueilV4 .why-layout {grid-template-columns:1fr;gap:38px}
.accueilV4 .why-layout h2 {max-width:none}
.accueilV4 .why-intro {max-width:620px;margin-top:20px}
.accueilV4 .why-list {grid-template-columns:1fr 1fr;gap:28px}
.accueilV4 .why-row:last-child {grid-column:1/-1}
.accueilV4 .portal-strip {gap:32px;padding:28px}
.accueilV4 .case-grid {grid-template-columns:1fr}
.accueilV4 .case-card {padding:28px 0;display:grid;grid-template-columns:.65fr 1.35fr;gap:28px}
.accueilV4 .case-card+article {border-left:0;border-top:1px solid var(--line);padding-left:0}
.accueilV4 .case-card h3 {font-size:1.4rem}
.accueilV4 .case-card dl {gap:20px}
.accueilV4 .lawyers {gap:20px}
.accueilV4 .person-card h3 {font-size:1.2rem}
.accueilV4 .person-role {min-height:62px}
.accueilV4 .person-expertise {font-size:.875rem}
.accueilV4 .technical {gap:20px}
.accueilV4 .tech-portrait, .accueilV4 .tech-monogram {width:65px}
.accueilV4 .tech-person {gap:15px;align-items:start}
.accueilV4 .tech-monogram {font-size:2rem}
.accueilV4 .press-card {flex-basis:calc((100% - 28px)/2)}
.accueilV4 .press-track {gap:28px}
.accueilV4 .section-heading {gap:30px}
.accueilV4 .section-heading>p {max-width:320px}
.accueilV4 .contact-layout {grid-template-columns:1fr;gap:35px}
.accueilV4 .contact-actions {flex-direction:row;flex-wrap:wrap;align-items:center;gap:22px}
.accueilV4 .contact-small {width:100%}
.accueilV4 .footer-top {gap:30px}
.accueilV4 .archive-link {grid-template-columns:110px 1fr}
.accueilV4 .archive-date {grid-column:2}
}
@media(max-width:639px){
.accueilV4 .wrap {width:calc(100% - 40px)}
.accueilV4 {font-size:1rem}
.accueilV4 .section {padding-block:52px}
.accueilV4 .header-inner {min-height:70px;gap:16px}
.accueilV4 .wordmark {font-size:1.5rem}
.accueilV4 .hero {padding:36px 0 34px}
.accueilV4 .hero-grid {display:block}
.accueilV4 .hero h1 {font-size:3rem;line-height:1.04}
.accueilV4 .hero-prefix {max-width:330px}
.accueilV4 .hero .eyebrow {font-size:.6875rem;margin-bottom:19px}
.accueilV4 .rotating {max-width:100%;min-height:100px}
.accueilV4 .hero-copy {margin-top:20px;font-size:1.0625rem;max-width:370px}
.accueilV4 .hero-actions {margin-top:24px;align-items:flex-start;flex-direction:column;gap:7px}
.accueilV4 .hero-actions .btn {width:100%;justify-content:space-between;font-size:.9375rem;padding-inline:17px;gap:14px}
.accueilV4 .motion-control {margin-top:8px}
.accueilV4 .hero-art {width:195px;margin:9px auto 0;aspect-ratio:1/1}
.accueilV4 .globe-axis, .accueilV4 .atlas-label {display:none}
.accueilV4 .hero-baseline {margin-top:14px;padding-top:18px;gap:9px 22px;font-size:.75rem}
.accueilV4 .intro {padding-top:0}
.accueilV4 .team-panorama img {aspect-ratio:2.26;object-fit:contain;object-position:center center}
.accueilV4 .intro-body {padding-top:32px;display:block}
.accueilV4 .intro-body h2 {font-size:1.75rem;margin-bottom:24px}
.accueilV4 .intro-body p {line-height:1.65}
.accueilV4 .intro-body .eyebrow {margin-bottom:12px}
.accueilV4 .intro-body .text-link {margin-top:13px}
.accueilV4 .section-heading {display:block;margin-bottom:30px}
.accueilV4 .section-heading>p {margin-top:20px;max-width:none}
.accueilV4 .section-heading .eyebrow {margin-bottom:12px}
.accueilV4 .domain-family {display:block;padding-top:0}
.accueilV4 .family-heading {padding:21px 0 10px;gap:15px}
.accueilV4 .family-number {font-size:2.3rem}
.accueilV4 .family-heading h3 {font-size:1.25rem;max-width:240px}
.accueilV4 .domain-groups {gap:25px}
.accueilV4 .domain-item {padding:18px 0}
.accueilV4 .domain-item a {font-size:1.0625rem;min-height:0}
.accueilV4 .domain-item p {font-size:.9375rem;margin-top:9px}
.accueilV4 .why-list {display:block}
.accueilV4 .why-row+.why-row {margin-top:25px}
.accueilV4 .why-layout {gap:30px}
.accueilV4 .why-row {grid-template-columns:25px 1fr;gap:14px}
.accueilV4 .why-row h3 {font-size:1.2rem}
.accueilV4 .why-row p {font-size:.9375rem}
.accueilV4 .portal-strip {display:block;padding:25px 21px;margin-top:36px}
.accueilV4 .portal-strip h3 {font-size:1.5rem}
.accueilV4 .portal-mini {margin-top:26px;padding:17px 14px}
.accueilV4 .portal-mini ul {gap:7px}
.accueilV4 .portal-mini li {font-size:.6875rem;padding:10px 6px}
.accueilV4 .portal-top {font-size:.625rem}
.accueilV4 .case-card {display:block;padding:26px 0}
.accueilV4 .case-kicker {margin-bottom:12px}
.accueilV4 .case-card h3 {font-size:1.375rem;margin-bottom:22px}
.accueilV4 .case-card dl {gap:18px}
.accueilV4 .case-card dd {font-size:.9375rem}
.accueilV4 .case-outcome {padding:17px}
.accueilV4 .case-note {font-size:.75rem}
.accueilV4 .lawyers {grid-template-columns:1fr;gap:33px}
.accueilV4 .person-card {display:grid;grid-template-columns:120px 1fr;gap:18px}
.accueilV4 .person-photo {align-self:start}
.accueilV4 .person-photo img {aspect-ratio:.8;object-fit:cover}
.accueilV4 .person-card h3 {font-size:1.25rem;margin-top:0}
.accueilV4 .person-role {min-height:0;font-size:.8125rem;margin-top:8px}
.accueilV4 .person-expertise {margin-top:13px;padding-top:11px;font-size:.875rem}
.accueilV4 .technical-heading {margin-top:36px;font-size:.6875rem}
.accueilV4 .technical {grid-template-columns:1fr;gap:16px}
.accueilV4 .tech-person {padding:18px;gap:18px}
.accueilV4 .tech-portrait, .accueilV4 .tech-monogram {width:65px;min-height:88px}
.accueilV4 .tech-person h3 {font-size:1.125rem}
.accueilV4 .technical-note {font-size:.75rem}
.accueilV4 .press-heading {display:flex;gap:15px;align-items:flex-end}
.accueilV4 .press-heading h2 {font-size:1.75rem}
.accueilV4 .press-heading .eyebrow {font-size:.6875rem}
.accueilV4 .carousel-controls {gap:7px}
.accueilV4 .round-button {width:42px;height:44px}
.accueilV4 .press-track {gap:22px;margin-right:-20px;padding-right:20px}
.accueilV4 .press-card {flex-basis:86%;scroll-margin-right:20px}
.accueilV4 .press-media {font-size:2rem}
.accueilV4 .press-card h3 {font-size:1.2rem}
.accueilV4 .press-bottom {gap:10px;align-items:start}
.accueilV4 .press-bottom .text-link {font-size:.8125rem;max-width:210px;text-align:left;line-height:1.5}
.accueilV4 .press-counter {padding-top:11px;white-space:nowrap}
.accueilV4 .archive-link {display:block;padding-block:19px}
.accueilV4 .archive-medium, .accueilV4 .archive-title, .accueilV4 .archive-date {display:block}
.accueilV4 .archive-title {margin-top:8px}
.accueilV4 .archive-date {margin-top:7px}
.accueilV4 .contact {padding-block:48px}
.accueilV4 .contact h2 {font-size:2rem}
.accueilV4 .contact-layout {gap:28px}
.accueilV4 .contact p {font-size:.9375rem}
.accueilV4 .contact-actions {flex-direction:column;align-items:flex-start;gap:22px}
.accueilV4 .contact-actions .btn {width:100%;justify-content:space-between;gap:15px;padding-inline:18px}
.accueilV4 .contact-phone {font-size:1.6rem}
.accueilV4 .footer {padding:38px 0 24px}
.accueilV4 .footer-top {grid-template-columns:1fr;gap:30px}
.accueilV4 .footer p {margin-top:17px}
.accueilV4 .footer-bottom {display:block;margin-top:30px;line-height:1.7}
.accueilV4 .footer-bottom span+span {display:block;margin-top:8px}
.accueilV4 dialog .dialog-body {padding:35px 24px}
.accueilV4 dialog h2 {font-size:1.75rem}
}
@media(prefers-reduced-motion:reduce){
.accueilV4 {scroll-behavior:auto}
.accueilV4 *, .accueilV4 *::before, .accueilV4 *::after {animation:none!important;transition:none!important}
.accueilV4 .person-card:hover img {transform:none}
}
@media print{
.accueilV4 .header, .accueilV4 .motion-control, .accueilV4 .carousel-controls, .accueilV4 .hero-art, .accueilV4 .press-archive[hidden] {display:none}
.accueilV4 .hero {padding:25px 0}
.accueilV4 .dark {background:#fff;color:#0a0a14}
.accueilV4 .hero-copy, .accueilV4 .dark .eyebrow {color:#4a4a63}
.accueilV4 .rotating {color:#1a47ff}
.accueilV4 .wrap {width:100%}
.accueilV4 .section {padding-block:28px}
.accueilV4 .press-track {overflow:visible;display:grid;grid-template-columns:repeat(2,1fr)}
.accueilV4 .press-card {break-inside:avoid}
.accueilV4 .case-card, .accueilV4 .person-card {break-inside:avoid}
.accueilV4 a {color:inherit}
.accueilV4 .footer {background:#fff;color:#000}
.accueilV4 .footer p, .accueilV4 .footer h3 {color:#4a4a63}
}
.accueilV4 /* Lisibilité des contenus et repli du portail avec les mots réels. */
.domain-item p, .accueilV4 .case-card dd, .accueilV4 .portal-strip p, .accueilV4 .why-row p, .accueilV4 .contact p {font-size:1rem}
@media(max-width:850px){
.accueilV4 .portal-strip {grid-template-columns:1fr;gap:26px}
.accueilV4 .portal-mini {width:100%}
}
@media(max-width:639px){
.accueilV4 .hero .eyebrow, .accueilV4 .technical-heading, .accueilV4 .press-heading .eyebrow, .accueilV4 .portal-top {font-size:.75rem}
.accueilV4 .portal-mini ul {grid-template-columns:1fr;gap:8px}
.accueilV4 .portal-mini li {font-size:.8125rem;display:flex;align-items:center;gap:12px;padding:11px 12px}
.accueilV4 .portal-mini li span {width:24px;margin:0}
.accueilV4 .person-role, .accueilV4 .tech-person p {font-size:.875rem}
.accueilV4 .hero-art {width:175px}
.accueilV4 .hero-baseline {margin-top:10px}
}
.accueilV4 /* V2 — repères affirmés, .accueilV4 contours lisibles et même échelle de portraits. */
:root {--off:#f5f5f7;--light:#fff}
.accueilV4 .rotating {color:var(--blue)}
.accueilV4 .wordmark span {color:var(--blue)}
.accueilV4 .dark .eyebrow, .accueilV4 .motion-control, .accueilV4 .atlas-label, .accueilV4 .globe-axis, .accueilV4 .hero-baseline, .accueilV4 .contact-small {color:#e5e5ea}
.accueilV4 .dark .text-link {color:#fff;text-decoration:underline}
.accueilV4 .globe {color:var(--blue)}
.accueilV4 .globe .cross-line, .accueilV4 .globe .orbit {stroke:var(--blue);opacity:.7}
.accueilV4 .globe .grid-line {opacity:.85}
.accueilV4 .globe .node {stroke:var(--blue)}
.accueilV4 .domain-groups {gap:26px;align-items:stretch}
.accueilV4 .domain-family {background:#fff;border:1px solid #d4d4df;border-top:4px solid var(--ink);padding:26px 24px 8px;display:flex;flex-direction:column;min-width:0}
.accueilV4 .family-heading {display:block;padding:0 0 23px;min-height:0}
.accueilV4 .family-number {display:block;font-size:4.5rem;line-height:1;margin-bottom:19px;color:var(--blue)}
.accueilV4 .family-heading h3 {font-size:1.4rem;line-height:1.25;min-height:2.5em;display:flex;align-items:flex-start}
.accueilV4 .family-purpose {font-size:1rem;line-height:1.5;margin-top:10px;color:var(--muted);min-height:3em}
.accueilV4 .domain-list {padding:0}
.accueilV4 .domain-item, .accueilV4 .domain-item:first-child {border-top:1px solid #d4d4df;padding:0}
.accueilV4 .domain-item a.domain-entry {display:block;padding:21px 0;min-height:44px;position:relative}
.accueilV4 .domain-entry-head {display:flex;gap:15px;align-items:start;justify-content:space-between}
.accueilV4 .domain-title {font-size:1.125rem;line-height:1.35}
.accueilV4 .domain-description {display:block;font-size:1rem;line-height:1.55;font-weight:400;color:var(--muted);margin-top:9px}
.accueilV4 .domain-entry:hover, .accueilV4 .domain-entry:focus-visible {background:#f5f5f7}
.accueilV4 .domain-entry:hover .domain-title {color:var(--blue)}
.accueilV4 .domain-entry .arrow {font-size:1.4rem;line-height:1.2;flex-shrink:0}
.accueilV4 .why-row {grid-template-columns:62px 1fr;gap:22px}
.accueilV4 .why-row .num {font-family:var(--ff-display);font-size:3.75rem;line-height:1;color:var(--blue)}
.accueilV4 .portal-strip {background:var(--blue);gap:45px}
.accueilV4 .portal-strip .eyebrow, .accueilV4 .portal-strip p {color:#fff}
.accueilV4 .portal-strip h3 {font-size:1.8rem}
.accueilV4 .case-grid {border:1px solid var(--ink);align-items:stretch}
.accueilV4 .case-card, .accueilV4 .case-card+article {padding:30px 26px;border:0}
.accueilV4 .case-card+article {border-left:1px solid #d4d4df}
.accueilV4 .case-card.is-active {background:var(--navy);color:#fff}
.accueilV4 .case-card.is-active .case-kicker, .accueilV4 .case-card.is-active dt {color:#d7d7df}
.accueilV4 .case-card.is-active .case-outcome {background:transparent;border-top:2px solid var(--blue);padding:18px 0 0}
.accueilV4 .case-card.is-active .case-outcome dt {color:#fff}
.accueilV4 .case-card h3 {font-size:1.5rem}
.accueilV4 .case-kicker {font-size:.75rem;letter-spacing:.015em}
.accueilV4 .case-outcome {border-top:2px solid var(--blue);background:#f5f5f7}
.accueilV4 .team-grid {display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:22px}
.accueilV4 .team-grid .person-photo {aspect-ratio:.82;background:var(--navy)}
.accueilV4 .team-grid .person-photo img {width:100%;height:100%;aspect-ratio:auto;object-fit:cover;object-position:center 25%}
.accueilV4 .person-monogram {display:flex;width:100%;height:100%;align-items:center;justify-content:center;background:var(--navy);color:#fff;font:400 5rem/1 var(--ff-display)}
.accueilV4 .person-status {font:400 .75rem/1.5 var(--ff-mono);color:var(--blue);margin-top:18px;letter-spacing:.02em}
.accueilV4 .team-grid .person-card h3 {margin-top:8px;font-size:1.2rem;line-height:1.25;min-height:2.5em;overflow-wrap:break-word}
.accueilV4 .team-grid .person-role {font-size:.875rem;line-height:1.5;min-height:0;margin-top:9px}
.accueilV4 .team-grid .person-expertise {font-size:.9375rem;line-height:1.5;margin-top:15px;padding-top:13px}
.accueilV4 .technical-note {margin-top:25px;font-size:.875rem}
.accueilV4 .press-section {border-top:1px solid var(--line)}
.accueilV4 .press-media {color:var(--ink)}
@media(min-width:851px) and (max-width:1100px){
.accueilV4 .domain-family {padding:22px 19px 6px}
.accueilV4 .family-heading h3 {font-size:1.25rem}
.accueilV4 .family-number {font-size:4rem}
.accueilV4 .domain-groups {gap:20px}
.accueilV4 .domain-title {font-size:1.0625rem}
.accueilV4 .domain-description {font-size:1rem}
.accueilV4 .case-card, .accueilV4 .case-card+article {padding:25px 20px}
.accueilV4 .team-grid {grid-template-columns:repeat(3,minmax(0,1fr));gap:30px 24px}
.accueilV4 .team-grid .person-photo {aspect-ratio:1}
}
@media(max-width:850px){
.accueilV4 .domain-family {display:grid;grid-template-columns:.7fr 1.3fr;gap:28px;padding:24px}
.accueilV4 .family-heading {padding:0}
.accueilV4 .family-heading h3 {min-height:0;display:block}
.accueilV4 .family-purpose {min-height:0}
.accueilV4 .family-number {font-size:4rem}
.accueilV4 .domain-item:first-child {border-top:0}
.accueilV4 .domain-item:first-child a {padding-top:0}
.accueilV4 .case-card, .accueilV4 .case-card+article {padding:26px;border:0}
.accueilV4 .case-card+article {border-top:1px solid #d4d4df}
.accueilV4 .case-card dl {height:auto}
.accueilV4 .team-grid {grid-template-columns:repeat(3,minmax(0,1fr));gap:28px 22px}
.accueilV4 .team-grid .person-photo {aspect-ratio:.88}
.accueilV4 .team-grid .person-card h3 {font-size:1.2rem}
.accueilV4 .portal-strip {gap:26px}
}
@media(max-width:639px){
.accueilV4 .domain-family {display:block;padding:23px 20px 3px}
.accueilV4 .family-heading {display:grid;grid-template-columns:60px 1fr;column-gap:17px;padding-bottom:21px;align-items:start}
.accueilV4 .family-number {font-size:3.8rem;margin:0;grid-row:1/3}
.accueilV4 .family-heading h3 {font-size:1.25rem;min-height:0}
.accueilV4 .family-purpose {grid-column:2;font-size:.9375rem;margin-top:8px;min-height:0}
.accueilV4 .domain-item:first-child {border-top:1px solid #d4d4df}
.accueilV4 .domain-item:first-child a.domain-entry {padding-top:20px}
.accueilV4 .domain-item a.domain-entry {padding:20px 0}
.accueilV4 .domain-title {font-size:1.125rem}
.accueilV4 .domain-description {font-size:1rem}
.accueilV4 .why-row {grid-template-columns:43px 1fr;gap:15px}
.accueilV4 .why-row .num {font-size:3rem}
.accueilV4 .portal-strip h3 {font-size:1.5rem}
.accueilV4 .case-card, .accueilV4 .case-card+article {padding:25px 21px}
.accueilV4 .case-card h3 {font-size:1.4rem}
.accueilV4 .team-grid {grid-template-columns:1fr;gap:29px}
.accueilV4 .team-grid .person-card {display:grid;grid-template-columns:104px 1fr;gap:18px}
.accueilV4 .team-grid .person-photo {aspect-ratio:.78}
.accueilV4 .team-grid .person-card h3 {margin-top:5px;min-height:0;font-size:1.25rem}
.accueilV4 .team-grid .person-status {margin-top:0;font-size:.75rem}
.accueilV4 .team-grid .person-role {font-size:.875rem}
.accueilV4 .team-grid .person-expertise {font-size:.9375rem}
.accueilV4 .person-monogram {font-size:3.5rem}
.accueilV4 .technical-note {font-size:.875rem}
.accueilV4 .case-kicker {font-size:.75rem}
}
.accueilV4 /* V3 : une seule série de repères, .accueilV4 portail clair et hero allégé. */
.why-row {display:block}
.accueilV4 .portal-strip {background:#eef2ff;color:var(--navy);border:1px solid #d8dff4;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr)}
.accueilV4 .portal-strip .eyebrow {color:var(--blue)}
.accueilV4 .portal-strip p {color:var(--muted)}
.accueilV4 .portal-strip h3 {color:var(--navy)}
.accueilV4 .portal-strip>div, .accueilV4 .hero-grid>div, .accueilV4 .contact-layout>div, .accueilV4 .family-heading>*, .accueilV4 .person-info {min-width:0}
.accueilV4 .portal-top {font-size:.75rem;flex-wrap:wrap;gap:8px 16px}
.accueilV4 .portal-mini li {font-size:.875rem;min-width:0;overflow-wrap:anywhere}
.accueilV4 .hero h1 {overflow-wrap:anywhere}
.accueilV4 .hero-baseline {margin-top:24px;padding-top:18px}
.accueilV4 .hero-baseline span {display:flex}
.accueilV4 .motion-control {min-width:76px;min-height:44px;padding-inline:6px;font-size:.875rem}
.accueilV4 .press-track {padding-left:8px;padding-top:8px;scroll-padding-left:8px}
.accueilV4 .round-button {min-width:44px;min-height:44px}
.accueilV4 #pourquoi {padding-bottom:56px}
.accueilV4 #dossiers {padding-top:32px}
@media(max-width:1100px){
.accueilV4 .portal-strip {grid-template-columns:1fr;gap:26px}
.accueilV4 .portal-mini {width:100%}
}
@media(max-width:850px){
.accueilV4 .portal-mini {margin-top:0}
.accueilV4 .portal-strip h3 {max-width:650px}
.accueilV4 #pourquoi {padding-bottom:40px}
.accueilV4 #dossiers {padding-top:24px}
}
@media(max-width:639px){
.accueilV4 .why-row {display:block}
.accueilV4 .portal-strip {padding:24px 20px;margin-top:32px}
.accueilV4 .portal-mini {margin-top:24px;padding:18px 14px}
.accueilV4 .portal-mini ul {grid-template-columns:1fr}
.accueilV4 .portal-mini li {font-size:.875rem;padding:12px}
.accueilV4 .portal-top {font-size:.75rem}
.accueilV4 .family-purpose {font-size:1rem}
.accueilV4 .hero-baseline {margin-top:12px;padding-top:16px}
.accueilV4 .hero-baseline span {display:flex}
.accueilV4 .header-inner {flex-wrap:wrap}
.accueilV4 .header .wordmark {white-space:normal;flex:1;min-width:0;line-height:1.15}
.accueilV4 .menu-toggle {flex-shrink:0}
.accueilV4 #pourquoi {padding-bottom:28px}
.accueilV4 #dossiers {padding-top:20px}
}
@media(max-width:639px){
.accueilV4 .footer .wordmark {white-space:normal;overflow-wrap:anywhere}
}
.accueilV4 /* V4 : globe réservé au grand écran ; halo mobile sans place dans le flux. */
.globe .cross-line {fill:none}
@media(max-width:850px){
.accueilV4 .hero-art {display:none}
.accueilV4 .hero-grid {display:block}
.accueilV4 .hero-grid>div:first-child {max-width:680px}
.accueilV4 .hero {isolation:isolate}
.accueilV4 .hero::before {content:"";position:absolute;top:0;right:0;width:min(68%,340px);height:64px;z-index:0;pointer-events:none;background:radial-gradient(ellipse at 100% 0%,rgba(26,71,255,.5) 0%,rgba(26,71,255,.2) 40%,rgba(26,71,255,0) 73%)}
.accueilV4 .hero>.wrap {position:relative;z-index:1}
.accueilV4 .team-panorama {width:calc(100% + 48px);margin-inline:-24px;background:transparent}
.accueilV4 .team-panorama img {width:100%;height:auto;aspect-ratio:auto;object-fit:cover;object-position:center}
}
@media(max-width:639px){
.accueilV4 .team-panorama {width:calc(100% + 40px);margin-inline:-20px}
.accueilV4 .team-grid {grid-template-columns:1fr;gap:32px}
.accueilV4 .team-grid .person-card {display:block;width:100%;max-width:400px;margin-inline:auto}
.accueilV4 .team-grid .person-photo {width:100%;aspect-ratio:4/3}
.accueilV4 .team-grid .person-photo img {width:100%;height:100%;object-fit:cover;object-position:center top}
.accueilV4 .team-grid .person-info {padding-top:16px}
.accueilV4 .team-grid .person-status {margin-top:0}
.accueilV4 .team-grid .person-card h3 {margin-top:7px;font-size:1.375rem;min-height:0;line-height:1.25}
.accueilV4 .team-grid .person-role {font-size:1rem;line-height:1.5;margin-top:8px}
.accueilV4 .team-grid .person-expertise {font-size:1rem;line-height:1.5;margin-top:12px;padding-top:12px}
.accueilV4 .team-grid .person-monogram {font-size:4rem}
}
.accueilV4 /* V4 : trois arguments lisibles, .accueilV4 avec une priorité au binôme droit-technique. */
.why-layout {grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);gap:64px;align-items:start}
.accueilV4 .why-list {display:grid;grid-template-columns:1fr;gap:18px}
.accueilV4 .why-list .why-row {margin:0;padding:26px 28px;border:1px solid #d4d4df;border-left:4px solid var(--blue);background:#fff;grid-column:auto}
.accueilV4 .why-row h3 {font-size:1.125rem;font-weight:500;line-height:1.4;margin-bottom:15px}
.accueilV4 .why-emphasis {display:block;font-family:var(--ff-display);font-weight:400;font-size:2.625rem;line-height:1.08;color:var(--blue);margin-top:5px}
.accueilV4 .why-list .why-row:nth-child(2) {background:var(--navy);border-color:var(--navy);border-left-color:var(--blue);color:#fff}
.accueilV4 .why-row:nth-child(2) .why-emphasis {color:#fff}
.accueilV4 .why-row:nth-child(2) p {color:#e5e5ea}
.accueilV4 .why-list .why-row:nth-child(3) {background:var(--off)}
.accueilV4 /* L'accent suit le dossier parcouru ; aucun texte n'est masqué. */
.case-card {transition:background-color 160ms ease,color 160ms ease}
.accueilV4 .case-card .case-kicker, .accueilV4 .case-card dt {transition:color 160ms ease}
.accueilV4 .case-card:focus-visible {outline:3px solid var(--blue);outline-offset:-6px}
.accueilV4 .case-card .case-outcome, .accueilV4 .case-card.is-active .case-outcome {padding:18px;background:var(--off);border-top:2px solid var(--blue)}
.accueilV4 .case-card.is-active .case-outcome {background:#171e42}
.accueilV4 /* Deux groupes de rôles ; les cinq cadres gardent les mêmes dimensions. */
.team-grid {grid-template-columns:repeat(5,minmax(0,1fr));gap:24px}
.accueilV4 .team-group {display:grid;gap:24px;align-content:start;min-width:0;position:relative}
.accueilV4 .team-group-lawyers {grid-column:1/span 3;grid-template-columns:repeat(3,minmax(0,1fr))}
.accueilV4 .team-group-technical {grid-column:4/span 2;grid-template-columns:repeat(2,minmax(0,1fr))}
.accueilV4 .team-group-technical::before {content:"";position:absolute;left:-12px;top:0;bottom:0;width:1px;background:#bbbcca}
.accueilV4 .team-group-label {grid-column:1/-1;font:400 .75rem/1.5 var(--ff-mono);color:var(--muted);letter-spacing:.04em;text-transform:uppercase}
.accueilV4 .team-grid .person-photo {aspect-ratio:.82}
.accueilV4 a .arrow {display:inline-block;transition:transform 160ms ease}
.accueilV4 a:hover .arrow, .accueilV4 a:focus-visible .arrow {transform:translateX(3px)}
@media(max-width:1100px){
.accueilV4 .team-grid {grid-template-columns:1fr;gap:38px}
.accueilV4 .team-group-lawyers, .accueilV4 .team-group-technical {grid-column:1;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.accueilV4 .team-group-technical {padding-top:28px;border-top:1px solid #bbbcca}
.accueilV4 .team-group-technical::before {display:none}
.accueilV4 .team-grid .person-photo {aspect-ratio:1}
}
@media(max-width:850px){
.accueilV4 .why-layout {grid-template-columns:1fr;gap:30px}
.accueilV4 .why-list {grid-template-columns:1fr;gap:18px}
}
@media(max-width:639px){
.accueilV4 .why-list .why-row {padding:22px 20px;margin:0}
.accueilV4 .why-emphasis {font-size:2.25rem}
.accueilV4 .team-grid {gap:36px}
.accueilV4 .team-group-lawyers, .accueilV4 .team-group-technical {grid-template-columns:1fr;gap:30px}
.accueilV4 .team-group-label {width:100%;max-width:400px;margin-inline:auto}
.accueilV4 .team-grid .person-photo {aspect-ratio:4/3}
.accueilV4 .team-group-technical {padding-top:28px}
}
@media(prefers-reduced-motion:reduce){
.accueilV4 .case-card, .accueilV4 .case-card .case-kicker, .accueilV4 .case-card dt, .accueilV4 a .arrow {transition:none}
.accueilV4 a:hover .arrow, .accueilV4 a:focus-visible .arrow {transform:none}
}
.accueilV4 /* Accueil synthétique, .accueilV4 détails complets dans l'aperçu des cas pratiques. */
#dossiers .section-heading {align-items:center}
.accueilV4 #dossiers .case-library-link {flex-shrink:0;color:var(--ink);border:1px solid var(--ink);background:transparent}
.accueilV4 .case-card dl {height:auto;flex:1}
.accueilV4 .case-detail-link {display:flex;align-items:center;gap:12px;align-self:flex-start;margin-top:26px;min-height:44px;color:var(--blue);font-weight:500;text-decoration:underline;text-underline-offset:4px}
.accueilV4 .case-card.is-active .case-detail-link {color:#fff}
.accueilV4 .case-library {max-width:1160px;margin:0 auto;padding:48px 24px}
.accueilV4 .case-library-intro {color:var(--muted);margin:18px 0 30px}
.accueilV4 .case-library-items {display:grid;gap:36px}
.accueilV4 .case-detail-article {padding-top:24px;border-top:1px solid var(--line)}
.accueilV4 .case-detail-article h3 {font-size:1.6rem;line-height:1.25;margin:10px 0 24px}
.accueilV4 .case-detail-article dl {display:grid;gap:20px}
.accueilV4 .case-detail-article dt {font:400 .75rem/1.5 var(--ff-mono);color:var(--muted);margin-bottom:8px}
.accueilV4 .case-detail-article dd {margin:0;font-size:1rem}
.accueilV4 #cases-dialog .case-library {padding:0;max-width:none}
.accueilV4 #cases-dialog {max-width:760px}
@media(max-width:850px){
.accueilV4 .case-detail-link {grid-column:1/-1;margin-top:0}
}
@media(max-width:639px){
.accueilV4 #dossiers .section-heading {align-items:flex-start}
.accueilV4 .case-detail-link {margin-top:22px}
.accueilV4 .case-library {padding-inline:20px}
}
.accueilV4 /* V4 — bloc presse compact. Charger après styles.css.
   Portée : #contributions uniquement. Aucune publication ajoutée.
   Référence audit TYPO-010 / TYPO-030 : moins de niveaux simultanés, .accueilV4 blancs rapprochant média, .accueilV4 attribution, .accueilV4 date et sujet.
   La navigation reste manuelle ; ce fichier n'ajoute aucune rotation.
   Les titres intégraux restent lisibles : ni line-clamp ni hauteur fixe.
*/

#contributions.press-section {
  padding-block: clamp(3rem, 2rem + 2vw, 4rem);
}
.accueilV4 #contributions > .wrap {
  width: min(var(--measure), calc(100% - 80px));
}
.accueilV4 #contributions .press-heading {
  gap: 24px;
  margin-bottom: 24px;
}
.accueilV4 #contributions .press-heading .eyebrow {
  font-size: .75rem;
  line-height: 1.5;
  margin-bottom: 10px;
}
.accueilV4 #contributions .carousel-controls { gap: 8px; }
.accueilV4 #contributions .round-button {
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
}
.accueilV4 #contributions .press-track {
  display: flex;
  align-items: stretch;
  gap: 24px;
  margin-inline: 0;
  padding: 8px 8px 18px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  scroll-padding-inline: 8px;
  /* Défilement natif ou commandes existantes, jamais automatique. */
}
.accueilV4 #contributions .press-card {
  flex: 0 0 calc((100% - 72px) / 4);
  min-width: 0;
  border-top: 2px solid var(--ink);
  padding-top: 16px;
  scroll-snap-align: start;
  scroll-margin: 0;
  display: flex;
  flex-direction: column;
}
.accueilV4 #contributions .press-media {
  font-size: clamp(1.625rem, 1.25rem + .5vw, 1.875rem);
  line-height: 1.1;
  min-height: 1.1em;
  margin-bottom: 11px;
  color: var(--ink);
  overflow-wrap: anywhere;
}
.accueilV4 #contributions .press-card[data-media="Le Monde"] .press-media {
  font-size: clamp(1.5rem, 1.2rem + .4vw, 1.75rem);
  line-height: 1.1;
  letter-spacing: -.035em;
}
.accueilV4 #contributions .press-meta {
  font-family: Mono, monospace;
  font-size: .75rem;
  line-height: 1.5;
  letter-spacing: 0;
  margin-bottom: 12px;
  color: var(--muted);
}
.accueilV4 #contributions .press-card h3 {
  font-family: Space, Arial, sans-serif;
  font-weight: 500;
  font-size: clamp(1.125rem, 1rem + .2vw, 1.25rem);
  line-height: 1.35;
  letter-spacing: -.012em;
  margin-bottom: 12px;
  overflow-wrap: anywhere;
}
.accueilV4 /* Le thème reste visible, .accueilV4 notamment pour les publications en anglais. */
#contributions .press-card .topic {
  display: block;
  font-size: .8125rem;
  line-height: 1.45;
  color: var(--muted);
  margin: 0 0 8px;
  padding: 0;
  overflow-wrap: anywhere;
}
.accueilV4 #contributions .press-card .text-link {
  font-size: .875rem;
  line-height: 1.4;
  min-height: 44px;
  gap: 10px;
  margin-top: auto;
  padding-top: 3px;
  align-self: flex-start;
  max-width: 100%;
  overflow-wrap: anywhere;
}
.accueilV4 #contributions .press-card .text-link .arrow { flex-shrink: 0; }
.accueilV4 #contributions .press-card .access {
  font-size: .75rem;
  line-height: 1.5;
  margin-top: 0;
}
.accueilV4 #contributions .press-bottom {
  gap: 16px;
  margin-top: 8px;
  align-items: center;
}
.accueilV4 #contributions .press-counter {
  font-size: .75rem;
  line-height: 1.5;
  padding-top: 0;
}
.accueilV4 #contributions .press-bottom .text-link {
  font-size: .875rem;
  line-height: 1.45;
  gap: 10px;
  min-height: 44px;
}
.accueilV4 #contributions .press-archive {
  margin-top: 22px;
  padding-top: 10px;
}
@media (min-width: 851px) and (max-width: 1100px){
.accueilV4 #contributions > .wrap { width: calc(100% - 56px); }
.accueilV4 #contributions .press-track { gap: 22px; }
.accueilV4 #contributions .press-card { flex-basis: calc((100% - 44px) / 3); }
}
@media (min-width: 640px) and (max-width: 850px){
.accueilV4 #contributions > .wrap { width: calc(100% - 48px); }
.accueilV4 #contributions .press-track { gap: 20px; }
.accueilV4 #contributions .press-card { flex-basis: calc((100% - 20px) / 2); }
}
@media (max-width: 639px){
.accueilV4 #contributions > .wrap { width: calc(100% - 40px); }
.accueilV4 #contributions .press-heading {
    display: flex;
    align-items: flex-end;
    gap: 15px;
    margin-bottom: 22px;
  }
.accueilV4 #contributions .press-heading > div:first-child { min-width: 0; }
.accueilV4 #contributions .press-heading .eyebrow { overflow-wrap: anywhere; }
.accueilV4 #contributions .press-track {
    gap: 16px;
    margin-right: -20px;
    padding: 8px 20px 16px 8px;
  }
.accueilV4 #contributions .press-card {
    /* Environ une carte + un aperçu de la suivante, selon les marges. */
    flex-basis: calc((100% - 16px) / 1.12);
    padding-top: 15px;
  }
.accueilV4 #contributions .press-card h3 { font-size: 1.125rem; }
.accueilV4 #contributions .press-meta { font-size: .75rem; }
.accueilV4 #contributions .press-bottom { align-items: flex-start; gap: 12px; }
.accueilV4 #contributions .press-counter { padding-top: 11px; }
.accueilV4 #contributions .press-bottom .text-link {
    font-size: .875rem;
    max-width: 205px;
    text-align: left;
  }
}
@media print{
.accueilV4 #contributions .carousel-controls, .accueilV4 #contributions .press-bottom { display: none; }
.accueilV4 #contributions .press-track {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow: visible;
    margin: 0;
    padding: 0;
    gap: 24px;
  }
.accueilV4 #contributions .press-card { break-inside: avoid; }
}
.accueilV4 #cases-dialog {width:min(760px,calc(100% - 32px));max-width:760px}
.accueilV4 #cases-dialog .cases-dialog-content {padding:72px 32px 32px}
.accueilV4 #cases-dialog .close {top:14px;right:14px;width:auto;min-width:88px;padding:0 12px;font-size:1rem;display:flex;align-items:center;justify-content:center;gap:12px}
.accueilV4 #cases-dialog .close:focus-visible {outline:3px solid var(--blue);outline-offset:2px}
@media(max-width:639px){
.accueilV4 #cases-dialog .cases-dialog-content {padding:70px 20px 26px}
}
`;
