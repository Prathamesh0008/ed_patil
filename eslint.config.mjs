import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // This project uses plain text apostrophes/quotes heavily in JSX copy.
      "react/no-unescaped-entities": "off",
      // Existing client logic intentionally hydrates localStorage values in effects.
      "react-hooks/set-state-in-effect": "off",
      // Allow DOM writes in handlers without forcing effect-only mutations.
      "react-hooks/immutability": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
