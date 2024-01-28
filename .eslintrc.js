module.exports = {
    extends: [
      'universe',
      // 'universe/shared/typescript-analysis',
      'plugin:react-hooks/recommended',
    ],
    // overrides: [
    //   {
    //     files: ['*.ts', '*.tsx', '*.d.ts'],
    //     parserOptions: {
    //       project: './tsconfig.json',
    //     },
    //   },
    // ],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        },
      ],
    },
  };
  