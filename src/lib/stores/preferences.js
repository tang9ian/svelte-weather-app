import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { readStorage, writeStorage } from '$lib/utils/storage.js';

function createPersistentStore(key, initialValue) {
	const store = writable(readStorage(key, initialValue));

	if (browser) {
		store.subscribe((value) => {
			writeStorage(key, value);
		});
	}

	return store;
}

export const locale = createPersistentStore('weather-locale', 'en');
export const theme = createPersistentStore('weather-theme', 'light');
export const unit = createPersistentStore('weather-unit', 'metric');
