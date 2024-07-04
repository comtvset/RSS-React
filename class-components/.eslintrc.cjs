module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react-compiler', 'prettier', '@typescript-eslint'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    '@typescript-eslint/no-explicit-any': 'error',
    'react-compiler/react-compiler': 'error',
    'no-console': 'warn',
    'prettier/prettier': 'error',
  },
};
// module.exports = {
//   root: true,
//   env: { browser: true, es2020: true },
//   extends: [
//     'eslint:recommended',
//     'plugin:react/recommended',
//     'plugin:prettier/recommended',
//     'plugin:@typescript-eslint/recommended'
//   ],
//   ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'build', 'public', 'assets'],
//   parser: '@typescript-eslint/parser',
//   parserOptions: {
//     ecmaVersion: 6,
//     sourceType: 'module',
//     project: ['./tsconfig.json', './tsconfig.node.json'],
//     ecmaFeatures: {
//       jsx: true,
//     },
//   },
//   plugins: ['react', 'react-refresh', 'react-compiler', 'prettier', '@typescript-eslint'],
//   rules: {
//     'eqeqeq': 'error',
//     'no-console': 'off',
//     'no-undef': 'off',
//     'no-unused-vars': 'off',
//     'prettier/prettier': 'error',
//     'react/display-name': "off",
//     'react/no-children-prop': "off",
//     'react-compiler/react-compiler': 'error',
//     'react/react-in-jsx-scope': 'off',
//     'react-refresh/only-export-components': [
//       'warn',
//       { allowConstantExport: true },
//     ],
//     "@typescript-eslint/explicit-module-boundary-types": "off",
//     "@typescript-eslint/explicit-function-return-type": "off",
//     "@typescript-eslint/no-explicit-any": "error",
//     "@typescript-eslint/no-unused-vars": "warn",
//   },
//   "include": ["vite.config.ts", "src//."]
// }
