import { browser } from '$app/environment';
import { writable } from 'svelte/store';

import { KEY_STEPS_COMPLETED } from '../../utils/browserStorage';

const defaultValue = {};

const initialValue = browser ? window.localStorage.getItem(KEY_STEPS_COMPLETED) ?? JSON.stringify(defaultValue) : JSON.stringify(defaultValue);

export const stepsCompleted = writable(initialValue);

export const updateStepsCompleted = async(obj) => {
    await stepsCompleted.update(currentValue => (
        JSON.stringify({...JSON.parse(currentValue), ...obj})
    ));
};

stepsCompleted.subscribe( (value) => {
    if (browser) {
        window.localStorage.setItem(KEY_STEPS_COMPLETED, value);
    }
});