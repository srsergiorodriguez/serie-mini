import adapter from '@sveltejs/adapter-static';
import serieconfig from './data/serie.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		paths: {
			base: serieconfig.baseurl
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