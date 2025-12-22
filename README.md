# Svelte Weather App 🌤️

A beautiful and responsive weather application built with SvelteKit.

## Features

- 🌍 Search weather by city name
- 🎨 Beautiful glassmorphism design
- 📱 Fully responsive
- 🌡️ Real-time weather data
- 🌅 Sunrise/sunset times
- 💨 Wind speed and direction
- 💧 Humidity levels
- 📊 Atmospheric pressure
- 🌐 **Bilingual support (English/Chinese)**
- 🌙 **Dark/Light theme toggle**

## Setup

1. **Get API Key**
   - Sign up at [OpenWeatherMap](https://openweathermap.org/api)
   - Get your free API key
   - Update `.env` file with your API key:
     ```
     VITE_WEATHER_API_KEY=your-actual-api-key-here
     VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5/weather
     ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── routes/
│   └── +page.svelte          # Main page
├── lib/
│   ├── WeatherCard.svelte    # Weather display component
│   ├── SearchBar.svelte      # City search component
│   ├── LanguageToggle.svelte # Language switcher
│   ├── ThemeToggle.svelte    # Theme switcher
│   └── i18n.js              # Internationalization
└── app.html                  # HTML template
```

## Features

### 🌐 Internationalization
- English and Chinese language support
- Floating language toggle button
- All UI text translated

### 🎨 Theme System
- Light and dark themes
- Smooth transitions
- Floating theme toggle button
- Adaptive glassmorphism effects

### 🔒 Environment Variables
- API keys stored securely in `.env`
- Configurable API endpoints
- No hardcoded secrets

## Technologies Used

- **SvelteKit** - Full-stack framework
- **Vite** - Build tool
- **OpenWeatherMap API** - Weather data
- **CSS3** - Glassmorphism styling
- **Svelte Stores** - State management

## Customization

- Modify colors in the CSS gradient backgrounds
- Add more weather details in `WeatherCard.svelte`
- Implement weather forecasts
- Add geolocation support
- Extend language support

## License

MIT License - feel free to use this project for learning and development!
