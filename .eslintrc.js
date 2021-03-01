module.exports = {
  parserOptions: {
    ecmaVersion: 2018,
  },
  sourceType: 'module',
  overrides: [
    {
      files: ["*.html"],
      plugins: ["@html-eslint"],
      parser: "@html-eslint/parser",
      extends: ["plugin:@html-eslint/recommended"],
      rules: {
        "@html-eslint/require-doctype": "error",
        "@html-eslint/no-duplicate-id": "error",
        "@html-eslint/no-inline-styles": "error",
        "@html-eslint/require-li-container": "error",
        "@html-eslint/no-obsolete-tags": "error",
        "@html-eslint/require-lang": "error",
        "@html-eslint/require-title": "error",
        "@html-eslint/no-multiple-h1": "error",
        "@html-eslint/require-img-alt": "error",
        "@html-eslint/no-skip-heading-levels": "error",
        "@html-eslint/indent": ["error", 2],
        "@html-eslint/element-newline": "error",
        "@html-eslint/no-extra-spacing-attrs": "error",
        "@html-eslint/quotes": "error",
        "@html-eslint/id-naming-convention": "error",
        "@html-eslint/require-closing-tags": "error"
      }
    },
  ],
};
