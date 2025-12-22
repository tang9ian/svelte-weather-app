<script>
	import { onMount } from 'svelte';
	import { locale, theme, t } from '$lib/i18n.js';
	import WeatherCard from '$lib/WeatherCard.svelte';
	import SearchBar from '$lib/SearchBar.svelte';
	import LanguageToggle from '$lib/LanguageToggle.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';

	let weather = null;
	let loading = false;
	let error = null;

	const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'your-api-key-here';
	const API_URL = import.meta.env.VITE_WEATHER_API_URL || 'https://api.openweathermap.org/data/2.5/weather';

	async function fetchWeatherByCoords(lat, lon) {
		loading = true;
		error = null;
		
		try {
			const response = await fetch(
				`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
			);
			
			if (!response.ok) {
				throw new Error(`{$t('error')}`);
			}
			
			weather = await response.json();
		} catch (err) {
			error = err.message;
			fetchWeather('Sacramento'); // Fallback to default city
		} finally {
			loading = false;
		}
	}

	async function fetchWeather(city = 'Sacramento') {
		loading = true;
		error = null;
		
		try {
			const response = await fetch(
				`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
			);
			
			if (!response.ok) {
				throw new Error(`{$t('error')}`);
			}
			
			weather = await response.json();
		} catch (err) {
			error = err.message;
		} finally {
			loading = false;
		}
	}

	function getUserLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
				},
				() => {
					fetchWeather(); // Fallback to default city
				}
			);
		} else {
			fetchWeather(); // Fallback to default city
		}
	}

	onMount(() => {
		getUserLocation();
	});

	function handleSearch(event) {
		const city = event.detail.city;
		fetchWeather(city);
	}
</script>

<LanguageToggle />
<ThemeToggle />

<main class="app" class:dark={$theme === 'dark'}>
	<div class="container">
		<h1>{$t('title')}</h1>
		
		<SearchBar on:search={handleSearch} />
		
		{#if loading}
			<div class="loading">
				<div class="spinner"></div>
				<p>{$t('loading')}</p>
			</div>
		{:else if error}
			<div class="error">
				<p>❌ {$t('error')}</p>
				<p>{$t('errorMessage')}</p>
			</div>
		{:else if weather}
			<WeatherCard {weather} />
		{/if}
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		min-height: 100vh;
		transition: all 0.3s ease;
	}

	.app {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px;
		background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
		transition: all 0.3s ease;
	}

	.app.dark {
		background: linear-gradient(135deg, #2d3436 0%, #636e72 100%);
	}

	.container {
		max-width: 500px;
		width: 100%;
	}

	h1 {
		text-align: center;
		color: white;
		font-size: 2.5rem;
		margin-bottom: 2rem;
		text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.loading {
		text-align: center;
		color: white;
		padding: 2rem;
	}

	.spinner {
		width: 40px;
		height: 40px;
		border: 4px solid rgba(255, 255, 255, 0.3);
		border-top: 4px solid white;
		border-radius: 50%;
		animation: spin 1s linear infinite;
		margin: 0 auto 1rem;
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(360deg); }
	}

	.error {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 15px;
		padding: 2rem;
		text-align: center;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
	}

	@media (max-width: 600px) {
		h1 {
			font-size: 2rem;
		}
		
		.container {
			padding: 0 10px;
		}
	}
</style>
