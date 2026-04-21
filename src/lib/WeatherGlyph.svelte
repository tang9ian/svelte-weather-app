<script>
	export let code = '01d';
	export let size = 72;

	const stroke = '#0984e3';
	const cloudStroke = '#1f2937';
	const cloudFill = '#f8fafc';

	$: kind = code.slice(0, 2);
	$: isNight = code.endsWith('n');
</script>

<svg
	viewBox="0 0 72 72"
	width={size}
	height={size}
	fill="none"
	role="img"
	aria-label="weather icon"
>
	{#if kind === '01'}
		{#if isNight}
			<path
				d="M45 16c-9 3-14 12-11 21 2 7 8 12 15 13-2 2-6 4-10 4-10 0-18-8-18-18 0-11 10-20 21-20 1 0 2 0 3 .2Z"
				fill="#d9f99d"
				stroke={cloudStroke}
				stroke-width="2.2"
				stroke-linejoin="round"
			/>
		{:else}
			<circle cx="36" cy="36" r="12" fill="#ffeb3b" stroke={stroke} stroke-width="2.2" />
			{#each [12, 24, 48, 60] as point}
				<path d={`M${point} 36h6`} stroke={stroke} stroke-width="2.2" stroke-linecap="round" />
				<path d={`M36 ${point}v6`} stroke={stroke} stroke-width="2.2" stroke-linecap="round" />
			{/each}
			<path d="M19 19l4 4" stroke={stroke} stroke-width="2.2" stroke-linecap="round" />
			<path d="M49 49l4 4" stroke={stroke} stroke-width="2.2" stroke-linecap="round" />
			<path d="M53 19l-4 4" stroke={stroke} stroke-width="2.2" stroke-linecap="round" />
			<path d="M23 49l-4 4" stroke={stroke} stroke-width="2.2" stroke-linecap="round" />
		{/if}
	{:else if kind === '02'}
		<circle cx="26" cy="27" r="10" fill="#ffeb3b" stroke={stroke} stroke-width="2.2" />
		<path d="M27 48c-5.5 0-10-4.2-10-9.3S21.5 30 27 30c1.5-4.3 5.5-7.3 10.2-7.3 6 0 10.8 4.6 10.8 10.3H49c4.4 0 8 3.4 8 7.5S53.4 48 49 48H27Z" fill={cloudFill} stroke={cloudStroke} stroke-width="2.2" stroke-linejoin="round" />
	{:else if kind === '03' || kind === '04'}
		<path d="M20 48c-5.5 0-10-4.3-10-9.5S14.5 29 20 29c1.4-5 6.2-8.5 11.8-8.5 6.6 0 12 4.8 12.8 11.1h1.4c4.9 0 9 3.7 9 8.2S50.9 48 46 48H20Z" fill={cloudFill} stroke={cloudStroke} stroke-width="2.2" stroke-linejoin="round" />
	{:else if kind === '09' || kind === '10'}
		<path d="M19 42c-5 0-9-3.8-9-8.5S14 25 19 25c1.4-4.8 5.9-8.2 11.2-8.2 6.3 0 11.4 4.5 12.2 10.5h1.6c4.6 0 8.3 3.5 8.3 7.8S48.6 42 44 42H19Z" fill={cloudFill} stroke={cloudStroke} stroke-width="2.2" stroke-linejoin="round" />
		<path d="M24 48l-3 8" stroke={stroke} stroke-width="2.2" stroke-linecap="round" />
		<path d="M36 48l-3 8" stroke={stroke} stroke-width="2.2" stroke-linecap="round" />
		<path d="M48 48l-3 8" stroke={stroke} stroke-width="2.2" stroke-linecap="round" />
	{:else if kind === '11'}
		<path d="M19 42c-5 0-9-3.8-9-8.5S14 25 19 25c1.4-4.8 5.9-8.2 11.2-8.2 6.3 0 11.4 4.5 12.2 10.5h1.6c4.6 0 8.3 3.5 8.3 7.8S48.6 42 44 42H19Z" fill={cloudFill} stroke={cloudStroke} stroke-width="2.2" stroke-linejoin="round" />
		<path d="M34 46l-5 8h5l-3 8 11-12h-5l3-4Z" fill="#4fc3f7" stroke={stroke} stroke-width="2.2" stroke-linejoin="round" />
	{:else if kind === '13'}
		<path d="M19 41c-5 0-9-3.7-9-8.3S14 24 19 24c1.4-4.7 5.9-8 11.2-8 6.3 0 11.4 4.4 12.2 10.2h1.6c4.6 0 8.3 3.4 8.3 7.6S48.6 41 44 41H19Z" fill={cloudFill} stroke={cloudStroke} stroke-width="2.2" stroke-linejoin="round" />
		<path d="M24 48v10M19 53h10M21 50l6 6M27 50l-6 6" stroke={stroke} stroke-width="2" stroke-linecap="round" />
		<path d="M44 48v10M39 53h10M41 50l6 6M47 50l-6 6" stroke={stroke} stroke-width="2" stroke-linecap="round" />
		{:else}
			<path d="M18 40c-4.5 0-8-3.5-8-7.8S13.5 24 18 24c2.1-6.8 8.4-11.6 15.9-11.6 8.6 0 15.6 6.2 16.7 14.3h.8c6 0 10.8 4.4 10.8 9.8S57.4 46 51.4 46H18Z" fill={cloudFill} stroke={cloudStroke} stroke-width="2.2" stroke-linejoin="round" />
			<path d="M19 53c6-6 13-6 20 0 6-6 12-6 18 0" stroke={stroke} stroke-width="2.2" stroke-linecap="round" />
		{/if}
	</svg>
