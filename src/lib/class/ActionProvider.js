import { browser } from '$app/environment';

import { MESSAGES } from '../../defaults/messages';
import { MESSAGES_CHATBOT_OBJ_TYPE, MESSAGES_CHATCLIENT_OBJ_TYPE } from '../../defaults/messageObjType';

import { getCategories, saveSuperCategoriesBatch } from '../../utils/browserStorage';

import { getSuperCategoriesBatch } from '$lib/categories/api';

import { getGeoLocation } from '$lib/location/api';

import { state, updateState } from '$lib/stores/state';
import { createChatBotMessage, createClientField } from "../../utils/helper";

export function ActionProvider(stateParam) {
    this.primaryCatData = async function () { 
        return await getCategories('API_CATEGORIES_title');
    }

    this.stateMessage = stateParam;

    this.hello = function () {
        const initialMessage = {
            Title: '',
            List: 'Hello from chatbot'
        }

        this.stateMessage.messages = [...this.stateMessage.messages, createChatBotMessage('p', '', initialMessage)];

        updateState(this.stateMessage);

        state.subscribe( (value) => {

            if (browser) {
                window.localStorage.setItem('MESSAGE', value);
            }
        });
    }

    this.getSupCategoryList = async function( chosenId ) {

        const id = await chosenId;

        if (!id) {
            return;
        }

        const self = this;
        const categories = await self.primaryCatData();
        let result = [];

        categories.forEach(item => {
            if (item.id === parseInt(chosenId)) {
                result = item.superCategories;
            }
        });
        
        return result;
    }

    this.renderTextItem = async function(listObj, typeObj) {

        if (!listObj) {
            return;
        }

        if (!typeObj) {
            return;
        }

        const choices = {
            YES: 'YES',
            NO: 'NO'
        }

        let message = {};

        if ( typeObj == MESSAGES_CHATBOT_OBJ_TYPE.IS_GEOLOCATION ) {
            message = {
                Title: [ 
                    ...MESSAGES.POST_GREETING,
                    'Do you need a lawyer in ' + listObj.city_name + ' ' + listObj.region_name + ' ' + listObj.country_name
                ],
                List: choices
            }
        }

        if ( typeObj === MESSAGES_CHATCLIENT_OBJ_TYPE.IS_GEOLOCATION_YES ) {
            message = {
                Title: '',
                List: listObj
            }
        }

        if ( typeObj === MESSAGES_CHATBOT_OBJ_TYPE.CONSUMERLOCATION ) {
            message = {
                Title: 'Where do you need a lawyer?',
                List: listObj
            }
        }

        this.stateMessage.messages = [
            ...this.stateMessage.messages, 
            createChatBotMessage('p', typeObj, message),
            createClientField('', typeObj, '')];

        updateState(this.stateMessage);

        state.subscribe( (value) => {

            if (browser) {
                window.localStorage.setItem('MESSAGE', value);
            }
        });
    }

    this.renderListItem = async function(listObj, typeObj) {

        if (!listObj) {
            return;
        }

        let type = '';

        switch(typeObj) {
        case MESSAGES_CHATBOT_OBJ_TYPE.SUP_CAT_LIST:
            type = 'super category';
            break;
        case MESSAGES_CHATBOT_OBJ_TYPE.CAT_LIST:
            type = 'sub category';
            break;
        default:
        }

        const message = {
            Title: "Select " + type,
            List: listObj
        }
        
        this.stateMessage.messages = [
            ...this.stateMessage.messages, 
            createChatBotMessage('l', typeObj, message)];

        updateState(this.stateMessage);

        state.subscribe( (value) => {

            if (browser) {
                window.localStorage.setItem('MESSAGE', value);
            }
        });
    }

    this.setGetter = async function( parseObj ) { 

        let object = await parseObj;
    
        if (!object) {
            return;
        }

        let self = this;
        let element = '';

        if (object.type === MESSAGES_CHATCLIENT_OBJ_TYPE.AREA_OF_LAW_IDS) {
            const list = await self.getSupCategoryList(parseObj.id);

            element = self.renderListItem(list, MESSAGES_CHATBOT_OBJ_TYPE.SUP_CAT_LIST);
        }

        if (object.type === MESSAGES_CHATCLIENT_OBJ_TYPE.SUP_CAT_IDS) {

            const subCategories = await getSuperCategoriesBatch({
                url: window.location.origin,
                requestQuery: 'supCatIds=' + object.id

            });

            const list = await subCategories[0]['categories'];

            saveSuperCategoriesBatch(list, 'API_CATEGORIES_' + parseObj.id);

            element = self.renderListItem(list, MESSAGES_CHATBOT_OBJ_TYPE.CAT_LIST);
        }

        if (object.type === MESSAGES_CHATCLIENT_OBJ_TYPE.CHOSEN_CAT) {

            const list = await getGeoLocation({
                url: window.location.origin
            });

            element = self.renderTextItem(list, MESSAGES_CHATBOT_OBJ_TYPE.IS_GEOLOCATION);
        }

        if (object.type === MESSAGES_CHATCLIENT_OBJ_TYPE.IS_GEOLOCATION_YES) {
            console.log("YES");
        }

        if (object.type === MESSAGES_CHATCLIENT_OBJ_TYPE.IS_GEOLOCATION_NO) {

            const list = [];

            element = self.renderTextItem(list, MESSAGES_CHATBOT_OBJ_TYPE.CONSUMERLOCATION);
        }

        return element;
    }
}

if (typeof module !== 'undefined') {
    module.exports = {
        ActionProvider
    };
}