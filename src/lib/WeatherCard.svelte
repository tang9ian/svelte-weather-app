<script>
	import { t } from '$lib/i18n.js';
	import { locale, theme, unit } from '$lib/stores/preferences.js';
	import {
		formatNumber,
		formatTemperature,
		formatTime,
		getWindSpeedLabel
	} from '$lib/utils/formatters.js';
	import WeatherGlyph from '$lib/WeatherGlyph.svelte';

	export let weather;
	export let isFavorite = false;
	export let onToggleFavorite = () => {};
</script>

<section class="weather-card" class:dark={$theme === 'dark'}>
	<div class="eyebrow">{$t('currentConditions')}</div>

	<div class="hero-row">
		<div class="identity">
			<div class="location-line">
				<h2>{weather.city}</h2>
				<span>{weather.country}</span>
			</div>
			<p>{weather.description}</p>
		</div>

		<button
			class="favorite-button"
			class:active={isFavorite}
			on:click={onToggleFavorite}
			aria-label={isFavorite ? $t('removeFavorite') : $t('addFavorite')}
		>
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<path d="M7 4.5h10a1 1 0 0 1 1 1v14.2l-6-3.7-6 3.7V5.5a1 1 0 0 1 1-1Z" />
			</svg>
			<span>{$t('addFavorite')}</span>
		</button>
	</div>

	<div class="temperature-stage">
		<div class="glyph-shell">
			<WeatherGlyph code={weather.icon} size={92} />
		</div>

		<div class="metric-stack">
			<div class="temperature">
				{formatTemperature(weather.temperature)}{$unit === 'imperial' ? 'F' : 'C'}
			</div>
			<div class="range">
				<span>{formatTemperature(weather.tempMin)}</span>
				<span class="divider"></span>
				<span>{formatTemperature(weather.tempMax)}</span>
			</div>
		</div>
	</div>

	<div class="details">
		<div class="detail-item">
			<span class="label">{$t('feelsLike')}</span>
			<span class="value">{formatTemperature(weather.feelsLike)}{$unit === 'imperial' ? 'F' : 'C'}</span>
		</div>
		<div class="detail-item">
			<span class="label">{$t('humidity')}</span>
			<span class="value">{weather.humidity}%</span>
		</div>
		<div class="detail-item">
			<span class="label">{$t('wind')}</span>
			<span class="value">{formatNumber(weather.windSpeed, 1)} {getWindSpeedLabel($unit)}</span>
		</div>
		<div class="detail-item">
			<span class="label">{$t('pressure')}</span>
			<span class="value">{weather.pressure} hPa</span>
		</div>
	</div>

	<div class="sun-row">
		<div class="sun-item">
			<div class="sun-label">{$t('sunrise')}</div>
			<div class="sun-value">{formatTime(weather.sunrise, $locale, weather.timezoneOffset)}</div>
		</div>
		<div class="sun-item">
			<div class="sun-label">{$t('sunset')}</div>
			<div class="sun-value">{formatTime(weather.sunset, $locale, weather.timezoneOffset)}</div>
		</div>
	</div>
</section>

