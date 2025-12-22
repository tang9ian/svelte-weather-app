<script>
	import { theme } from '$lib/i18n.js';

	function toggleTheme() {
		theme.update(current => current === 'light' ? 'dark' : 'light');
	}
</script>

<button class="theme-toggle" on:click={toggleTheme}>
	{$theme === 'light' ? '🌙' : '☀️'}
</button>

<style>
	.theme-toggle {
		position: fixed;
		top: 70px;
		right: 20px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: white;
		font-size: 1.5rem;
		cursor: pointer;
		transition: all 0.3s ease;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.theme-toggle:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(1.1);
	}

	.theme-toggle:active {
		transform: scale(0.95);
	}
</style>
