export function getLocaleTag(locale) {
	return locale === 'zh' ? 'zh-CN' : 'en-US';
}

export function formatTemperature(value) {
	return `${Math.round(value)}°`;
}

export function getTemperatureUnitLabel(unit) {
	return unit === 'imperial' ? '°F' : '°C';
}

export function getWindSpeedLabel(unit) {
	return unit === 'imperial' ? 'mph' : 'm/s';
}

export function formatNumber(value, digits = 0) {
	return Number(value).toFixed(digits);
}

function toOffsetDate(timestamp, timezoneOffset = 0) {
	return new Date((timestamp + timezoneOffset) * 1000);
}

export function formatTime(timestamp, locale, timezoneOffset = 0) {
	return new Intl.DateTimeFormat(getLocaleTag(locale), {
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'UTC'
	}).format(toOffsetDate(timestamp, timezoneOffset));
}

export function formatHour(timestamp, locale, timezoneOffset = 0) {
	return new Intl.DateTimeFormat(getLocaleTag(locale), {
		hour: 'numeric',
		timeZone: 'UTC'
	}).format(toOffsetDate(timestamp, timezoneOffset));
}

export function formatWeekday(timestamp, locale, timezoneOffset = 0) {
	return new Intl.DateTimeFormat(getLocaleTag(locale), {
		weekday: 'short',
		timeZone: 'UTC'
	}).format(toOffsetDate(timestamp, timezoneOffset));
}
