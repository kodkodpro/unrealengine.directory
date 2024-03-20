module.exports = {
  root: true,

  parser: "@typescript-eslint/parser",

  plugins: [
    "import",
    "tailwindcss",
    "unused-imports",
    "import-newlines",
    "@typescript-eslint",
  ],

  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:promise/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:@typescript-eslint/recommended",
    "next/core-web-vitals"
  ],

  rules: {
    "quotes": [
      "error",
      "double",
    ],
    "indent": [
      "error",
      2,
    ],
    "react/jsx-indent": [
      "error",
      2,
    ],
    "semi": [
      "error",
      "never",
    ],
    "comma-dangle": [
      "error",
      "always-multiline",
    ],
    "arrow-parens": [
      "error",
      "always",
    ],
    "space-before-function-paren": [
      "error",
      {
        asyncArrow: "always",
        anonymous: "never",
        named: "never",
      },
    ],
    "@typescript-eslint/type-annotation-spacing": [
      "error",
      {
        "before": false,
        "after": true,
        "overrides": {
          "arrow": {
            "before": true,
            "after": true,
          },
        },
      },
    ],
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "never",
      },
    ],
    "import/no-anonymous-default-export": [
      "error",
      {
        allowObject: true,
        allowArray: true,
      },
    ],
    "import-newlines/enforce": [
      "error",
      128,
    ],
    "react/jsx-tag-spacing": [
      "error",
      {
        closingSlash: "never",
        beforeSelfClosing: "always",
        afterOpening: "never",
        beforeClosing: "never",
      },
    ],
    "react/jsx-closing-bracket-location": ["error", "tag-aligned"],
    "react/jsx-curly-newline": "error",
    "react/jsx-curly-spacing": ["error", {
      "when": "never",
      "children": true,
    }],
    "react/jsx-equals-spacing": ["error", "never"],
    "react/jsx-first-prop-new-line": ["error", "multiline"],
    "react/jsx-fragments": ["error", "syntax"],
    "react/jsx-handler-names": "error",
    "react/jsx-max-props-per-line": [
      "error",
      { "maximum": 1 },
    ],
    "react/jsx-no-constructed-context-values": "error",
    "react/jsx-pascal-case": "error",
    "react/jsx-wrap-multilines": ["error", {
      "declaration": "parens-new-line",
      "assignment": "parens-new-line",
      "return": "parens-new-line",
      "arrow": "parens-new-line",
      "condition": "parens-new-line",
      "logical": "parens-new-line",
      "prop": "parens-new-line",
    }],
    "react/no-access-state-in-setstate": "error",
    "react/no-unstable-nested-components": "error",
    "react/self-closing-comp": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
    ],
    "unused-imports/no-unused-imports": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "react/prop-types": "off",
    "react/display-name": "off",
    "react-hooks/exhaustive-deps": "off",
    "promise/always-return": "off",
    "promise/catch-or-return": "off",
    "multiline-ternary": "off",
    "no-empty-function": "off",
    "no-unused-vars": "off",
    "no-console": "warn",
    "no-debugger": "warn",
  },

  settings: {
    react: {
      version: "detect",
    },
  },

  ignorePatterns: [
    ".yarn",
    "node_modules/",
    "android/",
    "ios/",
    "dist/",
    "build/",
    "public/",
    "coverage/",
  ],

  globals: {
    React: true,
    JSX: true,
  },

  env: {
    "browser": true,
    "amd": true,
    "node": true,
  },
}
