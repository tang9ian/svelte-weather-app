<script>
	import { t } from '$lib/i18n.js';
	import { theme } from '$lib/stores/preferences.js';
	import { formatNumber } from '$lib/utils/formatters.js';

	export let insights;

	const aqiMap = {
		1: { label: 'stableAir', tone: 'low' },
		2: { label: 'moderateAir', tone: 'mid' },
		3: { label: 'sensitiveAir', tone: 'alert' },
		4: { label: 'poorAir', tone: 'high' },
		5: { label: 'severeAir', tone: 'high' }
	};

	$: airMeta = aqiMap[insights?.airQuality?.index] || aqiMap[2];
	$: visibilityKm = insights?.visibility ? insights.visibility / 1000 : 0;
</script>

<section class="insight-panel" class:dark={$theme === 'dark'}>
	<div class="section-head">
		<div class="eyebrow">{$t('atmosphereDesk')}</div>
		<h3>{$t('weatherBrief')}</h3>
	</div>

	<div class="signal-grid">
		<article class="signal signal-wide">
			<div class="signal-label">{$t('airQuality')}</div>
			<div class="signal-value">{insights.airQuality?.index ?? '--'} / 5</div>
			<div class="meter">
				<div class="meter-fill" style={`width:${((insights.airQuality?.index ?? 0) / 5) * 100}%`}></div>
			</div>
			<p>{$t(airMeta.label)}</p>
		</article>

		<article class="signal">
			<div class="signal-label">{$t('visibility')}</div>
			<div class="signal-value">{formatNumber(visibilityKm, 1)} km</div>
			<p>{$t('visibilityHint')}</p>
		</article>

		<article class="signal">
			<div class="signal-label">{$t('cloudCover')}</div>
			<div class="signal-value">{insights.cloudCover}%</div>
			<p>{$t('currentConditions')}</p>
		</article>
	</div>

	<div class="micro-grid">
		<article class="micro-card">
			<div class="micro-label">{$t('rainWindow')}</div>
			<div class="micro-value">{Math.round(insights.rainPeak * 100)}%</div>
			<p>{$t('nextHoursRain')}</p>
		</article>

		<article class="micro-card">
			<div class="micro-label">{$t('pressureSignal')}</div>
			<div class="micro-value">{insights.pressure} hPa</div>
			<p>{$t('pressureHint')}</p>
		</article>
	</div>
</section>

<style>
	.insight-panel {
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

	.insight-panel.dark {
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

	h3 {
		margin: 0;
		font-size: 1.3rem;
		letter-spacing: -0.03em;
	}

	.signal-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.8rem;
		margin-top: 1.15rem;
	}

	.signal,
	.micro-card {
		border-radius: 1.35rem;
		background: rgba(255, 255, 255, 0.42);
		padding: 1rem;
	}

	.dark .signal,
	.dark .micro-card {
		background: rgba(255, 255, 255, 0.05);
	}

	.signal-wide {
		grid-column: span 2;
	}

	.signal-label,
	.micro-label {
		font-size: 0.74rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		opacity: 0.58;
	}

	.signal-value,
	.micro-value {
		margin-top: 0.55rem;
		font-size: 1.85rem;
		line-height: 1;
		letter-spacing: -0.06em;
		font-weight: 600;
	}

	p {
		margin: 0.65rem 0 0;
		font-size: 0.94rem;
		line-height: 1.55;
		opacity: 0.64;
	}

	.meter {
		margin-top: 0.9rem;
		height: 8px;
		border-radius: 999px;
		background: rgba(15, 23, 42, 0.08);
		overflow: hidden;
	}

	.dark .meter {
		background: rgba(255, 255, 255, 0.08);
	}

	.meter-fill {
		height: 100%;
		border-radius: inherit;
		background: linear-gradient(90deg, #0984e3 0%, #74b9ff 100%);
	}

	.micro-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.8rem;
		margin-top: 0.8rem;
	}

	@media (max-width: 900px) {
		.signal-grid,
		.micro-grid {
			grid-template-columns: 1fr;
		}

		.signal-wide {
			grid-column: auto;
		}
	}
</style>
