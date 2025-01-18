import html from "@html-eslint/eslint-plugin";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default [
  {
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@stylistic/js/indent": ["error", 2],
    },
  },
  // your own configurations.
  {
    // recommended configuration included in the plugin
    ...html.configs["flat/recommended"],
    files: ["**/*.html"],
  },
  {
    files: ["**/*.js"],
    plugins: {
      "@html-eslint": html,
    },
    rules: {
      "@html-eslint/indent": ["error", 2],
    },
  },
];
