<script>
	import { createEventDispatcher } from 'svelte';
	import { unit } from '$lib/stores/preferences.js';
	import { t } from '$lib/i18n.js';

	const dispatch = createEventDispatcher();

	function setUnit(nextUnit) {
		unit.set(nextUnit);
		dispatch('change', { unit: nextUnit });
	}
</script>

<div class="unit-toggle" role="group" aria-label={$t('unit')}>
	<button class:active={$unit === 'metric'} on:click={() => setUnit('metric')}>°C</button>
	<button class:active={$unit === 'imperial'} on:click={() => setUnit('imperial')}>°F</button>
</div>

<style>
	.unit-toggle {
		position: fixed;
		top: 136px;
		right: 24px;
		display: flex;
		border-radius: 999px;
		padding: 4px;
		background: rgba(255, 255, 255, 0.62);
		backdrop-filter: blur(18px);
		border: 1px solid rgba(255, 255, 255, 0.56);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.62);
		z-index: 1000;
	}

	button {
		border: none;
		background: transparent;
		color: #111827;
		padding: 0.45rem 0.8rem;
		border-radius: 999px;
		cursor: pointer;
		font: inherit;
	}

	button.active {
		background: rgba(116, 185, 255, 0.22);
	}
</style>
