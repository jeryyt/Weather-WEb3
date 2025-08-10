# Weather App

A full-stack weather application built with Node.js, Express, Handlebars, and modern web technologies. Get real-time weather updates for any city around the world with a beautiful, responsive interface.

## 🌟 Features

- **Real-time Weather Data**: Get current weather information for any city
- **Beautiful UI/UX**: Modern, responsive design with smooth animations
- **Interactive Interface**: Intuitive search functionality with form validation
- **Comprehensive Weather Details**: Temperature, humidity, wind speed, pressure, visibility, sunrise, and sunset
- **Auto-refresh**: Weather data automatically updates every 5 minutes
- **Accessibility**: Full keyboard navigation and ARIA support
- **Mobile Responsive**: Optimized for all device sizes
- **Error Handling**: User-friendly error messages and validation

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Templating**: Handlebars
- **Styling**: Modern CSS with Flexbox and Grid
- **API**: OpenWeatherMap API
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Poppins)

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenWeatherMap API key

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `env.example` to `.env`
   - Get your free API key from [OpenWeatherMap](https://openweathermap.org/api)
   - Add your API key to the `.env` file:
     ```
     WEATHER_API_KEY=your-actual-api-key-here
     PORT=3000
     ```

4. **Start the application**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Open your browser**
   - Navigate to `http://localhost:3000`
   - Start searching for weather information!

## 📁 Project Structure

```
weather-app/
├── public/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   └── js/
│       └── app.js            # Frontend JavaScript
├── views/
│   ├── layouts/
│   │   └── main.handlebars   # Main layout template
│   └── home.handlebars       # Home page template
├── server.js                 # Express server
├── package.json             # Dependencies and scripts
├── env.example              # Environment variables example
└── README.md               # Project documentation
```

## 🎯 Usage

1. **Search for Weather**
   - Enter a city name in the search box
   - Click "Search" or press Enter
   - View comprehensive weather information

2. **Weather Information Displayed**
   - Current temperature and "feels like" temperature
   - Weather description and icon
   - Humidity percentage
   - Wind speed in m/s
   - Atmospheric pressure in hPa
   - Visibility in kilometers
   - Sunrise and sunset times

3. **Interactive Features**
   - Hover effects on weather details
   - Smooth animations and transitions
   - Keyboard navigation support
   - Auto-refresh every 5 minutes

## 🔧 API Endpoints

- `GET /` - Home page with weather search form
- `POST /weather` - Search for weather by city name
- `GET /api/weather/:city` - JSON API endpoint for weather data

## 🎨 Design Features

- **Modern Gradient Background**: Beautiful purple-blue gradient
- **Glass Morphism**: Translucent cards with backdrop blur
- **Smooth Animations**: Fade-in effects and hover transitions
- **Responsive Grid**: Adaptive layout for all screen sizes
- **Accessibility**: ARIA labels and keyboard navigation
- **Loading States**: Visual feedback during API calls

## 🐛 Troubleshooting

### Common Issues

1. **API Key Error**
   - Ensure you have a valid OpenWeatherMap API key
   - Check that the key is correctly set in your `.env` file
   - Verify the API key has the necessary permissions

2. **City Not Found**
   - Check the spelling of the city name
   - Try using the full city name (e.g., "New York" instead of "NYC")
   - Some cities may require country codes

3. **Port Already in Use**
   - Change the PORT in your `.env` file
   - Or kill the process using the current port

### Error Messages

- **"City not found"**: The city name doesn't exist in the OpenWeatherMap database
- **"API error"**: There's an issue with the OpenWeatherMap API
- **"Please enter a city name"**: The search field is empty

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [Font Awesome](https://fontawesome.com/) for the beautiful icons
- [Google Fonts](https://fonts.google.com/) for the Poppins font family

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the troubleshooting section above
2. Search for existing issues in the repository
3. Create a new issue with detailed information

---

**Happy Weather Tracking! 🌤️** 