const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'your-api-key-here';
const CURRENT_WEATHER_URL =
	import.meta.env.VITE_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = CURRENT_WEATHER_URL.endsWith('/weather')
	? CURRENT_WEATHER_URL.replace(/\/weather$/, '/forecast')
	: 'https://api.openweathermap.org/data/2.5/forecast';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const AIR_POLLUTION_URL = 'https://api.openweathermap.org/data/2.5/air_pollution';

function buildUrl(baseUrl, params) {
	const url = new URL(baseUrl);

	for (const [key, value] of Object.entries(params)) {
		url.searchParams.set(key, value);
	}

	url.searchParams.set('appid', API_KEY);
	return url.toString();
}

async function fetchWeatherJson(url) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Weather API error: ${response.status}`);
	}

	return response.json();
}

function normalizeCurrentWeather(data, unit) {
	return {
		city: data.name,
		country: data.sys.country,
		coordinates: {
			lat: data.coord.lat,
			lon: data.coord.lon
		},
		temperature: data.main.temp,
		feelsLike: data.main.feels_like,
		tempMin: data.main.temp_min,
		tempMax: data.main.temp_max,
		description: data.weather[0].description,
		icon: data.weather[0].icon,
		humidity: data.main.humidity,
		windSpeed: data.wind.speed,
		pressure: data.main.pressure,
		visibility: data.visibility,
		cloudCover: data.clouds?.all ?? 0,
		sunrise: data.sys.sunrise,
		sunset: data.sys.sunset,
		timezoneOffset: data.timezone,
		unit
	};
}

function normalizeHourlyForecast(data) {
	return data.list.slice(0, 8).map((item) => ({
		time: item.dt,
		temperature: item.main.temp,
		icon: item.weather[0].icon,
		description: item.weather[0].description,
		pop: item.pop ?? 0
	}));
}

function normalizeDailyForecast(data) {
	const groupedByDay = data.list.reduce((acc, item) => {
		const dayKey = new Date((item.dt + data.city.timezone) * 1000).toISOString().slice(0, 10);
		acc[dayKey] = acc[dayKey] || [];
		acc[dayKey].push(item);
		return acc;
	}, {});

	return Object.values(groupedByDay)
		.slice(0, 5)
		.map((items) => {
			const middayItem =
				items.find((item) => item.dt_txt.includes('12:00:00')) ||
				items[Math.floor(items.length / 2)];
			const temperatures = items.map((item) => item.main.temp);

			return {
				date: middayItem.dt,
				min: Math.min(...temperatures),
				max: Math.max(...temperatures),
				icon: middayItem.weather[0].icon,
				description: middayItem.weather[0].description,
				pop: Math.max(...items.map((item) => item.pop ?? 0))
			};
		});
}

function normalizeForecast(data) {
	return {
		hourly: normalizeHourlyForecast(data),
		daily: normalizeDailyForecast(data),
		timezoneOffset: data.city.timezone,
		rainPeak: Math.max(...data.list.slice(0, 8).map((item) => item.pop ?? 0), 0)
	};
}

function normalizeAirQuality(data) {
	const current = data.list?.[0];

	return {
		index: current?.main?.aqi ?? null,
		pm25: current?.components?.pm2_5 ?? null,
		pm10: current?.components?.pm10 ?? null
	};
}

export async function getCurrentWeatherByCity(city, unit = 'metric') {
	const data = await fetchWeatherJson(
		buildUrl(CURRENT_WEATHER_URL, {
			q: city,
			units: unit
		})
	);

	return normalizeCurrentWeather(data, unit);
}

export async function getCurrentWeatherByCoords(lat, lon, unit = 'metric') {
	const data = await fetchWeatherJson(
		buildUrl(CURRENT_WEATHER_URL, {
			lat,
			lon,
			units: unit
		})
	);

	return normalizeCurrentWeather(data, unit);
}

export async function getForecastByCity(city, unit = 'metric') {
	const data = await fetchWeatherJson(
		buildUrl(FORECAST_URL, {
			q: city,
			units: unit
		})
	);

	return normalizeForecast(data);
}

export async function getForecastByCoords(lat, lon, unit = 'metric') {
	const data = await fetchWeatherJson(
		buildUrl(FORECAST_URL, {
			lat,
			lon,
			units: unit
		})
	);

	return normalizeForecast(data);
}

export async function getAirQuality(lat, lon) {
	const data = await fetchWeatherJson(
		buildUrl(AIR_POLLUTION_URL, {
			lat,
			lon
		})
	);

	return normalizeAirQuality(data);
}

function formatGeoSearchResult(item) {
	const parts = [item.name];

	if (item.state) {
		parts.push(item.state);
	}

	if (item.country) {
		parts.push(item.country);
	}

	return {
		label: parts.join(', '),
		query: [item.name, item.state, item.country].filter(Boolean).join(',')
	};
}

export async function searchCities(query, limit = 5) {
	if (!query?.trim()) {
		return [];
	}

	const results = await fetchWeatherJson(
		buildUrl(GEO_URL, {
			q: query.trim(),
			limit
		})
	);

	return results.map(formatGeoSearchResult);
}
