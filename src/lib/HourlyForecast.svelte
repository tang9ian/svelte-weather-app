<script>
	import { t } from '$lib/i18n.js';
	import { locale, theme } from '$lib/stores/preferences.js';
	import { formatHour, formatTemperature } from '$lib/utils/formatters.js';
	import WeatherGlyph from '$lib/WeatherGlyph.svelte';

	export let items = [];
	export let timezoneOffset = 0;
</script>

<section class="forecast-section" class:dark={$theme === 'dark'}>
	<div class="section-head">
		<div>
			<div class="eyebrow">{$t('weatherBrief')}</div>
			<h3>{$t('nextHours')}</h3>
		</div>
	</div>

	<div class="hourly-list">
		{#each items as item, index}
			<div class="hour-card" style={`--delay:${index * 80}ms`}>
				<div class="hour">{formatHour(item.time, $locale, timezoneOffset)}</div>
				<div class="glyph"><WeatherGlyph code={item.icon} size={42} /></div>
				<div class="temp">{formatTemperature(item.temperature)}</div>
				<div class="pop">{Math.round(item.pop * 100)}%</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.forecast-section {
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(242, 246, 243, 0.8)),
			rgba(255, 255, 255, 0.9);
		border: 1px solid rgba(255, 255, 255, 0.55);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.62),
			0 20px 48px -28px rgba(15, 23, 42, 0.18);
		backdrop-filter: blur(18px);
		border-radius: 2rem;
		padding: 1.4rem;
		color: #111827;
	}

	.forecast-section.dark {
		background:
			linear-gradient(180deg, rgba(28, 36, 40, 0.88), rgba(19, 24, 28, 0.82)),
			rgba(24, 31, 35, 0.82);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.08),
			0 20px 48px -28px rgba(0, 0, 0, 0.5);
		color: #f8fafc;
	}

	.section-head h3 {
		margin: 0;
		font-size: 1.3rem;
		letter-spacing: -0.03em;
	}

	.eyebrow {
		margin-bottom: 0.4rem;
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		opacity: 0.58;
	}

	.hourly-list {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.85rem;
		margin-top: 1.15rem;
	}

	.hour-card {
		display: grid;
		justify-items: start;
		gap: 0.55rem;
		padding: 1rem;
		border-radius: 1.35rem;
		background: rgba(255, 255, 255, 0.42);
		animation: rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: var(--delay);
	}

	.dark .hour-card {
		background: rgba(255, 255, 255, 0.05);
	}

	.hour,
	.pop {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.82rem;
		opacity: 0.66;
	}

	.temp {
		font-size: 1.15rem;
		font-weight: 600;
		letter-spacing: -0.04em;
	}

	@keyframes rise {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (max-width: 900px) {
		.hourly-list {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
</style>
