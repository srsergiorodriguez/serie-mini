import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import svxToSvelte from './plugins/svxToSvelte';
import { watchAndRun } from 'vite-plugin-watch-and-run'
import path from 'path'

export default defineConfig({
	plugins: [
		sveltekit(),
		watchAndRun([
			{
				name: 'svx-to-svelte',
				run: "node ./plugins/svxToSvelte.js",
				watchKind: ['change'],
        watch: path.resolve('data/content/*.(md|markdown|svx)'),
				delay: 200
			}
		]),
		{
			name: 'svx-to-svelte',
			buildStart: () => {svxToSvelte(false)}
		}
	]
});