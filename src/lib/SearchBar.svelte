<script>
	import { createEventDispatcher } from 'svelte';
	import { t, theme, locale } from '$lib/i18n.js';
	import { getCitySuggestions } from '$lib/cities.js';
	
	const dispatch = createEventDispatcher();
	
	let city = '';
	let suggestions = [];
	let showSuggestions = false;
	let selectedIndex = -1;

	$: {
		if (city.length > 0) {
			suggestions = getCitySuggestions(city, $locale);
			showSuggestions = suggestions.length > 0;
		} else {
			suggestions = [];
			showSuggestions = false;
		}
		selectedIndex = -1;
	}

	function handleSubmit() {
		if (city.trim()) {
			dispatch('search', { city: city.trim() });
			city = '';
			showSuggestions = false;
		}
	}

	function selectSuggestion(suggestion) {
		dispatch('search', { city: suggestion });
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
		// Delay hiding suggestions to allow click events
		setTimeout(() => {
			showSuggestions = false;
		}, 200);
	}
</script>

<div class="search-container">
	<div class="search-box" class:dark={$theme === 'dark'}>
		<input
			type="text"
			bind:value={city}
			on:keydown={handleKeydown}
			on:blur={handleBlur}
			on:focus={() => city.length > 0 && (showSuggestions = suggestions.length > 0)}
			placeholder={$t('searchPlaceholder')}
			class="search-input"
		/>
		<button on:click={handleSubmit} class="search-button">
			🔍
		</button>
	</div>
	
	{#if showSuggestions}
		<div class="suggestions" class:dark={$theme === 'dark'}>
			{#each suggestions as suggestion, index}
				<div 
					class="suggestion-item" 
					class:selected={index === selectedIndex}
					on:mousedown|preventDefault={() => selectSuggestion(suggestion)}
				>
					{suggestion}
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.search-container {
		margin-bottom: 2rem;
		position: relative;
	}

	.search-box {
		display: flex;
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 25px;
		padding: 5px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		transition: all 0.3s ease;
	}

	.search-box.dark {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}

	.search-input {
		flex: 1;
		background: transparent;
		border: none;
		padding: 15px 20px;
		color: white;
		font-size: 1rem;
		outline: none;
	}

	.search-input::placeholder {
		color: rgba(255, 255, 255, 0.7);
	}

	.search-button {
		background: rgba(255, 255, 255, 0.2);
		border: none;
		border-radius: 20px;
		padding: 10px 15px;
		cursor: pointer;
		font-size: 1.2rem;
		transition: all 0.3s ease;
	}

	.search-button:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(1.05);
	}

	.search-button:active {
		transform: scale(0.95);
	}

	.suggestions {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(10px);
		border-radius: 15px;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		z-index: 1000;
		margin-top: 5px;
		overflow: hidden;
	}

	.suggestions.dark {
		background: rgba(0, 0, 0, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.suggestion-item {
		padding: 12px 20px;
		cursor: pointer;
		transition: all 0.2s ease;
		color: #333;
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
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
		background: rgba(37, 99, 235, 0.1);
		color: #2563eb;
	}

	.suggestions.dark .suggestion-item:hover,
	.suggestions.dark .suggestion-item.selected {
		background: rgba(37, 99, 235, 0.2);
		color: #60a5fa;
	}
</style>
