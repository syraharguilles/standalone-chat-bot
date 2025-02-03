import { CCPM_API_LOCATION } from '$env/static/private';

import { error } from '@sveltejs/kit';
import { api } from '../../utils/api';

const API_URL = {
    consumerLocation: CCPM_API_LOCATION
  };

export const GET = async ({url, setHeaders}) => {

    // let { input } = params;
    let requestQueryString = url.searchParams;
    let urlConsumerLocation = API_URL.consumerLocation;

    let queryString = new URLSearchParams({
        "v": 2,
        "querySuggestion": true
    });

    if (requestQueryString.get('query')) {
        queryString.append('query', requestQueryString.get('query'));
    }

	const response = await api('GET', `${urlConsumerLocation}?${queryString.toString()}`);

    setHeaders({
        'Content-Type': 'application/json'
    });

	if (response.status === 404) {
		return {};
	}

	if (response.status === 200) {
        const data = await response.json();

        return new Response(JSON.stringify(data));
	}

	throw error(response.status);
};