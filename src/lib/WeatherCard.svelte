<script>
	import { t, theme } from '$lib/i18n.js';
	export let weather;

	function getWeatherIcon(iconCode) {
		const iconMap = {
			'01d': '☀️', '01n': '🌙',
			'02d': '⛅', '02n': '☁️',
			'03d': '☁️', '03n': '☁️',
			'04d': '☁️', '04n': '☁️',
			'09d': '🌧️', '09n': '🌧️',
			'10d': '🌦️', '10n': '🌧️',
			'11d': '⛈️', '11n': '⛈️',
			'13d': '❄️', '13n': '❄️',
			'50d': '🌫️', '50n': '🌫️'
		};
		return iconMap[iconCode] || '🌤️';
	}

	function formatTime(timestamp) {
		return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit'
		});
	}
</script>

<div class="weather-card" class:dark={$theme === 'dark'}>
	<div class="location">
		<h2>{weather.name}, {weather.sys.country}</h2>
	</div>
	
	<div class="main-weather">
		<div class="icon">
			{getWeatherIcon(weather.weather[0].icon)}
		</div>
		<div class="temperature">
			{Math.round(weather.main.temp)}°C
		</div>
	</div>
	
	<div class="description">
		{weather.weather[0].description}
	</div>
	
	<div class="details">
		<div class="detail-item">
			<span class="label">{$t('feelsLike')}</span>
			<span class="value">{Math.round(weather.main.feels_like)}°C</span>
		</div>
		
		<div class="detail-item">
			<span class="label">{$t('humidity')}</span>
			<span class="value">{weather.main.humidity}%</span>
		</div>
		
		<div class="detail-item">
			<span class="label">{$t('wind')}</span>
			<span class="value">{weather.wind.speed} m/s</span>
		</div>
		
		<div class="detail-item">
			<span class="label">{$t('pressure')}</span>
			<span class="value">{weather.main.pressure} hPa</span>
		</div>
	</div>
	
	<div class="sun-times">
		<div class="sun-time">
			<span>{$t('sunrise')}: {formatTime(weather.sys.sunrise)}</span>
		</div>
		<div class="sun-time">
			<span>{$t('sunset')}: {formatTime(weather.sys.sunset)}</span>
		</div>
	</div>
</div>

<style>
	.weather-card {
		background: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		border-radius: 20px;
		padding: 2rem;
		color: white;
		border: 1px solid rgba(255, 255, 255, 0.2);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
		animation: fadeIn 0.5s ease-out;
		transition: all 0.3s ease;
	}

	.weather-card.dark {
		background: rgba(0, 0, 0, 0.3);
		border: 1px solid rgba(255, 255, 255, 0.1);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.location h2 {
		margin: 0 0 1rem 0;
		text-align: center;
		font-size: 1.5rem;
		font-weight: 300;
	}

	.main-weather {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1rem;
		gap: 1rem;
	}

	.icon {
		font-size: 4rem;
	}

	.temperature {
		font-size: 4rem;
		font-weight: 300;
	}

	.description {
		text-align: center;
		font-size: 1.2rem;
		text-transform: capitalize;
		margin-bottom: 2rem;
		opacity: 0.9;
	}

	.details {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
		margin-bottom: 2rem;
	}

	.detail-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 10px;
		transition: all 0.3s ease;
	}

	.weather-card.dark .detail-item {
		background: rgba(255, 255, 255, 0.05);
	}

	.label {
		opacity: 0.8;
		font-size: 0.9rem;
	}

	.value {
		font-weight: 600;
	}

	.sun-times {
		display: flex;
		justify-content: space-between;
		padding-top: 1rem;
		border-top: 1px solid rgba(255, 255, 255, 0.2);
	}

	.sun-time {
		font-size: 0.9rem;
		opacity: 0.9;
	}

	@media (max-width: 600px) {
		.weather-card {
			padding: 1.5rem;
		}
		
		.main-weather {
			flex-direction: column;
			gap: 0.5rem;
		}
		
		.temperature {
			font-size: 3rem;
		}
		
		.icon {
			font-size: 3rem;
		}
		
		.details {
			grid-template-columns: 1fr;
		}
		
		.sun-times {
			flex-direction: column;
			gap: 0.5rem;
			text-align: center;
		}
	}
</style>
