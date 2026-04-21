<script>
	import { locale } from '$lib/stores/preferences.js';

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
		top: 24px;
		right: 24px;
		background: rgba(255, 255, 255, 0.62);
		backdrop-filter: blur(18px);
		border: 1px solid rgba(255, 255, 255, 0.56);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.62);
		border-radius: 999px;
		padding: 0.72rem 1rem;
		color: #111827;
		font-size: 0.82rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		cursor: pointer;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease;
		z-index: 1000;
	}

	.lang-toggle:hover {
		transform: translateY(-1px);
	}

	.lang-toggle:active {
		transform: translateY(1px) scale(0.98);
	}
</style>
