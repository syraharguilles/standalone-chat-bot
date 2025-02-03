import {browser} from '$app/environment';

const KEY_POST_DATA = 'POST_DATA';
export const KEY_CATEGORIES = 'API_CATEGORIES';
export const KEY_STEPS_COMPLETED = 'STEPS_COMPLETED';
export const KEY_MESSAGE = 'MESSAGE';

/**
 *
 * @param {String} storageType
 * @param {String} key
 * @returns {Promise}
 */
export const getFromStorage = async(storageType, key) => new Promise((resolve, reject) => {
    if (browser) {
    
        const storage = storageType == 'session' ? sessionStorage : localStorage;
        const value = storage.getItem(key);
        let json = [];

        if (!value) {
            console.error(`${key} not found in the storage.`);
            reject(`${key} not found in the storage.`);
        }

        /**
         * Throws a SyntaxError exception if the string to parse is not valid JSON.
         * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
         */
        try {
            json = JSON.parse(value);
        } catch (e) {
            console.error(e);
            reject(e);
        }

        resolve(json);
    }
});

/**
 *
 * @param {String} storageType
 * @param {String} key
 * @param {object} data
 * @returns {Promise}
 */
const writeToStorage = async(storageType, key, data) => new Promise((resolve, reject) => {

    if (browser) {
        const storage = storageType == 'session' ? window.sessionStorage : window.localStorage;
        let string = '{}';

        /**
         * Throws a TypeError ("cyclic object value") exception when a circular reference is found.
         * Throws a TypeError ("BigInt value can't be serialized in JSON") when trying to stringify a BigInt value.
         * @link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
         */
        try {
            string = JSON.stringify(data);
        } catch (e) {
            console.error(e);
            reject(e);
        }

        /**
         * setItem() may throw an exception if the storage is full.
         * Particularly, in Mobile Safari (since iOS 5) it always throws when the user enters private mode.
         * (Safari sets the quota to 0 bytes in private mode, unlike other browsers, which allow storage in private mode using separate data containers.)
         * Hence developers should make sure to always catch possible exceptions from setItem().
         * @link https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem
         */
        try {
            storage.setItem(key, string);
        } catch (e) {
            console.error(e);
            reject(e);
        }

        resolve("Data saved!");
    }
});

export const getCategories = async storageKey => getFromStorage('session', storageKey);

export const saveCategories = async(data, storageKey) => writeToStorage('session', storageKey, data);

export const getSuperCategoriesBatch = async storageKey => getFromStorage('session', storageKey);

export const saveSuperCategoriesBatch = async (data, storageKey) => writeToStorage('session', storageKey, data); 

export const getPostData = async() => getFromStorage('local', KEY_POST_DATA);

export const savePostData = async(data) => new Promise((resolve, reject) => {
    writeToStorage('local', KEY_POST_DATA, data)
        .then(result => {
            resolve(result);
        })
        .catch(reason => {
            reject(reason);
        });
});

export const clearPostData = async() => localStorage.removeItem(KEY_POST_DATA);