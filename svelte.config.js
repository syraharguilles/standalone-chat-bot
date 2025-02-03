import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			'$components': 'src/components',
			'$utils': 'src/utils'
		}
	},
	env: {
		dir: process.cwd(),
		publicPrefix: 'PUBLIC_'
	}
};

export default config;
