import { CCPM_GEOLOCATION } from '$env/static/private';

import { error } from '@sveltejs/kit';
import { api } from '../../utils/api';

const API_URL = {
    geolocation: CCPM_GEOLOCATION || "https://www.legalmatch.com/geoip.php"
  };

export const GET = async ({setHeaders}) => {

    let urlGeoLocation = API_URL.geolocation;

	const response = await api('GET', `${urlGeoLocation}`);

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