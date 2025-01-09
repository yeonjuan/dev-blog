import html from "@html-eslint/eslint-plugin";

export default [
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
      "@html-eslint/indent": "error",
    },
  },
];
