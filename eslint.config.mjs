//Run eslint: npx eslint .

import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";


/** @type {import('eslint').Linter.Config[]} */

export default [
  {
    ignores: [
      ".next/*",
      "_components/shared/analyticsGA4.js",
      "_components/shared/analyticsGTM.js",
      "next.config.js",
    ],
  },
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        process: "readonly",
        Intl: "readonly",
        module: "readonly",
        require: "readonly",
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: pluginReact,
    "react-hooks": pluginReactHooks, // ✅ dodaj
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
    // ✅ dodaj ova dva
    "react-hooks/rules-of-hooks": "error", // Catchuje hook pozive u if, return itd.
    "react-hooks/exhaustive-deps": "warn", // Prati deps u useEffect itd.
    },
  },
];
