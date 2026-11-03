import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/refs": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright/**",
    "playwright-report/**",
    "test-results/**",
    "lib/iblai/sdk/**",
    "public/sw.js",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
