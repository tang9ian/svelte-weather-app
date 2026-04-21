<script>
	import { theme } from '$lib/stores/preferences.js';

	function toggleTheme() {
		theme.update(current => current === 'light' ? 'dark' : 'light');
	}
</script>

<button class="theme-toggle" on:click={toggleTheme}>
	<svg viewBox="0 0 24 24" aria-hidden="true">
		{#if $theme === 'light'}
			<path d="M15.5 3.5c-4.6 1.2-7.5 5.2-6.8 9.7.6 4.3 4.3 7.4 8.7 7.4 1.2 0 2.3-.2 3.3-.7-1.7 1.8-4.2 2.9-6.9 2.9-5.2 0-9.5-4.2-9.5-9.4S8.6 4 13.8 4c.6 0 1.2.1 1.7.2Z" />
		{:else}
			<circle cx="12" cy="12" r="4.5" />
			<path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.4 5.6l-2 2M7.6 16.4l-2 2M18.4 18.4l-2-2M7.6 7.6l-2-2" />
		{/if}
	</svg>
</button>

<style>
	.theme-toggle {
		position: fixed;
		top: 78px;
		right: 24px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.62);
		backdrop-filter: blur(18px);
		border: 1px solid rgba(255, 255, 255, 0.56);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.62);
		color: #111827;
		cursor: pointer;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.theme-toggle:hover {
		transform: translateY(-1px);
	}

	.theme-toggle:active {
		transform: translateY(1px) scale(0.98);
	}

	.theme-toggle svg {
		width: 1rem;
		height: 1rem;
		fill: none;
		stroke: currentColor;
		stroke-width: 1.8;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
</style>