<style>
	.weather-card {
		background:
			linear-gradient(180deg, rgba(248, 250, 252, 0.9), rgba(237, 242, 239, 0.76)),
			rgba(255, 255, 255, 0.86);
		border: 1px solid rgba(255, 255, 255, 0.55);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.65),
			0 24px 60px -26px rgba(15, 23, 42, 0.22);
		backdrop-filter: blur(18px);
		border-radius: 2rem;
		padding: 1.5rem;
		color: #111827;
	}

	.weather-card.dark {
		background:
			linear-gradient(180deg, rgba(29, 37, 41, 0.88), rgba(19, 24, 28, 0.86)),
			rgba(24, 31, 35, 0.82);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.08),
			0 24px 60px -26px rgba(0, 0, 0, 0.5);
		color: #f8fafc;
	}

	.eyebrow {
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		opacity: 0.58;
		margin-bottom: 1rem;
	}

	.hero-row {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 1.4rem;
	}

	.location-line {
		display: flex;
		align-items: baseline;
		gap: 0.65rem;
		flex-wrap: wrap;
	}

	h2 {
		margin: 0;
		font-size: clamp(2rem, 5vw, 3.75rem);
		line-height: 0.94;
		letter-spacing: -0.06em;
		font-weight: 600;
	}

	.location-line span,
	.identity p {
		margin: 0;
		color: rgba(15, 23, 42, 0.62);
	}

	.weather-card.dark .location-line span,
	.weather-card.dark .identity p {
		color: rgba(248, 250, 252, 0.66);
	}

	.identity p {
		margin-top: 0.5rem;
		text-transform: capitalize;
		font-size: 1rem;
	}

	.favorite-button {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		border: 1px solid rgba(15, 23, 42, 0.08);
		border-radius: 999px;
		padding: 0.7rem 0.95rem;
		background: rgba(255, 255, 255, 0.56);
		color: inherit;
		font: inherit;
		cursor: pointer;
		transform: translateY(0);
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s, border-color 0.3s;
	}

	.favorite-button:active {
		transform: translateY(1px) scale(0.98);
	}

	.favorite-button.active {
		background: rgba(116, 185, 255, 0.24);
		border-color: rgba(9, 132, 227, 0.28);
	}

	.favorite-button svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
	}

	.favorite-button.active svg {
		fill: currentColor;
	}

	.temperature-stage {
		display: grid;
		grid-template-columns: 120px 1fr;
		gap: 1.25rem;
		align-items: center;
		margin-bottom: 1.4rem;
	}

	.glyph-shell {
		width: 120px;
		height: 120px;
		border-radius: 1.75rem;
		background: rgba(255, 255, 255, 0.52);
		display: grid;
		place-items: center;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
	}

	.weather-card.dark .glyph-shell {
		background: rgba(255, 255, 255, 0.05);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	.temperature {
		font-size: clamp(3.2rem, 9vw, 5.6rem);
		line-height: 0.92;
		letter-spacing: -0.08em;
		font-weight: 600;
	}

	.range {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		margin-top: 0.7rem;
		color: rgba(15, 23, 42, 0.62);
		font-size: 0.95rem;
	}

	.weather-card.dark .range {
		color: rgba(248, 250, 252, 0.62);
	}

	.divider {
		width: 2rem;
		height: 1px;
		background: currentColor;
		opacity: 0.45;
	}

	.details {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.85rem;
		padding: 1.1rem 0 1.2rem;
		border-top: 1px solid rgba(15, 23, 42, 0.08);
		border-bottom: 1px solid rgba(15, 23, 42, 0.08);
	}

	.weather-card.dark .details {
		border-color: rgba(255, 255, 255, 0.08);
	}

	.detail-item {
		display: grid;
		gap: 0.2rem;
		padding: 0.85rem 0.9rem;
		background: rgba(255, 255, 255, 0.35);
		border-radius: 1.1rem;
	}

	.weather-card.dark .detail-item {
		background: rgba(255, 255, 255, 0.04);
	}

	.label {
		font-size: 0.78rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		opacity: 0.55;
	}

	.value {
		font-family: 'JetBrains Mono', monospace;
		font-size: 1rem;
	}

	.sun-row {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
		padding-top: 1.1rem;
	}

	.sun-item {
		display: grid;
		gap: 0.25rem;
	}

	.sun-label {
		font-size: 0.78rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		opacity: 0.55;
	}

	.sun-value {
		font-family: 'JetBrains Mono', monospace;
		font-size: 1rem;
	}

	@media (max-width: 760px) {
		.hero-row,
		.temperature-stage,
		.details,
		.sun-row {
			grid-template-columns: 1fr;
		}

		.hero-row,
		.temperature-stage {
			display: grid;
		}

		.favorite-button {
			justify-content: center;
		}

		.glyph-shell {
			width: 100%;
		}
	}
</style>
