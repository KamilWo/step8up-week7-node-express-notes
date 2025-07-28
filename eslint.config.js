const js = require("@eslint/js");
const globals = require("globals");
const prettierConfig = require("eslint-config-prettier");

module.exports = [
  {
    ignores: ["node_modules/", "build/", "coverage/", "dist/", "public/"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.node, // Enables Node.js global variables
        ...globals.jest, // Enables Jest global variables
      },
    },
    ...js.configs.recommended,
    rules: {
      "no-unused-vars": "warn",
    },
  },

  // Prettier configuration must be last to override other formatting rules
  prettierConfig,
];
