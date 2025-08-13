const express = require('express');
const exphbs = require('express-handlebars');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// File to store saved places
const SAVED_PLACES_FILE = 'saved_places.json';

// Initialize saved places file if it doesn't exist
if (!fs.existsSync(SAVED_PLACES_FILE)) {
    fs.writeFileSync(SAVED_PLACES_FILE, JSON.stringify([]));
}

// Helper function to get saved places
function getSavedPlaces() {
    try {
        const data = fs.readFileSync(SAVED_PLACES_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to save places
function savePlaces(places) {
    fs.writeFileSync(SAVED_PLACES_FILE, JSON.stringify(places, null, 2));
}

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
    const savedPlaces = getSavedPlaces();
    res.render('home', {
        title: 'Weather App',
        weather: null,
        error: null,
        savedPlaces: savedPlaces
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

        const savedPlaces = getSavedPlaces();
        const isSaved = savedPlaces.some(place => place.city.toLowerCase() === weatherData.city.toLowerCase());
        
        res.render('home', {
            title: 'Weather App',
            weather: weatherData,
            error: null,
            savedPlaces: savedPlaces,
            isSaved: isSaved
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

// Route to save a place
app.post('/save-place', (req, res) => {
    const { city, country, temperature, description, icon } = req.body;
    
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }
    
    const savedPlaces = getSavedPlaces();
    const existingIndex = savedPlaces.findIndex(place => place.city.toLowerCase() === city.toLowerCase());
    
    if (existingIndex === -1) {
        // Add new place
        savedPlaces.push({
            city,
            country,
            temperature,
            description,
            icon,
            savedAt: new Date().toISOString()
        });
        savePlaces(savedPlaces);
        res.json({ success: true, message: `${city} added to favorites!` });
    } else {
        res.json({ success: false, message: `${city} is already in favorites!` });
    }
});

// Route to remove a place
app.delete('/remove-place/:city', (req, res) => {
    const { city } = req.params;
    const savedPlaces = getSavedPlaces();
    const filteredPlaces = savedPlaces.filter(place => place.city.toLowerCase() !== city.toLowerCase());
    
    if (filteredPlaces.length < savedPlaces.length) {
        savePlaces(filteredPlaces);
        res.json({ success: true, message: `${city} removed from favorites!` });
    } else {
        res.status(404).json({ error: 'City not found in favorites' });
    }
});

// Route to get saved places
app.get('/api/saved-places', (req, res) => {
    const savedPlaces = getSavedPlaces();
    res.json(savedPlaces);
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