/**
 * @param {string} method
 * @param {string} resource
 * @param {Record<string, unknown>} [data]
 */
export function api(method, resource, data) {
	
	return fetch(`${resource}`, {
		method,
		mode: 'cors',
		headers: {
			'Accept': 'application/json',
			'content-type': 'application/json',
			'Referer': 'http://dev.legalmatch.com:3000',
		},
		body: data && JSON.stringify({data})
	});
}
