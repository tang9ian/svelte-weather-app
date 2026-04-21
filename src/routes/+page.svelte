<script>
	import { onMount } from 'svelte';
	import { favoriteCities, addFavoriteCity, removeFavoriteCity } from '$lib/stores/favorites.js';
	import { theme } from '$lib/stores/preferences.js';
	import { weather } from '$lib/stores/weather.js';
	import { t } from '$lib/i18n.js';
	import WeatherCard from '$lib/WeatherCard.svelte';
	import SearchBar from '$lib/SearchBar.svelte';
	import LanguageToggle from '$lib/LanguageToggle.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';
	import HourlyForecast from '$lib/HourlyForecast.svelte';
	import DailyForecast from '$lib/DailyForecast.svelte';
	import FavoriteCities from '$lib/FavoriteCities.svelte';
	import UnitToggle from '$lib/UnitToggle.svelte';
	import InsightPanel from '$lib/InsightPanel.svelte';

	function loadDefaultWeather() {
		return weather.loadByCity('Sacramento');
	}

	function getUserLocation() {
		loadDefaultWeather();

		if (!navigator.geolocation) {
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				weather.loadByCoords(position.coords.latitude, position.coords.longitude);
			},
			() => {
				loadDefaultWeather();
			}
		);
	}

	onMount(() => {
		getUserLocation();
	});

	function handleSearch(event) {
		weather.loadByCity(event.detail.city);
	}

	function handleCitySelect(event) {
		weather.loadByCity(event.detail.city);
	}

	function handleUnitChange() {
		if ($weather.activeCity) {
			weather.loadByCity($weather.activeCity);
		}
	}

	function toggleFavorite() {
		const city = $weather.currentWeather?.city;

		if (!city) return;

		if ($favoriteCities.includes(city)) {
			removeFavoriteCity(city);
			return;
		}

		addFavoriteCity(city);
	}
</script>

<svelte:head>
	<title>{$t('title')}</title>
</svelte:head>

<LanguageToggle />
<ThemeToggle />
<UnitToggle on:change={handleUnitChange} />

