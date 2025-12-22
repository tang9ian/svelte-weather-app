<script>
	import { locale } from '$lib/i18n.js';

	function toggleLanguage() {
		locale.update(current => current === 'en' ? 'zh' : 'en');
	}
</script>

<button class="lang-toggle" on:click={toggleLanguage}>
	{$locale === 'en' ? '中文' : 'English'}
</button>

<style>
	.lang-toggle {
		position: fixed;
		top: 20px;
		right: 20px;
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(10px);
		border: 1px solid rgba(255, 255, 255, 0.3);
		border-radius: 20px;
		padding: 8px 16px;
		color: white;
		font-size: 0.9rem;
		cursor: pointer;
		transition: all 0.3s ease;
		z-index: 1000;
	}

	.lang-toggle:hover {
		background: rgba(255, 255, 255, 0.3);
		transform: scale(1.05);
	}

	.lang-toggle:active {
		transform: scale(0.95);
	}
</style>
