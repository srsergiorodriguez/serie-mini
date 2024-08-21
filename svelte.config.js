import adapter from '@sveltejs/adapter-static';
import serieconfig from './data/serie.config.js';
import { mdsvex } from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', ...mdsvexConfig.extensions],
	preprocess: [mdsvex(mdsvexConfig)],
	kit: {
		paths: {
			base: serieconfig.baseurl
		},
		alias: {
			$routes: "src/routes",
			$components: "src/lib/components",
			$layouts: "src/lib/layouts",
			$stores: "src/lib/stores",
			$data: "src/routes/data",
			$config: "src/config"
		},
		adapter: adapter({
				pages: "docs",
				precompress: false,
				strict: true,
				hydrate: true,
		})
	}
};

export default config;