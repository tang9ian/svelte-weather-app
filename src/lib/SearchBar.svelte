<script>
	import { browser } from '$app/environment';
	import { createEventDispatcher } from 'svelte';
	import { t } from '$lib/i18n.js';
	import { theme, locale } from '$lib/stores/preferences.js';
	import { getCitySuggestions } from '$lib/cities.js';
	import { searchCities } from '$lib/services/weather.js';
	
	const dispatch = createEventDispatcher();
	
	let city = '';
	let suggestions = [];
	let showSuggestions = false;
	let selectedIndex = -1;
	let isSearching = false;
	let searchTimeout;
	let activeRequest = 0;

	$: if (browser) {
		updateSuggestions(city, $locale);
	}

	function handleSubmit() {
		if (city.trim()) {
			dispatch('search', { city: city.trim() });
			city = '';
			showSuggestions = false;
		}
	}

	function selectSuggestion(suggestion) {
		dispatch('search', { city: suggestion.query });
		city = '';
		showSuggestions = false;
	}

	function handleKeydown(event) {
		if (event.key === 'Enter') {
			if (selectedIndex >= 0 && suggestions[selectedIndex]) {
				selectSuggestion(suggestions[selectedIndex]);
			} else {
				handleSubmit();
			}
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, suggestions.length - 1);
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, -1);
		} else if (event.key === 'Escape') {
			showSuggestions = false;
			selectedIndex = -1;
		}
	}

	function handleBlur() {
		setTimeout(() => {
			showSuggestions = false;
		}, 200);
	}

	function updateSuggestions(value, currentLocale) {
		clearTimeout(searchTimeout);
		selectedIndex = -1;

		if (!value.trim()) {
			suggestions = [];
			showSuggestions = false;
			isSearching = false;
			return;
		}

		searchTimeout = setTimeout(async () => {
			const requestId = ++activeRequest;
			isSearching = true;

			try {
				const remoteSuggestions = await searchCities(value);

				if (requestId !== activeRequest) return;

				suggestions = remoteSuggestions.length
					? remoteSuggestions
					: getCitySuggestions(value, currentLocale);
				showSuggestions = true;
			} catch {
				if (requestId !== activeRequest) return;

				suggestions = getCitySuggestions(value, currentLocale);
				showSuggestions = true;
			} finally {
				if (requestId === activeRequest) {
					isSearching = false;
				}
			}
		}, 250);
	}
</script>

<div class="search-container">
	<label class="search-label" for="city-search">{$t('searchLabel')}</label>
	<p class="search-help">{$t('searchHelp')}</p>
	<div class="search-box" class:dark={$theme === 'dark'}>
		<input
			id="city-search"
			type="text"
			bind:value={city}
			on:keydown={handleKeydown}
			on:blur={handleBlur}
			on:focus={() => city.length > 0 && (showSuggestions = suggestions.length > 0)}
			placeholder={$t('searchPlaceholder')}
			class="search-input"
		/>
		<button on:click={handleSubmit} class="search-button" aria-label={$t('searchLabel')}>
			<svg viewBox="0 0 24 24" aria-hidden="true">
				<circle cx="11" cy="11" r="6.5" />
				<path d="M16 16l4.5 4.5" />
			</svg>
		</button>
	</div>
	
	{#if showSuggestions}
		<div class="suggestions" class:dark={$theme === 'dark'}>
			{#if isSearching}
				<div class="search-status">{$t('searchLoading')}</div>
			{:else if suggestions.length}
				{#each suggestions as suggestion, index}
					<button
						type="button"
						class="suggestion-item"
						class:selected={index === selectedIndex}
						on:mousedown|preventDefault={() => selectSuggestion(suggestion)}
					>
						{suggestion.label}
					</button>
				{/each}
			{:else}
				<div class="search-status">{$t('noCityResults')}</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	.search-container {
		margin-bottom: 1.4rem;
		position: relative;
	}

	.search-label {
		display: block;
		margin-bottom: 0.4rem;
		font-size: 0.78rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: rgba(15, 23, 42, 0.58);
	}

	.search-help {
		margin: 0 0 0.85rem;
		font-size: 0.96rem;
		line-height: 1.6;
		color: rgba(15, 23, 42, 0.62);
	}

	.search-box {
		display: flex;
		background: rgba(255, 255, 255, 0.64);
		backdrop-filter: blur(18px);
		border-radius: 1.35rem;
		padding: 0.35rem;
		border: 1px solid rgba(255, 255, 255, 0.58);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.64),
			0 16px 32px -24px rgba(15, 23, 42, 0.24);
		transition: all 0.3s ease;
	}

	.search-box.dark {
		background: rgba(24, 31, 35, 0.72);
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.08),
			0 16px 32px -24px rgba(0, 0, 0, 0.4);
	}

	:global(.app.dark) .search-label,
	:global(.app.dark) .search-help {
		color: rgba(248, 250, 252, 0.7);
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		padding: 0.95rem 1rem 0.95rem 1.1rem;
		color: #111827;
		font-size: 1rem;
		outline: none;
		font-family: 'Outfit', sans-serif;
	}

	.search-input::placeholder {
		color: rgba(15, 23, 42, 0.42);
	}

	.search-box.dark .search-input {
		color: #f8fafc;
	}

	.search-box.dark .search-input::placeholder {
		color: rgba(248, 250, 252, 0.46);
	}

	.search-button {
		background: #0984e3;
		border: none;
		border-radius: 1rem;
		width: 3rem;
		height: 3rem;
		cursor: pointer;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
		display: grid;
		place-items: center;
	}

	.search-button:hover {
		background: #0a6dc0;
		transform: translateY(-1px);
	}

	.search-button:active {
		transform: translateY(1px) scale(0.98);
	}

	.search-button svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: white;
		stroke-width: 2;
		stroke-linecap: round;
	}

	.suggestions {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(18px);
		border-radius: 1.4rem;
		border: 1px solid rgba(255, 255, 255, 0.56);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.62),
			0 20px 40px -24px rgba(15, 23, 42, 0.26);
		z-index: 1000;
		margin-top: 0.45rem;
		overflow: hidden;
	}

	.suggestions.dark {
		background: rgba(24, 31, 35, 0.92);
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	.suggestion-item {
		display: block;
		width: 100%;
		text-align: left;
		background: transparent;
		border: none;
		padding: 0.95rem 1rem;
		cursor: pointer;
		transition: all 0.2s ease;
		color: #333;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		font-family: 'Outfit', sans-serif;
	}

	.suggestions.dark .suggestion-item {
		color: white;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.suggestion-item:last-child {
		border-bottom: none;
	}

	.suggestion-item:hover,
	.suggestion-item.selected {
		background: rgba(116, 185, 255, 0.16);
		color: #0984e3;
	}

	.search-status {
		padding: 12px 20px;
		color: #475569;
		font-size: 0.95rem;
	}

	.suggestions.dark .suggestion-item:hover,
	.suggestions.dark .suggestion-item.selected {
		background: rgba(79, 195, 247, 0.16);
		color: #8fd4ff;
	}

	.suggestions.dark .search-status {
		color: rgba(255, 255, 255, 0.72);
	}
</style>
