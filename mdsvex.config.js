import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dirname = path.resolve(fileURLToPath(import.meta.url), '../');

const config = defineConfig({
	extensions: ['.md', '.svx'],
	layout: {
		_: path.join(dirname, '/src/lib/layouts/Default.svelte'),
		home: path.join(dirname, '/src/lib/layouts/Home.svelte'),
		page: path.join(dirname, './src/lib/layouts/Page.svelte')
	}
});

export default config;