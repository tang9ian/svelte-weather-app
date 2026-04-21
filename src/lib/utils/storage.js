import { browser } from '$app/environment';

export function readStorage(key, fallbackValue) {
	if (!browser) return fallbackValue;

	try {
		const raw = localStorage.getItem(key);
		return raw ? JSON.parse(raw) : fallbackValue;
	} catch {
		return fallbackValue;
	}
}

export function writeStorage(key, value) {
	if (!browser) return;

	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Ignore storage quota and serialization errors.
	}
}
