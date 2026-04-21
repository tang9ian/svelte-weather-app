import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { readStorage, writeStorage } from '$lib/utils/storage.js';

const FAVORITES_KEY = 'weather-favorites';
const RECENT_SEARCHES_KEY = 'weather-recent-searches';
const MAX_FAVORITES = 8;
const MAX_RECENT_SEARCHES = 5;

function createArrayStore(key) {
	const store = writable(readStorage(key, []));

	if (browser) {
		store.subscribe((value) => {
			writeStorage(key, value);
		});
	}

	return store;
}

export const favoriteCities = createArrayStore(FAVORITES_KEY);
export const recentSearches = createArrayStore(RECENT_SEARCHES_KEY);

export function addFavoriteCity(city) {
	if (!city) return;

	favoriteCities.update((cities) => {
		const next = [city, ...cities.filter((item) => item !== city)];
		return next.slice(0, MAX_FAVORITES);
	});
}

export function removeFavoriteCity(city) {
	favoriteCities.update((cities) => cities.filter((item) => item !== city));
}

export function addRecentSearch(city) {
	if (!city) return;

	recentSearches.update((cities) => {
		const next = [city, ...cities.filter((item) => item !== city)];
		return next.slice(0, MAX_RECENT_SEARCHES);
	});
}
