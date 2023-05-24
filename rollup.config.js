import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import preprocess from "svelte-preprocess";
import json from '@rollup/plugin-json';
import postcss from 'rollup-plugin-postcss'

export default {
	input: 'src/embed.js',
	output: {
		format: 'iife',
		file: 'dist/pianolatron.js',
    sourcemap: false,
	},
	plugins: [
		json(),
		commonjs(),
		svelte({
			emitCss: false,
			preprocess: [
				preprocess.scss({
					prependData: `@use "sass:math";@use 'src/styles/sass-globals.scss' as *;`,
				}),
			],
		}),
		postcss({
    		plugins: [],
		}),
		resolve({ browser: true, dedupe: ['svelte'] }),
	],
}
