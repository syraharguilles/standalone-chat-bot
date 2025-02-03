import { json } from '@sveltejs/kit';

import { getCategories, getTitleCategories } from '$lib/categories/api';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies, url }) {

    let result = {};
    let postData = {};
    let chosenLabels = {};

    const requestQuery = url.searchParams;
    const cookieCcpmChatVisit = cookies.get('ccpmChatVisit') ? {ccpmChatVisit: cookies.get('ccpmChatVisit')} : {};

    if (requestQuery.get('openChat') && (requestQuery.get('supCatIds') || requestQuery.get('chosenCat'))) {

        let requestQueryObj = {};
        for (const key of requestQuery.keys()) {
            if (key == 'supCatIds' || key == 'chosenCat') {
                if (requestQuery.getAll(key).length > 1) {
                    const arrOfNum = requestQuery.getAll(key).map(str => {
                        return Number(str);
                    });
                    requestQueryObj[key] = arrOfNum
                } 
                else {
                    requestQueryObj[key] = [Number(requestQuery.get(key))]
                }
            }
        }

        postData = requestQueryObj;

        // result.data = getInitialCaseData();
        const categories = await getCategories({
            url: url.origin,
            requestQuery: requestQuery.toString()
        });

        for (const [first_level_key, first_level_value] of Object.entries(categories)) {

            let intValue = parseInt(first_level_value.id);

            const chosenCat = postData.chosenCat;

            if ((postData.chosenCat).includes(intValue)) {
                chosenLabels[intValue] = first_level_value.description;
            } else if (first_level_value.categories) {
                const found = first_level_value.categories
                  .filter(item => (postData.chosenCat).includes(parseInt(item.id)))
                  .pop();
                if (found) {
                  chosenLabels[parseInt(found.id)] = found.description;
                }
            }
        }

        Object.assign(postData, {chosenLabels: chosenLabels});

        result = {
            cookies: cookieCcpmChatVisit,
            requestQuery: requestQueryObj,
            data: postData,
            error: false,
            primaryCatData: categories,
            supCatData: [],
        };
    }

    if (!requestQuery.get('openChat') || (!requestQuery.get('supCatIds') && !requestQuery.get('chosenCat'))) {

        const categories = await getTitleCategories({
            url: url.origin,
            title: true
        });

        // result.data = getInitialCaseData();
        result = {
        cookies: cookieCcpmChatVisit,
        requestQuery: {},
        data: {},
        error: false,
        primaryCatData: categories,
        };

        
    }

    return result;
}