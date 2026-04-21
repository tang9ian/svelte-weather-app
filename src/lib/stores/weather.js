import { get } from 'svelte/store';
import { writable } from 'svelte/store';
import {
	getCurrentWeatherByCity,
	getCurrentWeatherByCoords,
	getForecastByCity,
	getForecastByCoords,
	getAirQuality
} from '$lib/services/weather.js';
import { addRecentSearch } from '$lib/stores/favorites.js';
import { unit } from '$lib/stores/preferences.js';

const initialState = {
	currentWeather: null,
	hourlyForecast: [],
	dailyForecast: [],
	insights: null,
	activeCity: '',
	loading: false,
	error: null
};

function createWeatherStore() {
	const store = writable(initialState);
	const { subscribe, set, update } = store;

	async function loadWeather(task, cityToPersist) {
		update((state) => ({ ...state, loading: true, error: null }));

		try {
			const { currentWeather, forecast, insights } = await task();

			set({
				currentWeather,
				hourlyForecast: forecast.hourly,
				dailyForecast: forecast.daily,
				insights,
				activeCity: currentWeather.city,
				loading: false,
				error: null
			});

			if (cityToPersist) {
				addRecentSearch(cityToPersist);
			}
		} catch (error) {
			update((state) => ({
				...state,
				loading: false,
				error: error.message || 'Failed to load weather data'
			}));
		}
	}

	return {
		subscribe,
		reset: () => set(initialState),
		startLoading: () => update((state) => ({ ...state, loading: true, error: null })),
		loadByCity: async (city) => {
			const selectedUnit = get(unit);
			await loadWeather(async () => {
				const [currentWeather, forecast] = await Promise.all([
					getCurrentWeatherByCity(city, selectedUnit),
					getForecastByCity(city, selectedUnit)
				]);
				const airQuality = await getAirQuality(
					currentWeather.coordinates.lat,
					currentWeather.coordinates.lon
				);

				return {
					currentWeather,
					forecast,
					insights: {
						airQuality,
						rainPeak: forecast.rainPeak,
						pressure: currentWeather.pressure,
						visibility: currentWeather.visibility,
						cloudCover: currentWeather.cloudCover
					}
				};
			}, city);
		},
		loadByCoords: async (lat, lon) => {
			const selectedUnit = get(unit);
			await loadWeather(async () => {
				const [currentWeather, forecast, airQuality] = await Promise.all([
					getCurrentWeatherByCoords(lat, lon, selectedUnit),
					getForecastByCoords(lat, lon, selectedUnit),
					getAirQuality(lat, lon)
				]);

				return {
					currentWeather,
					forecast,
					insights: {
						airQuality,
						rainPeak: forecast.rainPeak,
						pressure: currentWeather.pressure,
						visibility: currentWeather.visibility,
						cloudCover: currentWeather.cloudCover
					}
				};
			});
		},
		refresh: async () => {
			const currentState = get(store);

			if (!currentState.activeCity) return;
			await weather.loadByCity(currentState.activeCity);
		}
	};
}

export const weather = createWeatherStore();
