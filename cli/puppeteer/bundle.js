import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import istanbul from 'rollup-plugin-istanbul'
import multiEntry from '@rollup/plugin-multi-entry'
import { rollup } from 'rollup'

/**
 * @param {Object} obj
 * @param {boolean} obj.coverage
 * @param {String} obj.input
 */
const kvStorage = '/js/kv-storage.mjs'
export const bundle = async ({ coverage, input }) => {
  const inputOptions = {
    input,
    external: [kvStorage],
    plugins: [
      multiEntry(),
      resolve(),
      commonjs(),
      coverage &&
        istanbul({
          exclude: ['**/*.spec.js', '**/*.test.js'],
        }),
    ].filter(Boolean),
  }
  const outputOptions = {
    format: 'esm',
    paths: {
      [kvStorage]: kvStorage,
    },
  }
  // eslint-disable-next-line no-shadow
  const bundle = await rollup(inputOptions)
  const { output } = await bundle.generate(outputOptions)
  const { code } = output[0]
  return code
}