<main class="app" class:dark={$theme === 'dark'}>
	<div class="ambient ambient-a"></div>
	<div class="ambient ambient-b"></div>

	<div class="shell">
		<section class="intro">
			<div class="brand">{$t('eyebrow')}</div>
			<h1>{$t('heroTitle')}</h1>
			<p>{$t('heroBody')}</p>

			<div class="search-panel">
				<SearchBar on:search={handleSearch} />
			</div>

			<FavoriteCities on:select={handleCitySelect} />
		</section>

		<section class="data-stage">
			{#if $weather.loading}
				<div class="skeleton-grid">
					<div class="skeleton-panel hero-panel"></div>
					<div class="skeleton-panel"></div>
					<div class="skeleton-panel"></div>
				</div>
			{:else if $weather.error}
				<div class="error-panel">
					<div class="error-kicker">{$t('weatherBrief')}</div>
					<h2>{$t('error')}</h2>
					<p>{$t('errorMessage')}</p>
				</div>
			{:else if $weather.currentWeather}
				<div class="weather-layout">
					<WeatherCard
						weather={$weather.currentWeather}
						isFavorite={$favoriteCities.includes($weather.currentWeather.city)}
						onToggleFavorite={toggleFavorite}
					/>
					<HourlyForecast
						items={$weather.hourlyForecast}
						timezoneOffset={$weather.currentWeather.timezoneOffset}
					/>
					<DailyForecast
						items={$weather.dailyForecast}
						timezoneOffset={$weather.currentWeather.timezoneOffset}
					/>
					<InsightPanel insights={$weather.insights} />
				</div>
			{/if}
		</section>
	</div>
</main>

<style>
	:global(html) {
		background: #edf4fb;
	}

	:global(body) {
		margin: 0;
		min-height: 100vh;
		font-family: 'Outfit', 'Segoe UI', sans-serif;
		background: #edf4fb;
		color: #111827;
	}

	:global(button),
	:global(input) {
		font-family: inherit;
	}

	.app {
		position: relative;
		min-height: 100dvh;
		padding: 6rem 1.5rem 3rem;
		background:
			radial-gradient(circle at top left, rgba(116, 185, 255, 0.42), transparent 34%),
			linear-gradient(180deg, #edf4fb 0%, #e3edf9 100%);
		overflow: hidden;
	}

	.app.dark {
		background:
			radial-gradient(circle at top left, rgba(9, 132, 227, 0.2), transparent 34%),
			linear-gradient(180deg, #101721 0%, #0d1219 100%);
	}

	.ambient {
		position: absolute;
		border-radius: 999px;
		filter: blur(18px);
		opacity: 0.55;
		pointer-events: none;
	}

	.ambient-a {
		width: 22rem;
		height: 22rem;
		top: -8rem;
		left: -5rem;
		background: rgba(116, 185, 255, 0.3);
	}

	.ambient-b {
		width: 24rem;
		height: 24rem;
		right: -10rem;
		bottom: -9rem;
		background: rgba(79, 195, 247, 0.14);
	}

	.shell {
		position: relative;
		z-index: 1;
		max-width: 1400px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: minmax(320px, 0.9fr) minmax(0, 1.35fr);
		gap: 1.25rem;
		align-items: start;
	}

	.intro {
		padding: 2rem 1rem 0 0;
	}

	.brand {
		font-size: 0.74rem;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: rgba(15, 23, 42, 0.48);
		margin-bottom: 1rem;
	}

	h1 {
		margin: 0;
		font-size: clamp(3rem, 6vw, 5.8rem);
		line-height: 0.92;
		letter-spacing: -0.08em;
		font-weight: 600;
		max-width: 9ch;
	}

	.intro p {
		margin: 1.2rem 0 2rem;
		max-width: 35rem;
		font-size: 1.05rem;
		line-height: 1.75;
		color: rgba(15, 23, 42, 0.68);
	}

	.app.dark .brand,
	.app.dark .intro p,
	.app.dark h1 {
		color: #f8fafc;
	}

	.app.dark .brand,
	.app.dark .intro p {
		opacity: 0.74;
	}

	.search-panel {
		margin-bottom: 1rem;
	}

	.data-stage {
		padding-top: 4.2rem;
	}

	.weather-layout {
		display: grid;
		grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
		gap: 1rem;
	}

	.weather-layout :global(.weather-card) {
		grid-row: span 2;
	}

	.weather-layout :global(.insight-panel) {
		grid-column: 1 / -1;
	}

	.skeleton-grid {
		display: grid;
		grid-template-columns: minmax(0, 1.12fr) minmax(0, 0.88fr);
		gap: 1rem;
	}

	.skeleton-panel {
		min-height: 18rem;
		border-radius: 2rem;
		background:
			linear-gradient(110deg, rgba(255, 255, 255, 0.2) 8%, rgba(255, 255, 255, 0.5) 18%, rgba(255, 255, 255, 0.2) 33%),
			rgba(255, 255, 255, 0.38);
		background-size: 200% 100%;
		animation: shimmer 1.6s linear infinite;
		border: 1px solid rgba(255, 255, 255, 0.5);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.62),
			0 20px 48px -28px rgba(15, 23, 42, 0.16);
	}

	.hero-panel {
		grid-row: span 2;
		min-height: 37rem;
	}

	.error-panel {
		padding: 2rem;
		border-radius: 2rem;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(242, 246, 243, 0.8)),
			rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.55);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.62),
			0 20px 48px -28px rgba(15, 23, 42, 0.18);
	}

	.error-kicker {
		font-size: 0.74rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		opacity: 0.56;
		margin-bottom: 0.8rem;
	}

	.error-panel h2 {
		margin: 0;
		font-size: 2rem;
		letter-spacing: -0.05em;
	}

	.error-panel p {
		margin: 0.9rem 0 0;
		color: rgba(15, 23, 42, 0.68);
	}

	@keyframes shimmer {
		to {
			background-position: -200% 0;
		}
	}

	@media (max-width: 1080px) {
		.shell,
		.weather-layout,
		.skeleton-grid {
			grid-template-columns: 1fr;
		}

		.intro,
		.data-stage {
			padding: 0;
		}

		h1 {
			max-width: 12ch;
		}
	}

	@media (max-width: 768px) {
		.app {
			padding: 7rem 1rem 2rem;
		}

		h1 {
			font-size: clamp(2.6rem, 11vw, 4rem);
		}
	}
</style>
