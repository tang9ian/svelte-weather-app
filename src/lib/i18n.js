import { writable, derived } from 'svelte/store';

export const locale = writable('en');
export const theme = writable('light');

export const translations = {
  en: {
    title: '🌤️ Weather App',
    searchPlaceholder: 'Enter city name...',
    loading: 'Loading weather data...',
    error: 'Weather data not found',
    errorMessage: 'Please check the city name and try again.',
    feelsLike: 'Feels like',
    humidity: 'Humidity',
    wind: 'Wind',
    pressure: 'Pressure',
    sunrise: '🌅 Sunrise',
    sunset: '🌇 Sunset'
  },
  zh: {
    title: '🌤️ 天气应用',
    searchPlaceholder: '输入城市名称...',
    loading: '正在加载天气数据...',
    error: '未找到天气数据',
    errorMessage: '请检查城市名称后重试。',
    feelsLike: '体感温度',
    humidity: '湿度',
    wind: '风速',
    pressure: '气压',
    sunrise: '🌅 日出',
    sunset: '🌇 日落'
  }
};

export const t = derived(locale, ($locale) => {
  return (key) => translations[$locale][key] || key;
});
