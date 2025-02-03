import { browser } from '$app/environment';
import { writable } from 'svelte/store';
 
const defaultValue = {};

const initialValue = browser ? window.localStorage.getItem('STATE') ?? JSON.stringify(defaultValue) : JSON.stringify(defaultValue);

export const state = writable(initialValue);

export const updateState = (obj) => {
    state.update(currentValue => (
        JSON.stringify({...JSON.parse(currentValue), ...obj})
    ));
};