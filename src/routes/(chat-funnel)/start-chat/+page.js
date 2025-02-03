import { saveCategories, saveSuperCategoriesBatch, savePostData } from "../../../utils/browserStorage";
import { updateStepsCompleted } from '$lib/stores/stepsCompleted.js';

//?chosenCat=66&chosenCat=67&supCatIds=294

/** @type {import('./$types').PageLoad} */
export async function load({ url, data }) {

    let storageKey = 'API_CATEGORIES';

    const setOpenChat = {
        openChat: true
    }

    updateStepsCompleted(setOpenChat);

    savePostData(data.data);

    if (data.requestQuery.supCatIds) {

        Object.values(data.primaryCatData).forEach((item) => {

            if (data.requestQuery.supCatIds.includes(item.id)) {

                saveCategories(item, storageKey + '_' + item.id)
            }
        });
    }

    if (!data.requestQuery.supCatIds) {
        saveCategories(data.primaryCatData, storageKey + '_title');
    }
    
}