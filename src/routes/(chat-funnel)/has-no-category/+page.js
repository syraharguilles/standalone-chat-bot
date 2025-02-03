export const prerender = false;

import { getCategories, getSuperCategoriesBatch } from "../../../utils/browserStorage";

//?chosenCat=66&chosenCat=67&supCatIds=294

/** @type {import('./$types').PageLoad} */
export async function load() {

    const categories = await getCategories('API_CATEGORIES_title');

    return {
        categories: categories
    };
}