import adapter from '@sveltejs/adapter-auto';
import preprocessor from 'svelte-preprocess';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocessor({
			scss: {
				prependData: '@use "./src/lib/scss/custom_bootstrap.scss" as *;'
			}
		})
	],
	kit: {
		adapter: adapter(),

		vite: {
			// resolve: {
			// 	alias: {
            //         // these are the aliases and paths to them
			// 		'$scss': path.resolve('./src/assets/scss'),
			// 		'$js': path.resolve('./src/assets/js'),
			// 		'$components': path.resolve('./src/components')
			// 	}
			// },
			css: {
				preprocessorOptions: {
					scss: {
						additionalData: '@use "./src/lib/scss/custom_bootstrap.scss" as *;'
					}
				}
			}
		}
	}
};

export default config;
