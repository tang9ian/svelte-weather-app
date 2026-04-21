<script>
	import { createEventDispatcher } from 'svelte';
	import { favoriteCities, recentSearches, removeFavoriteCity } from '$lib/stores/favorites.js';
	import { theme } from '$lib/stores/preferences.js';
	import { t } from '$lib/i18n.js';

	const dispatch = createEventDispatcher();

	function selectCity(city) {
		dispatch('select', { city });
	}
</script>

<div class="collections" class:dark={$theme === 'dark'}>
	<section class="collection">
		<div class="header">
			<div class="eyebrow">{$t('savedPlaces')}</div>
			<h3>{$t('favorites')}</h3>
		</div>

		{#if $favoriteCities.length}
			<div class="chips">
				{#each $favoriteCities as city}
					<div class="chip">
						<button class="chip-name" on:click={() => selectCity(city)}>{city}</button>
						<button class="chip-remove" aria-label={$t('removeFavorite')} on:click={() => removeFavoriteCity(city)}>
							<svg viewBox="0 0 24 24" aria-hidden="true">
								<path d="M6 6l12 12M18 6L6 18" />
							</svg>
						</button>
					</div>
				{/each}
			</div>
		{:else}
			<p class="empty">{$t('searchHelp')}</p>
		{/if}
	</section>

	<section class="collection">
		<div class="header">
			<div class="eyebrow">{$t('savedPlaces')}</div>
			<h3>{$t('recentSearches')}</h3>
		</div>

		{#if $recentSearches.length}
			<div class="chips">
				{#each $recentSearches as city}
					<button class="chip simple" on:click={() => selectCity(city)}>{city}</button>
				{/each}
			</div>
		{:else}
			<p class="empty">{$t('searchHelp')}</p>
		{/if}
	</section>
</div>

<style>
	.collections {
		display: grid;
		gap: 1rem;
	}

	.collection {
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(242, 246, 243, 0.76)),
			rgba(255, 255, 255, 0.88);
		border: 1px solid rgba(255, 255, 255, 0.55);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.62),
			0 20px 48px -28px rgba(15, 23, 42, 0.18);
		backdrop-filter: blur(18px);
		border-radius: 2rem;
		padding: 1.25rem;
		color: #111827;
	}

	.dark .collection {
		background:
			linear-gradient(180deg, rgba(28, 36, 40, 0.88), rgba(19, 24, 28, 0.82)),
			rgba(24, 31, 35, 0.82);
		border-color: rgba(255, 255, 255, 0.08);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.08),
			0 20px 48px -28px rgba(0, 0, 0, 0.5);
		color: #f8fafc;
	}

	.header h3 {
		margin: 0;
		font-size: 1.1rem;
		letter-spacing: -0.03em;
	}

	.eyebrow {
		margin-bottom: 0.35rem;
		font-size: 0.72rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		opacity: 0.58;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
		margin-top: 1rem;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		border-radius: 999px;
		padding: 0.25rem 0.35rem 0.25rem 0.85rem;
		background: rgba(255, 255, 255, 0.44);
		border: 1px solid rgba(15, 23, 42, 0.06);
	}

	.dark .chip {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.08);
	}

	.chip-name,
	.chip.simple,
	.chip-remove {
		border: none;
		background: transparent;
		font: inherit;
		color: inherit;
		cursor: pointer;
	}

	.chip.simple {
		padding: 0.55rem 0.85rem;
		background: rgba(255, 255, 255, 0.44);
		border: 1px solid rgba(15, 23, 42, 0.06);
		border-radius: 999px;
	}

	.dark .chip.simple {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.08);
	}

	.chip-remove {
		width: 1.8rem;
		height: 1.8rem;
		display: grid;
		place-items: center;
		border-radius: 999px;
		background: rgba(15, 23, 42, 0.06);
	}

	.dark .chip-remove {
		background: rgba(255, 255, 255, 0.08);
	}

	.chip-remove svg {
		width: 0.8rem;
		height: 0.8rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
	}

	.empty {
		margin: 1rem 0 0;
		color: inherit;
		opacity: 0.62;
		line-height: 1.6;
	}
</style>
