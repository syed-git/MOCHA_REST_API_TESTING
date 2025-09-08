// eslint.config.js
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    // Apply to all TypeScript files
    files: ["**/*.ts"],

    // Use the TypeScript parser
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
      },
    },

    // Plugins
    plugins: {
      "@typescript-eslint": tsPlugin,
    },

    // Basic rules
    rules: {
      "semi": ["error", "always"],                     // require semicolons
      "quotes": ["error", "single"],                  // enforce double quotes
      "no-console": "warn",                            // warn on console.log
      "@typescript-eslint/no-unused-vars": ["error"],  // warn on unused vars
      "@typescript-eslint/explicit-function-return-type": "off", // optional
    },
  },

  // Optional: looser rules for test files
  {
    files: ["tests/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // allow 'any' in tests
    },
  },
];
