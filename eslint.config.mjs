import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Build three.js vendorisé de l'outil d'export du globe (non suivi par git,
    // code tiers minifié) : exclu du lint pour ne remonter que nos propres erreurs.
    "tools/globe-export/bundle.js",
    // Bibliothèques tierces auto-hébergées et épinglées (CookieConsent…) : exclues du lint.
    "public/vendor/**",
  ]),
]);

export default eslintConfig;
