import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import mdToSvelte from './plugins/mdToSvelte';
import { watchAndRun } from 'vite-plugin-watch-and-run'
import path from 'path'

export default defineConfig({
	plugins: [
		sveltekit(),
		watchAndRun([
			{
				name: 'md-to-svelte',
				run: "node ./plugins/mdToSvelte.js",
				watchKind: ['change'],
        watch: path.resolve('data/content/*.(md|markdown)'),
				delay: 200
			}
		]),
		{
			name: 'md-to-svelte',
			buildStart: () => {mdToSvelte(false)}
		}
	]
});