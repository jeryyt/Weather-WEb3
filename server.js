const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Handlebars
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Weather App',
        weather: null,
        error: null
    });
});

app.post('/weather', async (req, res) => {
    const { city } = req.body;
    
    if (!city) {
        return res.render('home', {
            title: 'Weather App',
            weather: null,
            error: 'Please enter a city name'
        });
    }

    try {
        // Using OpenWeatherMap API (you'll need to get a free API key)
        const API_KEY = process.env.WEATHER_API_KEY || 'your-api-key-here';
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const weatherData = {
            city: response.data.name,
            country: response.data.sys.country,
            temperature: Math.round(response.data.main.temp),
            feels_like: Math.round(response.data.main.feels_like),
            humidity: response.data.main.humidity,
            wind_speed: response.data.wind.speed,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            pressure: response.data.main.pressure,
            visibility: response.data.visibility / 1000, // Convert to km
            sunrise: new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(response.data.sys.sunset * 1000).toLocaleTimeString(),
            current_date: new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            current_time: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: true 
            })
        };

        res.render('home', {
            title: 'Weather App',
            weather: weatherData,
            error: null
        });

    } catch (error) {
        console.error('Weather API Error:', error.message);
        res.render('home', {
            title: 'Weather App',
            weather: null,
            error: 'City not found or API error. Please try again.'
        });
    }
});

app.get('/api/weather/:city', async (req, res) => {
    const { city } = req.params;
    
    try {
        const API_KEY = process.env.WEATHER_API_KEY || 'your-api-key-here';
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const weatherData = {
            city: response.data.name,
            country: response.data.sys.country,
            temperature: Math.round(response.data.main.temp),
            feels_like: Math.round(response.data.main.feels_like),
            humidity: response.data.main.humidity,
            wind_speed: response.data.wind.speed,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            pressure: response.data.main.pressure,
            visibility: response.data.visibility / 1000,
            sunrise: new Date(response.data.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(response.data.sys.sunset * 1000).toLocaleTimeString(),
            current_date: new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            }),
            current_time: new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: true 
            })
        };

        res.json(weatherData);
    } catch (error) {
        res.status(404).json({ error: 'City not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Weather App is running on http://localhost:${PORT}`);
}); 