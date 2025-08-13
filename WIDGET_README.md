# 🌤️ Weather Widget

A beautiful, responsive weather widget that can be easily embedded into any website. Features real-time weather data, animations, and a modern design.

## ✨ Features

- **Real-time Weather Data** - Get current weather from OpenWeatherMap API
- **Beautiful Animations** - Rain, snow, and sun effects based on weather conditions
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Easy Integration** - Simple embed code for any website
- **Customizable** - Configurable units, default city, and update intervals
- **Auto-refresh** - Automatically updates weather data
- **Local Storage** - Remembers last searched city

## 🚀 Quick Start

### Option 1: Use the Widget Generator

1. Open `embed-code.html` in your browser
2. Enter your OpenWeatherMap API key
3. Configure your preferences
4. Copy the generated embed code
5. Paste it into your website

### Option 2: Manual Setup

1. **Get an API Key**: Sign up at [OpenWeatherMap](https://openweathermap.org/api) for a free API key
2. **Host the Widget**: Upload `widget.html` to your server
3. **Embed the Code**: Use the embed code below

## 📋 Embed Code

```html
<!-- Weather Widget Embed Code -->
<div id="weather-widget-container"></div>

<script>
(function() {
    // Widget Configuration
    const WIDGET_CONFIG = {
        apiKey: 'YOUR_API_KEY_HERE',
        defaultCity: 'London',
        units: 'metric', // metric, imperial, or kelvin
        updateInterval: 300000 // 5 minutes in milliseconds
    };

    // Load required resources
    const style = document.createElement('style');
    style.textContent = `
        .weather-widget {
            font-family: 'Poppins', sans-serif;
            max-width: 350px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            padding: 1.5rem;
            color: white;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            position: relative;
            overflow: hidden;
        }
        /* ... rest of the styles ... */
    `;
    document.head.appendChild(style);

    // Load Font Awesome
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }

    // Load Google Fonts
    if (!document.querySelector('link[href*="googleapis"]')) {
        const googleFonts = document.createElement('link');
        googleFonts.rel = 'stylesheet';
        googleFonts.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
        document.head.appendChild(googleFonts);
    }

    // Create and insert widget HTML
    const widgetHTML = `
        <div class="weather-widget" id="weatherWidget">
            <!-- Widget content here -->
        </div>
    `;
    document.getElementById('weather-widget-container').innerHTML = widgetHTML;

    // Widget functions and initialization
    // ... rest of the JavaScript code ...
})();
</script>
```

## ⚙️ Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `apiKey` | string | - | Your OpenWeatherMap API key |
| `defaultCity` | string | 'London' | Default city to display |
| `units` | string | 'metric' | Temperature units (metric/imperial/kelvin) |
| `updateInterval` | number | 300000 | Auto-refresh interval in milliseconds |

## 🎨 Customization

### Colors
You can customize the widget colors by modifying the CSS variables:

```css
.weather-widget {
    background: linear-gradient(135deg, #YOUR_COLOR1 0%, #YOUR_COLOR2 100%);
}
```

### Size
Adjust the widget size by changing the `max-width` property:

```css
.weather-widget {
    max-width: 400px; /* Change this value */
}
```

### Animations
The widget includes weather-based animations:
- **Rain Effect**: Applied when weather description contains "rain" or "drizzle"
- **Snow Effect**: Applied when weather description contains "snow"
- **Sun Effect**: Applied when weather description contains "clear"

## 📱 Responsive Design

The widget is fully responsive and will adapt to different screen sizes:
- **Desktop**: Full widget display
- **Tablet**: Optimized layout
- **Mobile**: Single column layout with adjusted spacing

## 🔧 API Requirements

### OpenWeatherMap API
- **Free Tier**: 1,000 calls/day
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Parameters**: 
  - `q`: City name
  - `appid`: Your API key
  - `units`: metric/imperial/kelvin

### Example API Call
```
GET https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric
```

## 🛠️ Troubleshooting

### Common Issues

1. **Widget Not Loading**
   - Check if your API key is valid
   - Ensure the widget HTML file is accessible
   - Check browser console for JavaScript errors

2. **Weather Data Not Updating**
   - Verify your API key has sufficient quota
   - Check network connectivity
   - Ensure the city name is spelled correctly

3. **Styling Issues**
   - Make sure Font Awesome and Google Fonts are loading
   - Check for CSS conflicts with your website
   - Verify the widget container exists

### Debug Mode
Add this to your configuration for debugging:

```javascript
const WIDGET_CONFIG = {
    // ... other options
    debug: true // Enable console logging
};
```

## 📄 Files Structure

```
weather-widget/
├── widget.html              # Standalone widget file
├── embed-code.html          # Widget generator
├── WIDGET_README.md         # This file
└── server.js               # Original weather app
```

## 🌟 Examples

### Basic Implementation
```html
<!DOCTYPE html>
<html>
<head>
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
    
    <!-- Weather Widget -->
    <div id="weather-widget-container"></div>
    
    <!-- Widget Script -->
    <script>
        // Your widget code here
    </script>
</body>
</html>
```

### Multiple Widgets
```html
<div id="weather-widget-container-1"></div>
<div id="weather-widget-container-2"></div>

<script>
    // Initialize multiple widgets with different configurations
    initWidget('weather-widget-container-1', { defaultCity: 'London' });
    initWidget('weather-widget-container-2', { defaultCity: 'New York' });
</script>
```

## 📞 Support

If you need help with the widget:

1. Check the troubleshooting section above
2. Review the OpenWeatherMap API documentation
3. Test with the standalone `widget.html` file first
4. Check browser console for error messages

## 📄 License

This widget is free to use for personal and commercial projects. Please ensure you comply with OpenWeatherMap's terms of service for API usage.

## 🔄 Updates

- **v1.0**: Initial release with basic weather functionality
- **v1.1**: Added weather animations and improved responsive design
- **v1.2**: Added embed code generator and customization options

---

**Made with ❤️ for the web community** 