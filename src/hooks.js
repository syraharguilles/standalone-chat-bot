/** @type {import('@sveltejs/kit').Handle} */
export const handle = async ({ event, resolve }) => {
    event.cookies.set('ccpmChatVisit', 'true', {
		// send cookie for every page
		path: '/',
		// server side only cookie so you can't use `document.cookie`
		httpOnly: true,
		// only requests from same site can send cookies
		// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
		sameSite: 'strict',
		// only sent over HTTPS in production
		// secure: process.env.NODE_ENV === 'production',
		// set cookie to expire after a month
		maxAge: 60 * 60 * 24 * 30,
	  });

	const response = await resolve(event);

	return response;
};