// AUTO-GÉNÉRÉ depuis la maquette cybersécurité V4 (base.css + cyber.css), scopé sous .cyberV4.
// Polices remappées sur les tokens du site. Rendu via <style> dans le composant.
export const CYBER_V4_CSS = String.raw`
.cyberV4 {--navy:#0a0f2e;--ink:#101323;--blue:#1a47ff;--off:#f5f5f7;--muted:#50536a;--line:#d9dbe4;--soft:#eef2ff;--red:#a52b28;--measure:1200px}
.cyberV4 * {box-sizing:border-box}
.cyberV4 {scroll-behavior:smooth;scroll-padding-top:100px}
.cyberV4 {margin:0;font:400 17px/1.65 var(--ff-body);color:var(--ink);background:#fff;-webkit-font-smoothing:antialiased}
.cyberV4 h1, .cyberV4 h2, .cyberV4 h3, .cyberV4 h4, .cyberV4 p, .cyberV4 figure {margin:0}
.cyberV4 h1, .cyberV4 h2, .cyberV4 h3, .cyberV4 h4 {font-weight:500}
.cyberV4 h2 {font-size:clamp(28px,2.7vw,42px);line-height:1.15;letter-spacing:-.035em}
.cyberV4 h3 {font-size:22px;line-height:1.3;letter-spacing:-.02em}
.cyberV4 p {max-width:72ch}
.cyberV4 a {color:inherit;text-underline-offset:5px}
.cyberV4 button, .cyberV4 input, .cyberV4 select, .cyberV4 textarea {font:inherit}
.cyberV4 button {cursor:pointer}
.cyberV4 button, .cyberV4 a {-webkit-tap-highlight-color:transparent}
.cyberV4 button {color:inherit}
.cyberV4 img, .cyberV4 video {display:block;max-width:100%}
.cyberV4 img {height:auto}
.cyberV4 button:focus-visible, .cyberV4 a:focus-visible, .cyberV4 summary:focus-visible, .cyberV4 select:focus-visible {outline:3px solid var(--blue);outline-offset:5px}
.cyberV4 .dark :focus-visible {outline-color:#fff}
.cyberV4 [hidden] {display:none!important}
.cyberV4 .wrap {width:min(var(--measure),calc(100% - 80px));margin-inline:auto}
.cyberV4 .section {padding-block:80px}
.cyberV4 .soft {background:var(--off)}
.cyberV4 .dark {color:#fff;background:var(--navy)}
.cyberV4 .eyebrow {display:block;margin-bottom:17px;font:400 12px/1.5 var(--ff-mono);letter-spacing:.12em;text-transform:uppercase;color:var(--blue)}
.cyberV4 .dark .eyebrow {color:#dadff5}
.cyberV4 .section-head {display:flex;justify-content:space-between;align-items:end;gap:44px;margin-bottom:38px}
.cyberV4 .section-head>p {max-width:400px;color:var(--muted);font-size:16px}
.cyberV4 .dark .section-head>p {color:#dce0ee}
.cyberV4 .section-head h2 {max-width:610px}
.cyberV4 .btn {display:inline-flex;align-items:center;justify-content:center;gap:25px;padding:14px 23px;min-height:50px;background:var(--blue);color:white;border:1px solid var(--blue);font-weight:600;font-size:16px;line-height:1.4;text-decoration:none;transition:background .16s}
.cyberV4 .btn:hover {background:#0d31cd}
.cyberV4 .btn.outline {color:var(--navy);background:transparent;border-color:var(--navy)}
.cyberV4 .btn.outline:hover {background:var(--soft)}
.cyberV4 .dark .btn.outline {color:#fff;border-color:#a6acc0}
.cyberV4 .dark .btn.outline:hover {background:#1d264d}
.cyberV4 .text-link {display:inline-flex;align-items:center;gap:14px;min-height:44px;color:var(--blue);font-weight:500}
.cyberV4 .dark .text-link {color:#fff}
.cyberV4 .arrow {display:inline-block;font-family:Arial,sans-serif;transition:transform .16s}
.cyberV4 a:hover .arrow, .cyberV4 button:hover .arrow {transform:translateX(3px)}
.cyberV4 .muted {color:var(--muted)}
.cyberV4 .skip {position:fixed;top:-80px;left:16px;z-index:300;background:#fff;color:var(--navy);padding:12px}
.cyberV4 .skip:focus {top:12px}
.cyberV4 .sr-only {position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
.cyberV4 .header {background:var(--navy);color:white;position:relative;z-index:20;border-bottom:1px solid #ffffff1d}
.cyberV4 .header-row {min-height:76px;display:flex;align-items:center;justify-content:space-between;gap:30px}
.cyberV4 .wordmark {font:400 26px/1.1 var(--ff-display);letter-spacing:.04em;text-decoration:none;white-space:nowrap}
.cyberV4 .wordmark span {color:#fff}
.cyberV4 .wordmark i {display:inline-block;font-style:normal;color:var(--blue);font-size:33px;vertical-align:-2px;margin-right:10px}
.cyberV4 .nav {display:flex;gap:26px;align-items:center}
.cyberV4 .nav a {font-size:14px;text-decoration:none;min-height:44px;display:inline-flex;align-items:center}
.cyberV4 .nav a:hover {text-decoration:underline}
.cyberV4 .nav .nav-contact {border:1px solid #929ab5;padding:0 17px}
.cyberV4 .menu-toggle {display:none;background:transparent;border:1px solid #929ab5;min-height:44px;padding:0 13px;color:#fff}
.cyberV4 .hero {position:relative;overflow:hidden;isolation:isolate;padding:27px 0 0;background:var(--navy)}
.cyberV4 .breadcrumbs {position:relative;z-index:2;color:#d6d9e7;font-size:12px;display:flex;flex-wrap:wrap;gap:9px;margin-bottom:49px}
.cyberV4 .breadcrumbs a {min-height:24px}
.cyberV4 .hero-main {position:relative;z-index:2;max-width:650px;padding:0 0 59px}
.cyberV4 .hero h1 {font:400 clamp(48px,5.6vw,78px)/1.02 var(--ff-display);letter-spacing:0;max-width:640px}
.cyberV4 .hero h1 span {display:block}
.cyberV4 .hero-copy {font-size:18px;line-height:1.65;color:#e5e7f2;max-width:620px;margin-top:25px}
.cyberV4 .hero-actions {display:flex;flex-wrap:wrap;gap:15px 25px;align-items:center;margin-top:29px}
.cyberV4 .hero-actions .text-link {font-size:15px}
.cyberV4 .hero-media {position:absolute;z-index:0;inset:10px 0 72px 52%;pointer-events:none;overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 28%,#000 100%);mask-image:linear-gradient(90deg,transparent 0%,#000 28%,#000 100%)}
.cyberV4 .hero-media video {width:100%;height:100%;object-fit:cover;object-position:center 43%;opacity:.72}
.cyberV4 .hero-media::after {content:"";position:absolute;inset:0;background:linear-gradient(0deg,var(--navy) 0%,transparent 32%,transparent 76%,var(--navy) 100%),linear-gradient(90deg,var(--navy) 0%,transparent 42%)}
.cyberV4 .video-toggle {position:absolute;z-index:5;right:40px;bottom:104px;background:#0a0f2ecf;border:1px solid #d4dbf0;color:#fff;min-height:44px;padding:8px 14px;font-size:14px}
.cyberV4 .situations {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.cyberV4 .situation {padding:23px 23px 19px;border:1px solid var(--line);border-top:3px solid var(--blue);text-decoration:none;display:flex;flex-direction:column;transition:background .16s,border-color .16s}
.cyberV4 .situation h3 {font-size:19px}
.cyberV4 .situation p {font-size:16px;line-height:1.55;color:var(--muted);margin:12px 0 14px}
.cyberV4 .situation .situation-next {display:flex;justify-content:space-between;gap:12px;align-items:center;color:var(--blue);font-size:14px;margin-top:auto;min-height:28px}
.cyberV4 .situation:hover, .cyberV4 .situation:focus-visible {background:var(--soft);border-color:var(--blue)}
.cyberV4 .situation.urgent {border-top-color:var(--red)}
.cyberV4 .support-line {display:flex;align-items:center;justify-content:space-between;gap:25px;padding:22px 25px;margin-top:17px;background:var(--navy);color:#fff}
.cyberV4 .support-line h3 {font-size:19px}
.cyberV4 .support-line p {font-size:15px;margin-top:5px;color:#dce0ee}
.cyberV4 .support-line a {flex-shrink:0;color:#fff}
.cyberV4 .missions {display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}
.cyberV4 .mission {padding-top:23px;border-top:2px solid var(--ink);min-width:0;scroll-margin-top:40px}
.cyberV4 .mission-number {font:400 52px/1 var(--ff-display);color:var(--blue);display:block;margin-bottom:20px}
.cyberV4 .mission h3 {font-size:21px;min-height:2.6em;margin-bottom:14px}
.cyberV4 .mission p {font-size:16px;color:var(--muted);line-height:1.65}
.cyberV4 .mission:last-child {border-color:var(--blue)}
.cyberV4 .mission:target {background:#e8ecff;outline:12px solid #e8ecff}
.cyberV4 .urgency {position:relative}
.cyberV4 .urgency .section-head h2 {max-width:680px}
.cyberV4 .urgency-grid {display:grid;grid-template-columns:1fr 1fr;gap:24px}
.cyberV4 .urgent-card {border:1px solid #81869b;padding:30px;display:flex;flex-direction:column;scroll-margin-top:30px}
.cyberV4 .urgent-card:first-child {border-top:3px solid #fff}
.cyberV4 .urgent-card:last-child {border-top:3px solid var(--blue)}
.cyberV4 .urgent-card .marker {font:400 12px/1.5 var(--ff-mono);letter-spacing:.05em;color:#dce1f4;margin-bottom:16px}
.cyberV4 .urgent-card h3 {font-size:27px;margin-bottom:16px}
.cyberV4 .urgent-card p {color:#e0e3ef;font-size:16px;line-height:1.65;margin-bottom:17px}
.cyberV4 .urgent-card .btn {margin-top:auto;align-self:start}
.cyberV4 .urgent-card:target {outline:3px solid #fff;outline-offset:6px}
.cyberV4 .urgency-foot {font-size:14px;color:#dce1ed;margin-top:20px}
.cyberV4 .urgency-foot a {color:#fff}
.cyberV4 .method-layout {display:grid;grid-template-columns:.8fr 1.2fr;gap:70px}
.cyberV4 .method-lead p {margin-top:24px;color:var(--muted);max-width:360px}
.cyberV4 .method-lead .text-link {margin-top:20px}
.cyberV4 .steps {counter-reset:step;list-style:none;padding:0;margin:0;display:grid;gap:0}
.cyberV4 .steps li {counter-increment:step;display:grid;grid-template-columns:44px 1fr;gap:20px;padding:19px 0;border-top:1px solid var(--line)}
.cyberV4 .steps li::before {content:counter(step,decimal-leading-zero);font:400 14px/1.5 var(--ff-mono);color:var(--blue);padding-top:4px}
.cyberV4 .steps h3 {font-size:20px;margin-bottom:7px}
.cyberV4 .steps p {font-size:16px;color:var(--muted)}
.cyberV4 .cabinet-layout {display:grid;grid-template-columns:1.15fr .85fr;gap:74px;align-items:start}
.cyberV4 .why-items {display:grid;grid-template-columns:1fr 1fr;gap:28px;margin-top:34px}
.cyberV4 .why-item {border-top:2px solid var(--ink);padding-top:18px}
.cyberV4 .why-item h3 {font-size:19px;margin-bottom:12px}
.cyberV4 .why-item p {font-size:16px;line-height:1.6;color:var(--muted)}
.cyberV4 .person {max-width:420px;margin-left:auto}
.cyberV4 .person img {width:100%;aspect-ratio:1.05;object-fit:cover;object-position:center 20%}
.cyberV4 .person figcaption {padding:23px 0 0}
.cyberV4 .person .eyebrow {margin-bottom:9px}
.cyberV4 .person h3 {font-size:26px;margin-bottom:10px}
.cyberV4 .person p {font-size:16px;color:var(--muted);line-height:1.6}
.cyberV4 .person .person-expertise {padding-top:14px;margin-top:14px;border-top:1px solid var(--line);color:var(--ink)}
.cyberV4 .fees-layout {display:grid;grid-template-columns:1fr 1fr;gap:64px}
.cyberV4 .fees-copy p {margin-top:18px;font-size:16px}
.cyberV4 .fees-copy .agreement {border-left:3px solid var(--blue);padding-left:18px;font-weight:500}
.cyberV4 .fee-drivers {background:#fff;padding:28px;border:1px solid var(--line)}
.cyberV4 .fee-drivers h3 {font-size:21px;margin-bottom:14px}
.cyberV4 .fee-drivers ul {padding:0;margin:0;list-style:none}
.cyberV4 .fee-drivers li {padding:13px 0;border-bottom:1px solid var(--line);font-size:16px}
.cyberV4 .fee-drivers li:last-child {border-bottom:0}
.cyberV4 .related-grid {display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:24px}
.cyberV4 .related-card {border-top:2px solid var(--ink);padding-top:22px}
.cyberV4 .related-card h3 {font-size:22px}
.cyberV4 .related-card p {font-size:16px;color:var(--muted);margin:14px 0 17px}
.cyberV4 .related-card:last-child {border-color:var(--blue)}
.cyberV4 .faq-layout {display:grid;grid-template-columns:.65fr 1.35fr;gap:74px}
.cyberV4 .faq-layout h2 {max-width:340px}
.cyberV4 .faq-list details {border-top:1px solid var(--line)}
.cyberV4 .faq-list details:last-child {border-bottom:1px solid var(--line)}
.cyberV4 .faq-list summary {cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:20px;list-style:none;padding:21px 0;font-weight:500;font-size:17px}
.cyberV4 .faq-list summary::-webkit-details-marker {display:none}
.cyberV4 .faq-list summary::after {content:'+';font-size:24px;color:var(--blue);flex-shrink:0}
.cyberV4 .faq-list details[open] summary::after {content:'−'}
.cyberV4 .faq-answer {padding:0 28px 22px 0;font-size:16px;color:var(--muted)}
.cyberV4 .resources-line {margin-top:25px;font-size:14px;color:var(--muted)}
.cyberV4 .resources-line a {color:var(--blue)}
.cyberV4 .contact-grid {display:grid;grid-template-columns:1fr .85fr;gap:80px;align-items:start}
.cyberV4 .contact-copy p {margin-top:23px;color:#e0e4ef;font-size:17px;max-width:610px}
.cyberV4 .contact-panel {border-top:3px solid var(--blue);padding-top:24px}
.cyberV4 .contact-panel label {font-size:15px;display:block;margin-bottom:11px}
.cyberV4 .contact-panel select {width:100%;min-height:49px;padding:10px 12px;color:var(--ink);background:white;border:1px solid #fff;font-size:16px;border-radius:0;margin-bottom:20px}
.cyberV4 .contact-panel .btn {width:100%;justify-content:space-between}
.cyberV4 .contact-phone {margin-top:19px;display:flex;align-items:center;gap:18px;flex-wrap:wrap}
.cyberV4 .contact-phone a {color:white;font-size:20px;min-height:44px;display:flex;align-items:center}
.cyberV4 .contact-phone span {font-size:13px;color:#d5daeb}
.cyberV4 .contact-small {font-size:13px;color:#d5daeb;margin-top:13px}
.cyberV4 .footer {padding:38px 0;background:#080b20;color:#d5daeb;border-top:1px solid #ffffff29}
.cyberV4 .footer-row {display:flex;justify-content:space-between;gap:30px;align-items:start}
.cyberV4 .footer p {font-size:13px;line-height:1.7}
.cyberV4 .footer a {min-height:32px;display:inline-flex;align-items:center}
.cyberV4 .footer .wordmark {color:white;font-size:22px}
.cyberV4 .mobile-actions {display:none}
.cyberV4 .specimen-library {padding:70px 24px;max-width:1100px;margin:auto}
.cyberV4 .specimen-library>h2 {margin-bottom:26px}
.cyberV4 .specimen-detail {margin:30px 0;border-top:1px solid var(--line);padding-top:25px}
.cyberV4 .specimen-detail h3 {font-size:27px;margin-bottom:14px}
.cyberV4 .example-label {font:400 12px/1.5 var(--ff-mono);color:var(--blue);margin-bottom:14px}
.cyberV4 .specimen-detail p {font-size:16px;margin-top:15px}
.cyberV4 .table-scroll {overflow-x:auto;max-width:100%;margin:22px 0}
.cyberV4 .specimen-detail table {border-collapse:collapse;min-width:480px;width:100%;font-size:15px;text-align:left}
.cyberV4 .specimen-detail td, .cyberV4 .specimen-detail th {padding:14px 12px;border:1px solid var(--line);vertical-align:top}
.cyberV4 .specimen-detail th {background:var(--navy);color:#fff;font-weight:500}
.cyberV4 .sample-fields {display:grid;grid-template-columns:1fr 1fr;gap:0}
.cyberV4 .sample-fields div {padding:15px 0;border-bottom:1px solid var(--line)}
.cyberV4 .sample-fields dt {font-size:13px;color:var(--muted);margin-bottom:6px}
.cyberV4 .sample-fields dd {font-size:16px;margin:0;padding-right:14px}
.cyberV4 .specimen-detail ol {padding-left:24px;font-size:16px}
.cyberV4 .specimen-detail li {padding:8px 0}
.cyberV4 .specimen-detail .sample-note {font-size:14px;color:var(--muted)}
.cyberV4 dialog {border:0;padding:0;background:white;color:var(--ink);width:min(800px,calc(100% - 30px));max-width:800px;max-height:calc(100% - 36px);box-shadow:0 24px 100px #0005}
.cyberV4 dialog::backdrop {background:#040819ba}
.cyberV4 dialog .dialog-body {padding:70px 32px 30px}
.cyberV4 dialog .specimen-library {padding:0}
.cyberV4 dialog .specimen-library>h2 {font-size:18px;color:var(--muted);margin-bottom:20px}
.cyberV4 dialog .specimen-detail {margin:0}
.cyberV4 .dialog-close {position:absolute;top:14px;right:14px;min-height:44px;padding:8px 13px;background:#fff;border:1px solid var(--ink);font-size:15px}
.cyberV4 .dialog-close span {margin-left:12px}
.cyberV4 .no-script {padding:15px;background:var(--soft);font-size:14px}
@media(max-width:1100px){
.cyberV4 .wrap {width:calc(100% - 56px)}
.cyberV4 .section {padding-block:64px}
.cyberV4 .hero-main {max-width:59%}
.cyberV4 .hero h1 {font-size:62px}
.cyberV4 .hero-copy {font-size:17px}
.cyberV4 .hero-media {left:51%}
.cyberV4 .missions {grid-template-columns:1fr 1fr;gap:32px}
.cyberV4 .mission h3 {min-height:0}
.cyberV4 .method-layout, .cyberV4 .cabinet-layout, .cyberV4 .faq-layout {gap:40px}
.cyberV4 .why-items {grid-template-columns:1fr;gap:20px}
.cyberV4 .fees-layout {gap:36px}
.cyberV4 .contact-grid {gap:42px}
.cyberV4 .nav {gap:18px}
.cyberV4 .section-head {gap:30px}
}
@media(max-width:850px){
.cyberV4 .wrap {width:calc(100% - 48px)}
.cyberV4 .hero h1 {font-size:55px}
.cyberV4 .hero-main {max-width:70%;padding-bottom:38px}
.cyberV4 .hero-media {left:52%;bottom:140px;opacity:.6}
.cyberV4 .hero-media::after {background:linear-gradient(90deg,var(--navy),transparent 95%),linear-gradient(0deg,var(--navy),transparent 40%)}
.cyberV4 .hero-copy {max-width:520px}
.cyberV4 .video-toggle {right:24px;bottom:170px}
.cyberV4 .situations {grid-template-columns:1fr 1fr}
.cyberV4 .section-head {display:block}
.cyberV4 .section-head>p {margin-top:20px;max-width:630px}
.cyberV4 .urgency-grid {gap:18px}
.cyberV4 .urgent-card {padding:23px}
.cyberV4 .urgent-card h3 {font-size:24px}
.cyberV4 .method-layout {grid-template-columns:1fr;gap:34px}
.cyberV4 .method-lead p {max-width:600px}
.cyberV4 .method-lead .text-link {margin-top:8px}
.cyberV4 .cabinet-layout {grid-template-columns:1fr .9fr;gap:32px}
.cyberV4 .person img {aspect-ratio:.9}
.cyberV4 .fees-layout {grid-template-columns:1fr;gap:30px}
.cyberV4 .related-grid {gap:20px}
.cyberV4 .related-card h3 {font-size:20px}
.cyberV4 .faq-layout {grid-template-columns:1fr;gap:30px}
.cyberV4 .faq-layout h2 {max-width:600px}
.cyberV4 .contact-grid {grid-template-columns:1fr;gap:32px}
.cyberV4 .contact-panel {max-width:640px}
.cyberV4 .support-line {align-items:start;flex-direction:column;gap:10px}
.cyberV4 .nav {display:none}
.cyberV4 .menu-toggle {display:block}
.cyberV4 .nav {position:absolute;top:100%;left:0;right:0;background:var(--navy);padding:15px 24px 22px;flex-direction:column;align-items:stretch;border-bottom:1px solid #fff3;gap:8px}
.cyberV4 .nav.open {display:flex}
.cyberV4 .header-row {min-height:70px}
.cyberV4 .wordmark {font-size:24px}
.cyberV4 .footer-row {flex-wrap:wrap}
}
@media(max-width:639px){
.cyberV4 {scroll-padding-top:24px}
.cyberV4 {font-size:16px;padding-bottom:76px}
.cyberV4 .wrap {width:calc(100% - 40px)}
.cyberV4 .section {padding-block:48px}
.cyberV4 .eyebrow {font-size:12px;margin-bottom:14px}
.cyberV4 .hero {padding-top:18px}
.cyberV4 .breadcrumbs {margin-bottom:34px;font-size:11px;gap:7px}
.cyberV4 .hero-main {max-width:100%;padding-bottom:32px}
.cyberV4 .hero .eyebrow {margin-bottom:18px}
.cyberV4 .hero h1 {font-size:clamp(43px,11vw,58px);max-width:420px}
.cyberV4 .hero-copy {font-size:17px;margin-top:22px;max-width:450px}
.cyberV4 .hero-media {inset:0 0 auto auto;width:100%;height:255px;opacity:.32;-webkit-mask-image:linear-gradient(90deg,transparent 30%,#000 100%);mask-image:linear-gradient(90deg,transparent 30%,#000 100%)}
.cyberV4 .hero-media::after {background:linear-gradient(0deg,var(--navy),transparent 65%)}
.cyberV4 .hero-actions {margin-top:24px;gap:11px}
.cyberV4 .hero-actions>.btn {width:100%;justify-content:space-between;padding:14px 16px;font-size:15px}
.cyberV4 .hero-actions .text-link {font-size:14px}
.cyberV4 .video-toggle {position:relative;bottom:auto;right:auto;margin:0 20px 14px;font-size:13px}
.cyberV4 .header-row {gap:15px}
.cyberV4 .wordmark {font-size:22px;white-space:normal;min-width:0}
.cyberV4 .wordmark i {font-size:26px;margin-right:6px}
.cyberV4 .menu-toggle {flex-shrink:0;font-size:14px}
.cyberV4 .section-head {margin-bottom:28px}
.cyberV4 .section-head>p {font-size:16px;margin-top:17px}
.cyberV4 .situations {grid-template-columns:1fr;gap:13px}
.cyberV4 .situation {padding:20px}
.cyberV4 .situation h3 {font-size:19px}
.cyberV4 .situation p {margin-top:10px;font-size:16px}
.cyberV4 .support-line {padding:22px 20px}
.cyberV4 .missions {grid-template-columns:1fr;gap:28px}
.cyberV4 .mission {display:grid;grid-template-columns:48px 1fr;gap:6px 18px;padding-top:20px}
.cyberV4 .mission-number {font-size:45px;margin:0;grid-row:1/3}
.cyberV4 .mission h3 {font-size:21px;margin:0}
.cyberV4 .mission p {grid-column:2;margin-top:8px;font-size:16px}
.cyberV4 .urgency-grid {grid-template-columns:1fr;gap:20px}
.cyberV4 .urgent-card {padding:24px 21px}
.cyberV4 .urgent-card h3 {font-size:25px}
.cyberV4 .urgent-card .btn {width:100%;padding-inline:14px;gap:14px;font-size:15px}
.cyberV4 .method-layout {gap:25px}
.cyberV4 .steps li {gap:13px;grid-template-columns:32px 1fr}
.cyberV4 .steps h3 {font-size:19px}
.cyberV4 .cabinet-layout {grid-template-columns:1fr;gap:33px}
.cyberV4 .why-items {gap:23px;margin-top:26px}
.cyberV4 .person {margin:0;max-width:420px}
.cyberV4 .person img {aspect-ratio:4/3;object-position:center top}
.cyberV4 .person h3 {font-size:25px}
.cyberV4 .fee-drivers {padding:22px 20px}
.cyberV4 .fee-drivers li {font-size:15px}
.cyberV4 .related-grid {grid-template-columns:1fr;gap:27px}
.cyberV4 .related-card {padding-top:18px}
.cyberV4 .faq-list summary {font-size:16px;padding-block:19px}
.cyberV4 .faq-answer {padding-right:0}
.cyberV4 .contact-grid {gap:29px}
.cyberV4 .contact-copy p {font-size:16px}
.cyberV4 .contact-panel .btn {font-size:15px;padding-inline:16px;gap:14px}
.cyberV4 .footer {padding:30px 0}
.cyberV4 .footer-row {display:grid;gap:20px}
.cyberV4 .mobile-actions {display:flex;position:fixed;z-index:25;bottom:0;left:0;right:0;padding:10px 14px calc(10px + env(safe-area-inset-bottom));gap:10px;background:#0a0f2ef7;border-top:1px solid #ffffff3b}
.cyberV4 .mobile-actions .btn {flex:1;min-height:45px;padding:10px 13px;font-size:14px}
.cyberV4 .mobile-actions .call {width:48px;min-height:45px;border:1px solid #8a92b0;color:#fff;display:flex;align-items:center;justify-content:center;font-size:22px;text-decoration:none}
.cyberV4 .sample-fields {grid-template-columns:1fr}
.cyberV4 dialog .dialog-body {padding:68px 20px 25px}
.cyberV4 .specimen-detail h3 {font-size:24px}
.cyberV4 .table-scroll {margin-inline:-5px}
.cyberV4 .specimen-library {padding:45px 20px}
}
@media(prefers-reduced-motion:reduce){
.cyberV4 {scroll-behavior:auto}
.cyberV4 *, .cyberV4 *::before, .cyberV4 *::after {transition:none!important;animation:none!important}
.cyberV4 a:hover .arrow, .cyberV4 button:hover .arrow {transform:none}
}
@media print{
.cyberV4 .header, .cyberV4 .mobile-actions, .cyberV4 .video-toggle, .cyberV4 .menu-toggle, .cyberV4 .contact-panel select, .cyberV4 .contact-panel label {display:none!important}
.cyberV4 {padding:0}
.cyberV4 .hero-media {display:none}
.cyberV4 .section {padding-block:30px}
.cyberV4 .wrap {width:100%}
.cyberV4 .dark {color:#101323;background:#fff}
.cyberV4 .dark p, .cyberV4 .dark .eyebrow {color:#50536a}
.cyberV4 .hero h1 {font-size:44px}
.cyberV4 .hero-main {max-width:100%}
.cyberV4 .specimen-library {display:block!important}
.cyberV4 dialog {display:none}
.cyberV4 .btn {color:#101323!important;background:transparent!important;border-color:#aaa!important}
.cyberV4 details .faq-answer {display:block}
}
@media(max-width:850px){
.cyberV4 .nav:not(.open) {display:none}
}
@media(max-width:639px){
.cyberV4 .contact-panel, .cyberV4 .contact-copy, .cyberV4 .faq-list, .cyberV4 .fees-copy, .cyberV4 .fee-drivers, .cyberV4 .method-lead, .cyberV4 .related-card {min-width:0}
.cyberV4 .footer a {overflow-wrap:anywhere}
}
.cyberV4 .cabinet-layout {grid-template-columns:.9fr 1.1fr;gap:55px}
.cyberV4 .team-duo {display:grid;grid-template-columns:1fr 1fr;gap:28px;min-width:0}
.cyberV4 .team-duo .person {min-width:0;margin:0;max-width:none}
.cyberV4 .team-duo .person img {aspect-ratio:4/5;object-fit:cover;object-position:center top}
.cyberV4 .team-duo .person h3 {font-size:23px}
.cyberV4 .technical-person {position:relative}
.cyberV4 .technical-person::before {content:"";position:absolute;left:-14px;top:0;bottom:0;border-left:1px solid #b9bdcc}
.cyberV4 .team-duo .person .role-note {font-size:13px;line-height:1.5;margin-top:15px;color:var(--muted)}
@media(max-width:1100px){
.cyberV4 .cabinet-layout {grid-template-columns:1fr;gap:35px}
.cyberV4 .why-items {grid-template-columns:1fr 1fr}
.cyberV4 .team-duo {max-width:850px;gap:32px}
.cyberV4 .team-duo .person h3 {font-size:26px}
.cyberV4 .technical-person::before {left:-16px}
.cyberV4 .team-duo .person img {aspect-ratio:1;object-position:center 15%}
}
@media(max-width:639px){
.cyberV4 .why-items {grid-template-columns:1fr}
.cyberV4 .team-duo {grid-template-columns:1fr;gap:30px;max-width:420px}
.cyberV4 .technical-person {border-top:1px solid #b9bdcc;padding-top:30px}
.cyberV4 .technical-person::before {display:none}
.cyberV4 .team-duo .person img {aspect-ratio:4/5;object-position:center top}
.cyberV4 .team-duo .person h3 {font-size:25px}
}
@media(max-width:639px){
.cyberV4 {scroll-padding-bottom:var(--mobile-action-height,calc(100px + env(safe-area-inset-bottom)))}
.cyberV4 {padding-bottom:var(--mobile-action-height,calc(100px + env(safe-area-inset-bottom)))}
}
.cyberV4 .dialog-toolbar {position:sticky;top:0;z-index:2;display:flex;justify-content:flex-end;background:#fff;padding:12px 14px;border-bottom:1px solid var(--line)}
.cyberV4 .dialog-toolbar .dialog-close {position:static}
.cyberV4 .dialog-body {clear:both}
.cyberV4 dialog .dialog-body {padding-top:25px}
.cyberV4 .hero-media {bottom:0}
.cyberV4 .video-toggle {bottom:24px}
.cyberV4 .support-line>div {min-width:0}
.cyberV4 .support-line .text-link {max-width:100%;line-height:1.45}
@media(max-width:850px){
.cyberV4 .support-line {gap:14px}
.cyberV4 .hero-media {bottom:0}
}
@media(max-width:639px){
.cyberV4 .video-toggle {bottom:auto}
}
.cyberV4 #livrables .wrap {width:min(1320px,calc(100% - 80px));max-width:1320px}
.cyberV4 #livrables .section-head>p {max-width:440px}
.cyberV4 .deliverables-grid {display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}
.cyberV4 .deliverable-card {display:flex;flex-direction:column;min-width:0}
.cyberV4 .deliverable-card>h3 {font-size:21px;line-height:1.3;min-height:2.6em;margin:23px 0 10px;letter-spacing:-.025em}
.cyberV4 .deliverable-benefit {font-size:16px;line-height:1.5;color:var(--muted);min-height:4.5em;margin:0 0 19px}
.cyberV4 .document-preview {order:-1;flex:1;min-width:0;min-height:430px;border:1px solid #c4c8d5;background:white;display:flex;flex-direction:column;transition:border-color .18s,box-shadow .18s}
.cyberV4 .deliverable-card:hover>.document-preview, .cyberV4 .deliverable-card:focus-within>.document-preview {border-color:var(--blue);box-shadow:0 4px 0 var(--blue)}
.cyberV4 .doc-masthead {padding:14px 13px;border-bottom:2px solid var(--navy);display:flex;align-items:center;justify-content:space-between;gap:9px;min-height:58px;flex-wrap:wrap}
.cyberV4 .doc-brand {font:400 21px/1 var(--ff-display);white-space:nowrap;color:var(--ink)}
.cyberV4 .doc-brand b {font-weight:400;color:var(--blue)}
.cyberV4 .doc-masthead>span:last-child {font:400 10px/1.45 var(--ff-mono);color:var(--muted)}
.cyberV4 .doc-content {padding:18px 14px;min-width:0;flex:1;display:flex;flex-direction:column;gap:17px}
.cyberV4 .doc-content h4 {font-size:17px;line-height:1.4;font-weight:600;letter-spacing:-.015em}
.cyberV4 .audit-matrix {font-size:14px;line-height:1.4}
.cyberV4 .audit-matrix>div {display:grid;grid-template-columns:1fr auto;gap:8px;align-items:center;padding:12px 0;border-bottom:1px solid var(--line)}
.cyberV4 .audit-matrix>div:first-child {border-top:1px solid var(--line)}
.cyberV4 .priority {font:400 10px/1.4 var(--ff-mono);text-transform:uppercase;padding:5px 6px;background:#f1f1f3;color:#353848;white-space:nowrap}
.cyberV4 .priority.high {color:white;background:var(--navy)}
.cyberV4 .doc-content .doc-comment {font-size:14px;line-height:1.5;color:var(--muted);margin:0}
.cyberV4 .doc-comment strong {font-size:13px;line-height:1.5;color:var(--ink);font-weight:600;display:block;margin-bottom:5px}
.cyberV4 .doc-decision {font-size:14px;line-height:1.45;color:var(--navy);padding:11px 0 0 11px;border-top:1px solid var(--line);border-left:3px solid var(--blue);margin-top:auto}
.cyberV4 .doc-decision strong {display:block;font-weight:600;margin-bottom:4px}
.cyberV4 .register-excerpt {width:100%;border-collapse:collapse;font-size:13px;line-height:1.4;table-layout:fixed;text-align:left}
.cyberV4 .register-excerpt caption {caption-side:top}
.cyberV4 .register-excerpt th {font-size:11px;font-weight:500;background:var(--off);color:var(--muted)}
.cyberV4 .register-excerpt td, .cyberV4 .register-excerpt th {padding:10px 5px;border-bottom:1px solid var(--line);vertical-align:top;overflow-wrap:break-word;hyphens:auto}
.cyberV4 .register-excerpt th:first-child {width:36%}
.cyberV4 .register-excerpt th:nth-child(2) {width:36%}
.cyberV4 .register-excerpt .row-review {background:#f5f5f7}
.cyberV4 .register-excerpt .row-review td:first-child {border-left:3px solid var(--blue)}
.cyberV4 .clause-redline {display:grid;grid-template-columns:1fr 1fr;font-size:14px;line-height:1.55;border:1px solid var(--line);margin-inline:-1px}
.cyberV4 .clause-redline>div {padding:11px 9px;min-width:0}
.cyberV4 .clause-redline>div>span {display:block;font:400 10px/1.5 var(--ff-mono);text-transform:uppercase;color:var(--muted);margin-bottom:12px}
.cyberV4 .clause-redline p {font-size:14px;line-height:1.55}
.cyberV4 .clause-redline del {color:#65687b;text-decoration-thickness:1px}
.cyberV4 .clause-redline .clause-proposed {border-left:1px solid var(--line);border-top:3px solid var(--blue);padding-top:8px}
.cyberV4 .clause-proposed>span {color:var(--blue)!important}
.cyberV4 .clause-proposed strong {font-weight:500;text-decoration:underline;text-decoration-color:var(--blue);text-underline-offset:3px}
.cyberV4 .incident-start {display:grid;grid-template-columns:25px 1fr;gap:10px;font-size:14px;line-height:1.5;align-items:start}
.cyberV4 .incident-start>span {width:25px;height:27px;background:var(--navy);color:white;display:grid;place-content:center;font:400 12px/1 var(--ff-mono)}
.cyberV4 .incident-start p {font-size:14px;line-height:1.5}
.cyberV4 .incident-question {border:1px solid var(--navy);border-top:3px solid var(--blue);padding:11px 8px;text-align:center;font-size:14px;font-weight:500;line-height:1.45;position:relative}
.cyberV4 .incident-question::before {content:"";height:17px;position:absolute;border-left:1px solid var(--line);left:50%;top:-20px}
.cyberV4 .incident-branches {display:grid;grid-template-columns:1fr 1fr;gap:10px;position:relative;padding-top:3px}
.cyberV4 .incident-branches::before {content:"";position:absolute;top:-9px;left:25%;right:25%;height:11px;border:1px solid var(--line);border-bottom:0}
.cyberV4 .incident-branches>div {background:var(--off);padding:11px 10px;min-width:0}
.cyberV4 .incident-branches b {font-size:13px;font-weight:600;display:block;margin-bottom:5px}
.cyberV4 .incident-branches p {font-size:14px;line-height:1.45}
.cyberV4 .incident-branches .incident-yes {background:var(--navy);color:white}
.cyberV4 .specimen-link {border:1px solid var(--ink);min-height:48px;padding:12px 13px;display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:15px;font-weight:500;text-decoration:none;line-height:1.45}
.cyberV4 .specimen-link>span {font-size:23px;line-height:1;color:var(--blue)}
.cyberV4 .specimen-link:hover {background:var(--navy);color:white}
.cyberV4 .specimen-link:hover>span {color:white}
.cyberV4 .specimen-caption {font-size:13px;line-height:1.5;color:var(--muted);margin-top:25px}
.cyberV4 .documents-extra {margin-top:24px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}
.cyberV4 .documents-extra summary {list-style:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:20px;padding:18px 0;min-height:60px;font-size:16px;font-weight:500;line-height:1.5}
.cyberV4 .documents-extra summary::-webkit-details-marker {display:none}
.cyberV4 .documents-extra summary>span {color:var(--blue);font-size:25px;flex-shrink:0}
.cyberV4 .documents-extra[open] summary>span {transform:rotate(45deg)}
.cyberV4 .documents-extra-body {padding:0 0 23px}
.cyberV4 .documents-extra ul {display:grid;grid-template-columns:1fr 1fr;gap:12px 35px;list-style:none;padding:0;margin:0}
.cyberV4 .documents-extra li {font-size:16px;line-height:1.5;border-left:2px solid var(--blue);padding-left:13px}
.cyberV4 .specimen-preview {margin-top:24px;min-height:0;max-width:650px}
.cyberV4 .specimen-preview .doc-masthead {padding:18px 24px}
.cyberV4 .specimen-preview .doc-content {padding:24px;gap:22px}
.cyberV4 .specimen-preview .doc-content h4 {font-size:23px}
.cyberV4 .specimen-preview .audit-matrix {font-size:17px}
.cyberV4 .specimen-preview .priority {font-size:12px}
.cyberV4 .specimen-preview .doc-comment, .cyberV4 .specimen-preview .doc-decision, .cyberV4 .specimen-preview .incident-start p, .cyberV4 .specimen-preview .incident-question, .cyberV4 .specimen-preview .incident-branches p, .cyberV4 .specimen-preview .clause-redline p {font-size:17px}
.cyberV4 .specimen-preview .register-excerpt {font-size:16px;min-width:0}
.cyberV4 .specimen-preview .register-excerpt th {font-size:14px;background:var(--off);color:var(--ink)}
.cyberV4 .specimen-preview .register-excerpt td, .cyberV4 .specimen-preview .register-excerpt th {padding:12px 9px}
.cyberV4 .specimen-preview .clause-redline>div {padding:18px}
.cyberV4 .specimen-preview .clause-redline>div>span {font-size:12px}
.cyberV4 .specimen-preview .incident-start>span {height:29px}
.cyberV4 .specimen-preview .incident-branches>div {padding:18px}
.cyberV4 .specimen-preview .doc-comment strong {font-size:16px}
.cyberV4 .specimen-notes {margin-top:32px;max-width:650px}
.cyberV4 .specimen-notes h4 {font-size:23px;line-height:1.3;margin-bottom:15px}
.cyberV4 .specimen-fields {margin:22px 0}
.cyberV4 .specimen-fields>div {padding:14px 0;border-top:1px solid var(--line)}
.cyberV4 .specimen-fields dt {font-weight:500;font-size:16px;margin-bottom:5px}
.cyberV4 .specimen-fields dd {margin:0;color:var(--muted);font-size:16px;line-height:1.6}
.cyberV4 .specimen-notes .specimen-source {font-size:14px;color:var(--muted)}
@media(max-width:1279px){
.cyberV4 #livrables .wrap {width:calc(100% - 56px)}
.cyberV4 .deliverables-grid {grid-template-columns:repeat(2,minmax(0,1fr));gap:38px 26px}
.cyberV4 .deliverable-benefit {min-height:3em}
.cyberV4 .document-preview {min-height:410px}
.cyberV4 .doc-content {padding:21px;gap:18px}
.cyberV4 .doc-masthead {padding:15px 20px}
.cyberV4 .audit-matrix {font-size:16px}
.cyberV4 .priority {font-size:11px}
.cyberV4 .register-excerpt {font-size:15px}
.cyberV4 .register-excerpt th {font-size:13px}
.cyberV4 .doc-content .doc-comment, .cyberV4 .doc-decision {font-size:16px}
.cyberV4 .clause-redline p, .cyberV4 .incident-start p, .cyberV4 .incident-question, .cyberV4 .incident-branches p {font-size:16px}
.cyberV4 .clause-redline>div {padding:13px}
.cyberV4 .clause-redline>div>span {font-size:11px}
.cyberV4 .doc-content h4 {font-size:20px}
}
@media(max-width:639px){
.cyberV4 #livrables .wrap {width:calc(100% - 40px)}
.cyberV4 .deliverables-grid {grid-template-columns:1fr;gap:35px}
.cyberV4 .deliverable-card>h3 {font-size:23px;min-height:0;margin:0 0 9px}
.cyberV4 .deliverable-benefit {min-height:0;margin-bottom:19px;font-size:16px}
.cyberV4 .document-preview {order:0;min-height:0;flex:auto}
.cyberV4 .doc-masthead {padding:14px 17px}
.cyberV4 .doc-content {padding:18px 17px;gap:17px}
.cyberV4 .doc-brand {font-size:23px}
.cyberV4 .doc-masthead>span:last-child {font-size:11px}
.cyberV4 .doc-content h4 {font-size:19px}
.cyberV4 .audit-matrix {font-size:15px}
.cyberV4 .priority {font-size:11px}
.cyberV4 .register-excerpt {font-size:14px}
.cyberV4 .register-excerpt th {font-size:12px}
.cyberV4 .clause-redline p {font-size:15px}
.cyberV4 .clause-redline>div {padding:11px 9px}
.cyberV4 .clause-redline>div>span {font-size:11px}
.cyberV4 .doc-content .doc-comment, .cyberV4 .doc-decision {font-size:15px}
.cyberV4 .doc-comment strong {font-size:14px}
.cyberV4 .incident-start p, .cyberV4 .incident-question, .cyberV4 .incident-branches p {font-size:15px}
.cyberV4 .specimen-link {margin-top:15px;font-size:16px}
.cyberV4 .documents-extra ul {grid-template-columns:1fr}
.cyberV4 .documents-extra summary {align-items:start}
.cyberV4 .specimen-caption {font-size:13px}
.cyberV4 .specimen-preview .doc-content {padding:18px 15px}
.cyberV4 .specimen-preview .doc-masthead {padding:15px}
.cyberV4 .specimen-preview .clause-redline {grid-template-columns:1fr}
.cyberV4 .specimen-preview .clause-proposed {border-left:0}
.cyberV4 .specimen-preview .clause-redline>div {padding:15px}
.cyberV4 .specimen-preview .register-excerpt {font-size:14px}
.cyberV4 .specimen-preview .register-excerpt th {font-size:12px}
.cyberV4 .specimen-preview .register-excerpt td, .cyberV4 .specimen-preview .register-excerpt th {padding:11px 5px}
.cyberV4 .specimen-preview .incident-branches>div {padding:13px 10px}
}
@media(max-width:359px){
.cyberV4 .doc-content {padding:16px 13px}
.cyberV4 .doc-masthead {padding:14px 13px}
.cyberV4 .priority {font-size:10px}
.cyberV4 .register-excerpt {font-size:13px}
.cyberV4 .clause-redline {grid-template-columns:1fr}
.cyberV4 .clause-redline .clause-proposed {border-left:0}
.cyberV4 .clause-redline p {font-size:16px}
}
@media(prefers-reduced-motion:reduce){
.cyberV4 .document-preview {transition:none}
}
@media print{
.cyberV4 .deliverables-grid {grid-template-columns:1fr 1fr}
.cyberV4 .deliverable-card {break-inside:avoid}
.cyberV4 .document-preview {box-shadow:none}
.cyberV4 .documents-extra-body {display:block!important}
}
.cyberV4 {
  --navy: #0a0f2e;
  --blue: #1a47ff;
  --off: #f5f5f7;
  --soft: #f5f5f7;
  --measure: 1200px;
}
.cyberV4 { scroll-behavior: auto; }
.cyberV4 { padding-bottom: 0; }
.cyberV4 .wrap { width: min(var(--measure), calc(100% - 80px)); }
.cyberV4 .section { padding-block: 80px; }
.cyberV4 main > section { scroll-margin-top: 32px; }
.cyberV4 .section-head > p { max-width: 440px; }
.cyberV4 .section-head h2 { max-width: 670px; }
.cyberV4 .section h2 + p { margin-top: 22px; }
.cyberV4 .btn { gap: 16px; max-width: 100%; }
.cyberV4 .btn, .cyberV4 .text-link, .cyberV4 .nav a { overflow-wrap: anywhere; }
.cyberV4 .dark .btn.outline:hover { background: #202640; }
.cyberV4 .dark .eyebrow { color: #d8dae5; }
.cyberV4 .nav { gap: 22px; }
.cyberV4 .nav a { font-size: 13px; }
.cyberV4 .header .wordmark span { color: var(--blue); }
.cyberV4 .menu-toggle { flex-shrink: 0; }
.cyberV4 .contact-grid > *, .cyberV4 .method-layout > *, .cyberV4 .faq-layout > *, .cyberV4 .coordination-layout > *, .cyberV4 .duo-layout > *, .cyberV4 .nis-layout > *, .cyberV4 .incident-layout > * { min-width: 0; }
.cyberV4 .cyber-hero { padding-top: 26px; }
.cyberV4 .cyber-hero .breadcrumbs, .cyberV4 .cyber-hero .navbread { margin-bottom: 42px; }
.cyberV4 .cyber-hero .navbread {
  position: relative; z-index: 2; display: flex; flex-wrap: wrap;
  gap: 9px; color: #d6d9e7; font-size: 12px;
}
.cyberV4 .cyber-hero .hero-main { width: 61%; max-width: 650px; padding-bottom: 46px; }
.cyberV4 .cyber-hero h1 { font-size: clamp(52px, 5.7vw, 82px); line-height: 1.01; max-width: 720px; }
.cyberV4 .cyber-hero .hero-copy { max-width: 610px; font-size: 18px; margin-top: 24px; }
.cyberV4 .cyber-hero .hero-actions { gap: 14px 18px; margin-top: 29px; }
.cyberV4 .cyber-hero .hero-actions .btn { font-size: 15px; padding-inline: 20px; }
.cyberV4 .cyber-hero .hero-phone { display: block; margin-top: 19px; font-size: 15px; color: #e4e6ed; }
.cyberV4 .cyber-hero .hero-phone a { display: inline-flex; align-items: center; min-height: 44px; }
.cyberV4 .cyber-hero .hero-note { margin-top: 13px; color: #d8dae5; font-size: 13px; max-width: 540px; }
.cyberV4 .cyber-hero .hero-media {
  inset: 0 0 0 48%; opacity: 1;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 32%);
  mask-image: linear-gradient(90deg, transparent, #000 32%);
}
.cyberV4 .cyber-hero .hero-media img, .cyberV4 .cyber-hero .hero-media video {
  width: 100%; height: 100%; object-fit: cover; object-position: center;
  opacity: .8;
}
.cyberV4 .cyber-hero .hero-media::after {
  background: linear-gradient(90deg, var(--navy), transparent 52%),
    linear-gradient(0deg, var(--navy), transparent 28%, transparent 80%, #0a0f2e70);
}
.cyberV4 .cyber-hero .video-toggle { bottom: 20px; right: 24px; }
.cyberV4 .incident-strip { position: relative; z-index: 2; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px 25px; padding: 19px 0 22px; border-top: 1px solid #72768b; font-size: 15px; }
.cyberV4 .incident-strip > span { display: inline-flex; align-items: center; gap: 11px; }
.cyberV4 .incident-strip > a { display: inline-flex; align-items: center; flex-wrap: wrap; gap: 8px 13px; min-height: 44px; text-decoration: none; }
.cyberV4 .incident-strip > a:hover { text-decoration: underline; }
.cyberV4 .incident-strip strong { font-weight: 500; }
.cyberV4 .incident-dot { width: 8px; height: 8px; border-radius: 50%; background: #fff; flex-shrink: 0; }
.cyberV4 .moments-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
.cyberV4 .moment {
  --moment-bg: #fff; --moment-ink: var(--ink);
  --moment-muted: var(--muted); --moment-line: var(--line); --moment-accent: var(--blue);
  min-width: 0; padding: 28px; display: flex; flex-direction: column;
  background: var(--moment-bg); color: var(--moment-ink); border: 1px solid var(--moment-line);
  transition: background-color .16s, color .16s, border-color .16s;
}
.cyberV4 .moment.is-active, .cyberV4 .moment:focus-within {
  --moment-bg: var(--navy); --moment-ink: #fff;
  --moment-muted: #e0e2eb; --moment-line: #353b58; --moment-accent: #fff;
}
.cyberV4 .moment-number { display: block; font: 400 64px/1 var(--ff-display), sans-serif; color: var(--moment-accent); margin-bottom: 21px; }
.cyberV4 .moment-kicker { font: 400 12px/1.5 var(--ff-mono); letter-spacing: .07em; text-transform: uppercase; color: var(--moment-muted); margin-bottom: 10px; }
.cyberV4 .moment h3 { font-size: 25px; line-height: 1.25; margin-bottom: 17px; }
.cyberV4 .moment > p:not(.moment-kicker):not(.moment-outcome) { color: var(--moment-muted); font-size: 16px; }
.cyberV4 .moment-list { margin: 0 0 23px; padding: 0; list-style: none; color: var(--moment-muted); font-size: 16px; }
.cyberV4 .moment-list li { position: relative; padding: 10px 0 10px 17px; border-bottom: 1px solid var(--moment-line); }
.cyberV4 .moment-list li::before { content: ''; width: 5px; height: 5px; background: var(--moment-accent); position: absolute; left: 0; top: 21px; }
.cyberV4 .moment-outcome { margin-top: auto; border-top: 1px solid var(--moment-line); padding-top: 18px; font-size: 15px; line-height: 1.55; color: var(--moment-ink); }
.cyberV4 .moment-outcome strong { display: block; font-weight: 600; margin-bottom: 5px; }
.cyberV4 .moment .text-link { color: var(--moment-accent); font-size: 15px; margin-top: 14px; }
.cyberV4 .moment:focus-within :focus-visible { outline-color: #fff; }
@supports selector(:has(*)){
@media (hover: hover) and (pointer: fine){
.cyberV4 .moments-grid:has(.moment:hover) .moment.is-active:not(:hover):not(:focus-within) {
      --moment-bg: #fff; --moment-ink: var(--ink);
      --moment-muted: var(--muted); --moment-line: var(--line); --moment-accent: var(--blue);
    }
.cyberV4 .moment:hover {
      --moment-bg: var(--navy); --moment-ink: #fff;
      --moment-muted: #e0e2eb; --moment-line: #353b58; --moment-accent: #fff;
    }
}
.cyberV4 .moments-grid:has(.moment:focus-within) .moment:not(:focus-within) {
    --moment-bg: #fff; --moment-ink: var(--ink);
    --moment-muted: var(--muted); --moment-line: var(--line); --moment-accent: var(--blue);
  }
}
.cyberV4 .coordination-layout { display: grid; grid-template-columns: .78fr 1.22fr; gap: 64px; align-items: center; }
.cyberV4 .coordination-layout > div > p { color: var(--muted); font-size: 17px; margin-top: 22px; }
.cyberV4 .coordination-layout .text-link { margin-top: 20px; }
.cyberV4 .fronts-grid { position: relative; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.cyberV4 .front-card { min-width: 0; padding: 26px 24px 30px; border: 1px solid var(--line); background: #fff; }
.cyberV4 .front-number { font: 400 13px/1.5 var(--ff-mono); color: var(--blue); display: block; margin-bottom: 16px; }
.cyberV4 .front-card h3 { font-size: 21px; margin-bottom: 12px; }
.cyberV4 .front-card p { font-size: 15px; line-height: 1.6; color: var(--muted); }
.cyberV4 .fronts-center {
  position: absolute; inset: 50% auto auto 50%; transform: translate(-50%, -50%);
  min-height: 44px; padding: 11px 17px; background: var(--navy); color: #fff;
  border: 5px solid var(--off); font: 400 11px/1.5 var(--ff-mono); text-transform: uppercase;
  letter-spacing: .08em; pointer-events: none;
}
.cyberV4 .duo-layout { display: grid; grid-template-columns: .77fr 1.23fr; gap: 64px; align-items: start; }
.cyberV4 .duo-layout > div > p { margin-top: 22px; color: var(--muted); }
.cyberV4 .duo-layout .duo-statement { margin-top: 27px; padding-left: 18px; border-left: 3px solid var(--blue); color: var(--ink); font-size: 17px; }
.cyberV4 .duo-layout .text-link { margin-top: 19px; }
.cyberV4 .team-duo { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 26px; max-width: none; }
.cyberV4 .team-duo .person { margin: 0; width: 100%; max-width: none; min-width: 0; }
.cyberV4 .team-duo .person img { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: center top; }
.cyberV4 .team-duo .person figcaption { padding-top: 21px; }
.cyberV4 .team-duo .person .eyebrow { font-size: 11px; margin-bottom: 8px; }
.cyberV4 .team-duo .person h3 { font-size: 23px; margin-bottom: 11px; }
.cyberV4 .team-duo .person p { font-size: 15px; }
.cyberV4 .team-duo .person .role-note { font-size: 13px; margin-top: 13px; }
.cyberV4 .team-duo .technical-person { padding-top: 0; border-top: 0; }
.cyberV4 .team-duo .technical-person::before { display: none; }
.cyberV4 .duo-example { margin-top: 44px; padding: 29px 32px; background: var(--off); border-top: 3px solid var(--navy); }
.cyberV4 .duo-example > h3 { font-size: 22px; margin-bottom: 23px; }
.cyberV4 .duo-example > p { font-size: 16px; color: var(--muted); margin-bottom: 22px; }
.cyberV4 .duo-example-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 32px; }
.cyberV4 .duo-example-grid > * { min-width: 0; }
.cyberV4 .duo-example-grid h4, .cyberV4 .duo-example-grid strong { display: block; font-size: 16px; line-height: 1.5; font-weight: 600; margin-bottom: 8px; }
.cyberV4 .duo-example-grid p { color: var(--muted); font-size: 16px; }
.cyberV4 .duo-example-grid > :last-child { border-left: 1px solid #c9ccd7; padding-left: 32px; }
.cyberV4 .duo-example .duo-example-result { margin: 23px 0 0; padding-top: 19px; border-top: 1px solid #c9ccd7; color: var(--ink); font-size: 16px; }
.cyberV4 .case-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; }
.cyberV4 .case-card { min-width: 0; display: flex; flex-direction: column; padding: 30px; background: #fff; border: 1px solid var(--line); }
.cyberV4 .case-tag { display: block; font: 400 11px/1.5 var(--ff-mono); text-transform: uppercase; letter-spacing: .07em; color: var(--blue); margin-bottom: 14px; }
.cyberV4 .case-card > h3 { font-size: 25px; line-height: 1.25; margin-bottom: 14px; }
.cyberV4 .case-card > p { font-size: 16px; color: var(--muted); }
.cyberV4 .case-card .case-intervention { margin-top: 20px; padding-left: 15px; border-left: 3px solid var(--blue); color: var(--ink); font-size: 16px; }
.cyberV4 .case-intervention strong { font-weight: 600; }
.cyberV4 .mini-document { min-width: 0; background: var(--off); border: 1px solid #d5d7df; margin-top: 25px; padding: 0 19px 19px; }
.cyberV4 .mini-document .docheader, .cyberV4 .mini-document .doc-header { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 7px 15px; margin: 0 -19px 4px; padding: 13px 19px; border-bottom: 2px solid var(--navy); font: 400 11px/1.5 var(--ff-mono); text-transform: uppercase; letter-spacing: .03em; }
.cyberV4 .mini-document .docheader strong, .cyberV4 .mini-document .doc-header strong { font-weight: 500; }
.cyberV4 .mini-document .doc-row { display: grid; grid-template-columns: minmax(0, .75fr) minmax(0, 1.25fr); gap: 16px; align-items: start; padding: 13px 0; border-bottom: 1px solid #d5d7df; font-size: 14px; line-height: 1.5; }
.cyberV4 .mini-document .doc-row > * { min-width: 0; }
.cyberV4 .mini-document .doc-row strong { font-weight: 500; }
.cyberV4 .mini-document .doc-row p, .cyberV4 .mini-document .doc-row span { font-size: 14px; line-height: 1.5; }
.cyberV4 .mini-document .doc-row > :last-child { color: var(--muted); }
.cyberV4 .mini-document .doc-comment { font-size: 13px; line-height: 1.55; color: var(--muted); margin-top: 14px; }
.cyberV4 .mini-document .doc-comment strong { color: var(--ink); }
.cyberV4 .mini-document del { color: #656879; text-decoration-thickness: 1px; }
.cyberV4 .mini-document ins { color: var(--ink); text-decoration-color: var(--blue); text-underline-offset: 3px; }
.cyberV4 .case-more { margin-top: 20px; border-top: 1px solid var(--line); }
.cyberV4 .case-more summary { display: flex; justify-content: space-between; align-items: center; gap: 15px; cursor: pointer; min-height: 48px; padding-block: 13px; color: var(--blue); font-size: 15px; font-weight: 500; list-style: none; }
.cyberV4 .case-more summary::-webkit-details-marker { display: none; }
.cyberV4 .case-more summary::after { content: '+'; font-size: 23px; flex-shrink: 0; }
.cyberV4 .case-more[open] summary::after { content: '−'; }
.cyberV4 .case-more > p, .cyberV4 .case-more > div { font-size: 15px; color: var(--muted); padding-bottom: 6px; }
.cyberV4 .case-more ul { margin: 0; padding-left: 20px; font-size: 15px; color: var(--muted); }
.cyberV4 .sample-caption { margin-top: 22px; font-size: 13px; line-height: 1.6; color: var(--muted); max-width: 900px; }
.cyberV4 .incident-layout { display: grid; grid-template-columns: 1.1fr .9fr; gap: 68px; align-items: start; }
.cyberV4 .incident-layout h2 { max-width: 620px; }
.cyberV4 .incident-layout p { color: #e0e2eb; font-size: 17px; }
.cyberV4 .incident-steps { list-style: none; padding: 0; margin: 27px 0 0; counter-reset: incident; }
.cyberV4 .incident-steps li { counter-increment: incident; display: grid; grid-template-columns: 36px minmax(0, 1fr); gap: 0 14px; padding: 17px 0; border-top: 1px solid #44495f; font-size: 16px; line-height: 1.6; }
.cyberV4 .incident-steps li::before { content: counter(incident, decimal-leading-zero); font: 400 13px/1.5 var(--ff-mono); padding-top: 4px; color: #d8dae5; }
.cyberV4 .incident-steps li::before { grid-column: 1; grid-row: 1 / span 2; }
.cyberV4 .incident-steps li > * { grid-column: 2; }
.cyberV4 .incident-steps h3 { font-size: 18px; margin-bottom: 6px; }
.cyberV4 .incident-steps p { font-size: 16px; }
.cyberV4 .incident-call { border: 1px solid #71768b; border-top: 3px solid #fff; padding: 30px; margin-top: 4px; }
.cyberV4 .incident-call h3 { font-size: 25px; line-height: 1.3; margin-bottom: 18px; }
.cyberV4 .incident-call p { font-size: 16px; }
.cyberV4 .incident-call .btn { width: 100%; margin-top: 24px; justify-content: space-between; }
.cyberV4 .incident-call .text-link { margin-top: 10px; font-size: 15px; }
.cyberV4 .incident-call .incident-note { font-size: 13px; line-height: 1.6; margin-top: 15px; color: #d8dae5; }
.cyberV4 .incident-call .incident-phone { display: inline-flex; align-items: center; min-height: 44px; font-size: 23px; margin-top: 14px; }
.cyberV4 .incident-call .phone-large { display: flex; align-items: center; min-height: 44px; font-size: 26px; margin-top: 16px; font-weight: 500; text-decoration: none; }
.cyberV4 .incident-call .phone-large:hover { text-decoration: underline; }
.cyberV4 #urgence .incident-call { border: 0; padding: 0; margin-top: 7px; }
.cyberV4 #urgence .incident-call .btn { width: auto; min-width: 250px; }
.cyberV4 .method-layout { gap: 64px; }
.cyberV4 .consultation-note { margin-top: 26px; padding: 20px 22px; background: var(--off); border-left: 3px solid var(--blue); font-size: 15px; line-height: 1.6; color: var(--muted); }
.cyberV4 .consultation-note strong { color: var(--ink); font-weight: 600; }
.cyberV4 .nis-layout { display: grid; grid-template-columns: .82fr 1.18fr; gap: 64px; align-items: start; }
.cyberV4 .nis-layout > div > p { margin-top: 22px; color: var(--muted); font-size: 16px; }
.cyberV4 .nis-layout .text-link { margin-top: 19px; }
.cyberV4 .nis-points { display: grid; gap: 22px; }
.cyberV4 .nis-points > * { padding-top: 18px; border-top: 1px solid #bec2ce; }
.cyberV4 .nis-points h3 { font-size: 21px; margin-bottom: 10px; }
.cyberV4 .nis-points p { color: var(--muted); font-size: 16px; }
.cyberV4 .faq-layout { gap: 64px; }
.cyberV4 .contact-grid { gap: 64px; }
.cyberV4 .contact-small { line-height: 1.65; }
.cyberV4 .contact-panel select { max-width: 100%; }
.cyberV4 .mobile-actions { display: none; }
@media (max-width: 1100px){
.cyberV4 .wrap { width: calc(100% - 56px); }
.cyberV4 .section { padding-block: 64px; }
.cyberV4 .cyber-hero .hero-main { width: 66%; }
.cyberV4 .cyber-hero h1 { font-size: clamp(52px, 6.8vw, 74px); }
.cyberV4 .moments-grid { gap: 14px; }
.cyberV4 .moment { padding: 24px 21px; }
.cyberV4 .moment h3 { font-size: 22px; }
.cyberV4 .coordination-layout, .cyberV4 .duo-layout { grid-template-columns: 1fr; gap: 33px; }
.cyberV4 .coordination-layout > div:first-child, .cyberV4 .duo-layout > div:first-child { max-width: 760px; }
.cyberV4 .team-duo { max-width: 820px; gap: 32px; }
.cyberV4 .team-duo .person img { aspect-ratio: 4 / 5; }
.cyberV4 .front-card { padding: 26px; }
.cyberV4 .incident-layout, .cyberV4 .method-layout, .cyberV4 .nis-layout, .cyberV4 .faq-layout, .cyberV4 .contact-grid { gap: 40px; }
.cyberV4 .case-card { padding: 26px; }
}
@media (max-width: 850px){
.cyberV4 .cyber-hero .hero-main { width: 76%; }
.cyberV4 .cyber-hero .hero-media { opacity: .6; left: 49%; }
.cyberV4 .cyber-hero .hero-copy { font-size: 17px; }
.cyberV4 .section-head { display: block; }
.cyberV4 .section-head > p { margin-top: 21px; max-width: 620px; }
.cyberV4 .moments-grid { grid-template-columns: 1fr; gap: 16px; }
.cyberV4 .moment { display: flex; padding: 28px; }
.cyberV4 .moment-number { margin-bottom: 17px; }
.cyberV4 .moment h3 { font-size: 25px; }
.cyberV4 .moment-list { margin-bottom: 20px; }
.cyberV4 .case-grid { gap: 20px; }
.cyberV4 .case-card { padding: 23px; }
.cyberV4 .case-card > h3 { font-size: 23px; }
.cyberV4 .mini-document { padding-inline: 14px; }
.cyberV4 .mini-document .docheader, .cyberV4 .mini-document .doc-header { margin-inline: -14px; padding-inline: 14px; }
.cyberV4 .mini-document .doc-row { grid-template-columns: 1fr; gap: 5px; }
.cyberV4 .incident-layout, .cyberV4 .method-layout, .cyberV4 .nis-layout, .cyberV4 .faq-layout, .cyberV4 .contact-grid { grid-template-columns: 1fr; gap: 33px; }
.cyberV4 .incident-call { max-width: 620px; }
.cyberV4 .method-lead p { max-width: 650px; }
.cyberV4 .faq-layout h2 { max-width: 650px; }
.cyberV4 .menu-toggle { display: none; }
.cyberV4 .menu-toggle { display: inline-flex; align-items: center; }
.cyberV4 .nav { padding: 18px 28px; border-bottom: 1px solid #555a70; }
}
@media (max-width: 650px){
.cyberV4 { scroll-padding-top: 24px; scroll-padding-bottom: 0; }
.cyberV4 .wrap { width: calc(100% - 40px); }
.cyberV4 { padding-bottom: 0; font-size: 16px; }
.cyberV4 .section { padding-block: 44px; }
.cyberV4 .section-head { margin-bottom: 27px; }
.cyberV4 .section h2 { font-size: 30px; line-height: 1.18; }
.cyberV4 .header-row { min-height: 72px; gap: 16px; }
.cyberV4 .wordmark { font-size: 23px; }
.cyberV4 .wordmark i { margin-right: 7px; }
.cyberV4 .menu-toggle { padding-inline: 11px; font-size: 14px; }
.cyberV4 .nav { padding-inline: 20px; }
.cyberV4 .cyber-hero { display: flex; flex-direction: column; padding-top: 21px; }
.cyberV4 .cyber-hero > .wrap { position: relative; z-index: 2; order: 1; }
.cyberV4 .cyber-hero .breadcrumbs, .cyberV4 .cyber-hero .navbread { margin-bottom: 29px; font-size: 11px; }
.cyberV4 .cyber-hero .hero-main { width: 100%; max-width: none; padding-bottom: 32px; }
.cyberV4 .cyber-hero h1 { font-size: clamp(46px, 12.2vw, 68px); line-height: 1.03; }
.cyberV4 .cyber-hero .hero-copy { font-size: 17px; margin-top: 22px; }
.cyberV4 .cyber-hero .hero-actions { align-items: stretch; flex-direction: column; gap: 12px; margin-top: 25px; }
.cyberV4 .cyber-hero .hero-actions .btn { width: 100%; justify-content: space-between; min-height: 52px; font-size: 16px; }
.cyberV4 .cyber-hero .hero-actions .text-link { align-self: flex-start; }
.cyberV4 .cyber-hero .hero-phone { margin-top: 14px; }
.cyberV4 .incident-strip { align-items: flex-start; flex-direction: column; gap: 5px; padding: 18px 0 20px; font-size: 14px; }
.cyberV4 .incident-strip > a { gap: 7px 11px; }
.cyberV4 .cyber-hero > .hero-media {
    position: relative; order: 2; inset: auto; width: 100%; height: auto;
    aspect-ratio: 1.9; opacity: 1; margin-top: -1px;
    -webkit-mask-image: none; mask-image: none;
  }
.cyberV4 .cyber-hero .hero-media img, .cyberV4 .cyber-hero .hero-media video { opacity: .85; object-position: center; }
.cyberV4 .cyber-hero .hero-media::after { background: linear-gradient(180deg, var(--navy), transparent 30%, transparent 75%, #0a0f2e65); }
.cyberV4 .cyber-hero .video-toggle { position: relative; order: 3; right: auto; bottom: auto; align-self: flex-end; margin: -58px 20px 16px; }
.cyberV4 .moments-grid { gap: 15px; }
.cyberV4 .moment { display: flex; padding: 25px 23px; gap: 0; }
.cyberV4 .moment-number { font-size: 64px; margin-bottom: 17px; }
.cyberV4 .moment h3 { font-size: 25px; }
.cyberV4 .moment-list { font-size: 16px; }
.cyberV4 .coordination-layout, .cyberV4 .duo-layout { gap: 28px; }
.cyberV4 .fronts-grid { gap: 14px; }
.cyberV4 .front-card { padding: 21px 19px 25px; }
.cyberV4 .front-card h3 { font-size: 20px; }
.cyberV4 .front-card p { font-size: 15px; }
.cyberV4 .fronts-center { display: none; }
.cyberV4 .team-duo { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; max-width: none; }
.cyberV4 .team-duo .person h3 { font-size: 20px; }
.cyberV4 .team-duo .person p { font-size: 14px; }
.cyberV4 .team-duo .person .eyebrow { font-size: 10px; letter-spacing: .03em; }
.cyberV4 .team-duo .person figcaption { padding-top: 17px; }
.cyberV4 .team-duo .person .role-note { font-size: 12px; }
.cyberV4 .duo-example { margin-top: 30px; padding: 23px; }
.cyberV4 .duo-example-grid { grid-template-columns: 1fr; gap: 20px; }
.cyberV4 .duo-example-grid > :last-child { border-left: 0; padding-left: 0; border-top: 1px solid #c9ccd7; padding-top: 20px; }
.cyberV4 .case-grid { grid-template-columns: 1fr; gap: 22px; }
.cyberV4 .case-card { padding: 25px 22px; }
.cyberV4 .case-card > h3 { font-size: 25px; }
.cyberV4 .mini-document { padding-inline: 16px; }
.cyberV4 .mini-document .docheader, .cyberV4 .mini-document .doc-header { margin-inline: -16px; padding-inline: 16px; }
.cyberV4 .mini-document .doc-row, .cyberV4 .mini-document .doc-row p, .cyberV4 .mini-document .doc-row span { font-size: 15px; }
.cyberV4 .mini-document .doc-comment { font-size: 14px; }
.cyberV4 .case-more summary { font-size: 16px; }
.cyberV4 .incident-layout { gap: 28px; }
.cyberV4 .incident-call { padding: 25px 22px; }
.cyberV4 .incident-call h3 { font-size: 24px; }
.cyberV4 #urgence .incident-call .btn { width: 100%; min-width: 0; }
.cyberV4 .incident-steps li { grid-template-columns: 29px minmax(0, 1fr); gap: 0 11px; }
.cyberV4 .steps li { grid-template-columns: 32px minmax(0, 1fr); gap: 13px; }
.cyberV4 .consultation-note { padding: 19px; }
.cyberV4 .faq-list summary { font-size: 16px; gap: 15px; }
.cyberV4 .faq-answer { padding-right: 0; }
.cyberV4 .mobile-actions {
    display: flex; position: fixed; inset: auto 0 0; z-index: 25; gap: 10px;
    padding: 10px 20px calc(10px + env(safe-area-inset-bottom));
    background: #fff; border-top: 1px solid var(--line); box-shadow: 0 -4px 18px #0a0f2e0d;
  }
.cyberV4 .mobile-actions .btn { flex: 1; min-width: 0; min-height: 46px; font-size: 14px; padding: 11px 13px; gap: 8px; }
.cyberV4 .mobile-actions .call { display: inline-flex; align-items: center; justify-content: center; min-width: 46px; min-height: 46px; width: auto; padding: 10px 12px; color: var(--navy); border: 1px solid var(--navy); text-decoration: none; font-size: 14px; }
.cyberV4 html.has-mobile-actions { scroll-padding-bottom: var(--mobile-action-height, 80px); }
.cyberV4 html.has-mobile-actions body { padding-bottom: var(--mobile-action-height, 80px); }
}
@media (max-width: 440px){
.cyberV4 .fronts-grid { grid-template-columns: 1fr; }
.cyberV4 .front-card { padding: 22px; }
.cyberV4 .front-number { margin-bottom: 10px; }
.cyberV4 .team-duo { grid-template-columns: 1fr; gap: 30px; }
.cyberV4 .team-duo .person { max-width: 360px; }
.cyberV4 .team-duo .person h3 { font-size: 25px; }
.cyberV4 .team-duo .person p { font-size: 16px; }
.cyberV4 .team-duo .person .eyebrow { font-size: 11px; }
.cyberV4 .team-duo .person .role-note { font-size: 13px; }
}
@media (prefers-reduced-motion: reduce){
.cyberV4 { scroll-behavior: auto; }
.cyberV4 *, .cyberV4 *::before, .cyberV4 *::after { animation: none !important; transition: none !important; }
}
@media print{
.cyberV4 .mobile-actions, .cyberV4 .menu-toggle, .cyberV4 .hero-media, .cyberV4 .video-toggle { display: none !important; }
.cyberV4 { padding: 0 !important; }
.cyberV4 .cyber-hero .hero-main { width: 100%; }
.cyberV4 .moment, .cyberV4 .moment.is-active { background: #fff !important; color: #000 !important; --moment-muted: #333; --moment-accent: #000; }
.cyberV4 .moments-grid, .cyberV4 .case-grid, .cyberV4 .team-duo { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.cyberV4 .coordination-layout, .cyberV4 .duo-layout, .cyberV4 .incident-layout, .cyberV4 .nis-layout { grid-template-columns: 1fr; }
.cyberV4 .fronts-center { display: none; }
.cyberV4 .case-card, .cyberV4 .moment, .cyberV4 .person { break-inside: avoid; }
.cyberV4 .case-more > :not(summary) { display: block !important; }
}
.cyberV4 .cyber-documents .section-head h2 {max-width:670px}
.cyberV4 .cyber-doc-grid {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:28px}
.cyberV4 .cyber-document {min-width:0;padding:28px;background:#fff;border:1px solid var(--line);border-top:3px solid var(--navy)}
.cyberV4 .cyber-document:nth-child(2), .cyberV4 .cyber-document:nth-child(5) {border-top-color:var(--blue)}
.cyberV4 .cyber-doc-kicker {display:block;margin-bottom:14px;color:var(--blue);font:400 11px/1.5 var(--ff-mono);text-transform:uppercase;letter-spacing:.07em}
.cyberV4 .cyber-document>header h3 {font-size:25px;line-height:1.2;margin-bottom:13px}
.cyberV4 .cyber-document>header p {font-size:16px;line-height:1.55;color:var(--muted)}
.cyberV4 .cyber-paper {margin-top:24px;border:1px solid #c6c9d3;background:#fff}
.cyberV4 .cyber-paper-head {padding:13px 17px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px 15px;border-bottom:2px solid var(--navy);font:400 11px/1.5 var(--ff-mono);letter-spacing:.02em;color:var(--ink);text-transform:uppercase}
.cyberV4 .cyber-paper .paper-priority {background:var(--navy);color:white;padding:5px 8px}
.cyberV4 .cyber-redline {display:grid;grid-template-columns:.85fr 1.15fr;gap:0}
.cyberV4 .cyber-redline>div {min-width:0;padding:20px 17px;background:var(--off)}
.cyberV4 .cyber-redline>div+div {background:#fff;border-left:3px solid var(--blue)}
.cyberV4 .cyber-paper .paper-label {display:block;margin-bottom:13px;font:400 11px/1.5 var(--ff-mono);color:var(--muted);text-transform:uppercase}
.cyberV4 .cyber-redline>div+div .paper-label {color:var(--blue)}
.cyberV4 .cyber-paper p, .cyberV4 .cyber-paper dd {font-size:15px;line-height:1.6}
.cyberV4 .cyber-paper strong {font-weight:600}
.cyberV4 .cyber-redline del {color:#50536a;text-decoration-thickness:1px}
.cyberV4 .cyber-paper-note {padding:17px;border-top:1px solid var(--line);color:var(--muted)}
.cyberV4 .cyber-paper-note>strong {display:block;margin-bottom:5px;color:var(--ink);font-size:14px}
.cyberV4 .cyber-question {display:grid;grid-template-columns:45px minmax(0,1fr);gap:12px;padding:19px 17px}
.cyberV4 .cyber-question+.cyber-question {border-top:1px solid var(--line)}
.cyberV4 .question-number {font:400 12px/1.5 var(--ff-mono);color:var(--blue);padding-top:2px}
.cyberV4 .cyber-question h4, .cyberV4 .cyber-finding h4, .cyberV4 .cyber-policy h4 {font-size:17px;line-height:1.4;margin-bottom:10px;font-weight:600}
.cyberV4 .cyber-question p {color:var(--muted)}
.cyberV4 .cyber-question strong {color:var(--ink)}
.cyberV4 .cyber-finding {padding:20px 17px;background:var(--navy);color:#fff}
.cyberV4 .cyber-finding p {color:#e0e2eb}
.cyberV4 .cyber-action-list {margin:0;padding:0 17px}
.cyberV4 .cyber-action-list>div {display:grid;grid-template-columns:minmax(0,.7fr) minmax(0,1.3fr);gap:15px;padding:17px 0;border-bottom:1px solid var(--line)}
.cyberV4 .cyber-action-list>div:last-child {border-bottom:0}
.cyberV4 .cyber-action-list dt {font-size:14px;line-height:1.5;font-weight:600}
.cyberV4 .cyber-action-list dd {margin:0;color:var(--muted)}
.cyberV4 .cyber-policy {padding:20px 17px}
.cyberV4 .cyber-policy p+p {margin-top:14px}
.cyberV4 .cyber-targets {display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px;padding:22px 17px 13px}
.cyberV4 .cyber-targets>div+div {padding-left:17px;border-left:1px solid var(--line)}
.cyberV4 .cyber-targets strong {font:400 48px/1 var(--ff-display);color:var(--blue);display:block;margin-bottom:9px}
.cyberV4 .cyber-targets span {display:block;font-size:14px;line-height:1.5}
.cyberV4 .cyber-paper .target-note {padding:0 17px 17px;color:var(--muted);font-size:13px;border-bottom:1px solid var(--line)}
.cyberV4 .cyber-doc-footer {display:flex;justify-content:space-between;align-items:start;gap:20px;margin-top:26px}
.cyberV4 .cyber-doc-footer p {color:var(--muted);font-size:13px;max-width:570px}
.cyberV4 .cyber-doc-footer a {font-size:15px;flex-shrink:0}
@media(max-width:1050px){
.cyberV4 .cyber-document {padding:23px}
.cyberV4 .cyber-redline {grid-template-columns:1fr}
.cyberV4 .cyber-redline>div+div {border-left:3px solid var(--blue);border-top:1px solid var(--line)}
.cyberV4 .cyber-action-list>div {grid-template-columns:1fr;gap:6px}
}
@media(max-width:850px){
.cyberV4 .cyber-doc-grid {grid-template-columns:1fr;gap:24px}
.cyberV4 .cyber-document {padding:28px}
.cyberV4 .cyber-redline {grid-template-columns:.8fr 1.2fr}
.cyberV4 .cyber-action-list>div {grid-template-columns:minmax(0,.7fr) minmax(0,1.3fr);gap:15px}
.cyberV4 .cyber-doc-footer {flex-direction:column;gap:10px}
}
@media(max-width:650px){
.cyberV4 .cyber-document {padding:23px 20px}
.cyberV4 .cyber-document>header h3 {font-size:25px}
.cyberV4 .cyber-redline {grid-template-columns:1fr}
.cyberV4 .cyber-paper-head {font-size:10px;padding:12px 14px}
.cyberV4 .cyber-redline>div, .cyberV4 .cyber-policy, .cyberV4 .cyber-finding {padding:18px 14px}
.cyberV4 .cyber-paper p, .cyberV4 .cyber-paper dd {font-size:16px}
.cyberV4 .cyber-action-list {padding:0 14px}
.cyberV4 .cyber-action-list>div {grid-template-columns:1fr;gap:6px}
.cyberV4 .cyber-question {grid-template-columns:1fr;gap:8px;padding:18px 14px}
.cyberV4 .cyber-doc-footer a {align-self:flex-start}
.cyberV4 .cyber-paper-note {padding:16px 14px}
.cyberV4 .cyber-targets {padding-inline:14px}
}
@media print{
.cyberV4 .cyber-doc-grid {grid-template-columns:1fr}
.cyberV4 .cyber-document {break-inside:avoid}
}
`;
