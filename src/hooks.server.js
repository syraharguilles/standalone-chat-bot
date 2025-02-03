/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {

	const response = await resolve(event);

	// if this is the first time the user has visited this app,
	// set a cookie so that we recognise them when they return
	response.headers.set('Access-Control-Allow-Credentials', 'true');
	response.headers.set('Access-Control-Allow-Headers', 'x-requested-with, content-type, origin, authorization, accept, client-security-token');
	response.headers.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	response.headers.set('Access-Control-Allow-Origin', '*');
	response.headers.set('Access-Control-Request-Method', '*');
	response.headers.set('X-Served-By', 'dev.legalmatch.com/no-commit-hash-passed');

	return response;
};
