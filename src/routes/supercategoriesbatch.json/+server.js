import { CCPM_API_CATEGORIES } from '$env/static/private';

import { error } from '@sveltejs/kit';
import { api } from '../../utils/api';

const API_URL = {
    consumerCategories: CCPM_API_CATEGORIES || "https://api.legalmatch.com/consumer/categories"
  };

export const GET = async ({url, setHeaders}) => {

    let requestQueryString = url.searchParams;
    let urlConsumerCategories = API_URL.consumerCategories;
    const queryString = new URLSearchParams();

    
    urlConsumerCategories += '/super-categories';
   

    if (requestQueryString.get('supCatId')) {
        urlConsumerCategories += `/${requestQueryString}.get('supCatId')`;
    }

    if (requestQueryString.getAll('supCatIds').length > 1) {
        requestQueryString.getAll('supCatIds').forEach(item => {
            queryString.append('supCatIds', item);
        });
    }

    if (requestQueryString.get('supCatIds')) {
        queryString.append('supCatIds', requestQueryString.get('supCatIds'));
    }

	const response = await api('GET', `${urlConsumerCategories}?${queryString.toString()}`);

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