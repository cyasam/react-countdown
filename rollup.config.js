import pkg from './package.json';

import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';

const mainSourceFile = pkg.main.replace('.min', '');

export default [
  {
    input: './src/',
    external: ['react', 'prop-types'],
    output: [
      {
        file: pkg.main,
        format: 'cjs',
      },
    ],
    plugins: [babel({ exclude: 'node_modules/**' }), resolve(), uglify()],
  },
  {
    input: './src/',
    external: ['react', 'prop-types'],
    output: [
      {
        file: mainSourceFile,
        format: 'cjs',
      },
    ],
    plugins: [babel({ exclude: 'node_modules/**' }), resolve()],
  },
];
