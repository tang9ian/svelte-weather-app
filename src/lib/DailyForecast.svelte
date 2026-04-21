<script>
	import { t } from '$lib/i18n.js';
	import { locale, theme } from '$lib/stores/preferences.js';
	import { formatTemperature, formatWeekday } from '$lib/utils/formatters.js';
	import WeatherGlyph from '$lib/WeatherGlyph.svelte';

	export let items = [];
	export let timezoneOffset = 0;
</script>

<section class="forecast-section" class:dark={$theme === 'dark'}>
	<div class="section-head">
		<div class="eyebrow">{$t('weatherBrief')}</div>
		<h3>{$t('dailyOutlook')}</h3>
	</div>

	<div class="daily-list">
		{#each items as item, index}
			<div class="day-row" style={`--delay:${index * 70}ms`}>
				<div class="left">
					<div class="day">{formatWeekday(item.date, $locale, timezoneOffset)}</div>
					<div class="glyph"><WeatherGlyph code={item.icon} size={36} /></div>
					<div class="desc">{item.description}</div>
				</div>
				<div class="right">
					<div class="rain">{Math.round(item.pop * 100)}%</div>
					<div class="temps">{formatTemperature(item.min)} <span></span> {formatTemperature(item.max)}</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<style>
	.forecast-section {
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(242, 246, 243, 0.84)),
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

	.eyebrow {
		margin-bottom: 0.4rem;
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		opacity: 0.58;
	}

	.section-head h3 {
		margin: 0;
		font-size: 1.3rem;
		letter-spacing: -0.03em;
	}

	.daily-list {
		display: grid;
		gap: 0.75rem;
		margin-top: 1.15rem;
	}

	.day-row {
		display: grid;
		grid-template-columns: 1.4fr auto;
		align-items: center;
		gap: 1rem;
		padding: 1rem, 1.05rem;
		min-width: 0;
		border-radius: 1.3rem;
		background: rgba(255, 255, 255, 0.42);
		animation: rise 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: var(--delay);
		box-sizing: border-box;
	}

	.dark .day-row {
		background: rgba(255, 255, 255, 0.05);
	}

	.left,
	.right {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		min-width: 0;
	}

	.day {
		min-width: 3.3rem;
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.82rem;
		opacity: 0.7;
		text-transform: uppercase;
	}

	.desc {
		text-transform: capitalize;
		min-width: 0;
		flex: 1;
		overflow-wrap: anywhere;
	}

	.right {
		justify-content: flex-end;
		flex-wrap: wrap;
	}

	.rain {
		font-family: 'JetBrains Mono', monospace;
		font-size: 0.82rem;
		opacity: 0.7;
	}

	.temps {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		font-weight: 600;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	.temps span {
		width: 1.6rem;
		height: 1px;
		background: currentColor;
		opacity: 0.3;
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
		.day-row {
			grid-template-columns: 1fr;
		}

		.left,
		.right {
			justify-content: space-between;
			flex-wrap: wrap;
		}
	}
</style>
