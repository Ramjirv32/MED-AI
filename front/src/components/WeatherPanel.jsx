import React, { useState, useEffect } from 'react';

const WeatherPanel = ({ isOpen, onClose }) => {
  const [weatherData, setWeatherData] = useState({
    temperature: '--°',
    detailedTemp: '--°C',
    description: 'Loading...',
    visibility: '-- km',
    humidity: '--%',
    windSpeed: '-- km/h',
    feelsLike: '--°'
  });
  const [searchCity, setSearchCity] = useState('');
  const [currentCity, setCurrentCity] = useState('Chennai');
  const [showSearch, setShowSearch] = useState(false);
  const API_KEY = '330701b61351367edd6da840005dce58';

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      updateWeatherUI(data);
    } catch (error) {
      console.error('Error:', error);
      alert('City not found or error fetching weather data');
    }
  };

  const updateWeatherUI = (data) => {
    setWeatherData({
      temperature: `${Math.round(data.main.temp)}°`,
      detailedTemp: `${Math.round(data.main.temp)}°C`,
      description: data.weather[0].description,
      visibility: `${(data.visibility / 1000).toFixed(1)} km`,
      humidity: `${data.main.humidity}%`,
      windSpeed: `${Math.round(data.wind.speed * 3.6)} km/h`,
      feelsLike: `${Math.round(data.main.feels_like)}°`
    });
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      const city = event.target.value.trim();
      if (city) {
        setCurrentCity(city);
        fetchWeatherData(city);
        setSearchCity('');
        setShowSearch(false);
      }
    }
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const getWeatherIcon = (temp, description) => {
    const temperature = parseFloat(temp) || 0;
    
    if (description?.toLowerCase().includes('clear') || description?.toLowerCase().includes('sunny')) {
      return (
        <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto mb-4">
          <circle cx="50" cy="50" r="25" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
          <path d="M50 10 L50 5 M50 95 L50 90 M10 50 L5 50 M95 50 L90 50 M25.36 25.36 L22.12 22.12 M77.88 77.88 L74.64 74.64 M25.36 74.64 L22.12 77.88 M77.88 22.12 L74.64 25.36" 
                stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      );
    } else if (description?.toLowerCase().includes('cloud') || description?.toLowerCase().includes('overcast')) {
      return (
        <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto mb-4">
          <path d="M25 60 Q20 50 30 50 Q35 35 50 35 Q65 35 70 50 Q80 50 75 60 Q75 70 65 70 L35 70 Q25 70 25 60 Z" 
                fill="#E0E0E0" stroke="#B0B0B0" strokeWidth="2"/>
        </svg>
      );
    } else if (description?.toLowerCase().includes('rain')) {
      return (
        <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto mb-4">
          <path d="M25 60 Q20 50 30 50 Q35 35 50 35 Q65 35 70 50 Q80 50 75 60 Q75 70 65 70 L35 70 Q25 70 25 60 Z" 
                fill="#B0B0B0" stroke="#808080" strokeWidth="2"/>
          <path d="M40 75 L40 85 M45 75 L45 85 M50 75 L50 85 M55 75 L55 85 M60 75 L60 85" 
                stroke="#4A90E2" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    } else if (temperature < 0) {
      return (
        <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto mb-4">
          <path d="M50 20 Q45 15 50 10 Q55 15 50 20 Q45 25 50 30 Q55 25 50 20 Q45 35 50 40 Q55 35 50 20 Q45 45 50 50 Q55 45 50 20 Q45 55 50 60 Q55 55 50 20 Q45 65 50 70 Q55 65 50 20 Q45 75 50 80 Q55 75 50 20" 
                fill="#87CEEB" stroke="#4682B4" strokeWidth="2"/>
        </svg>
      );
    } else {
      return (
        <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto mb-4">
          <circle cx="50" cy="50" r="25" fill="#FFD700" stroke="#FFA500" strokeWidth="2"/>
          <path d="M50 10 L50 5 M50 95 L50 90 M10 50 L5 50 M95 50 L90 50 M25.36 25.36 L22.12 22.12 M77.88 77.88 L74.64 74.64 M25.36 74.64 L22.12 77.88 M77.88 22.12 L74.64 25.36" 
                stroke="#FFA500" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      );
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchWeatherData(currentCity);
    }
  }, [isOpen, currentCity]);

  return (
    <div className={`weather-dropdown absolute inset-0 bg-black/95 backdrop-blur-lg rounded-3xl p-3 border border-gray-700/50 z-10 ${isOpen ? 'active' : ''}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-white text-lg font-bold">Weather</h3>
        <div className="flex items-center space-x-2">
          <button onClick={toggleSearch} className="text-gray-400 hover:text-white">
            <i className="fas fa-search"></i>
          </button>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
      
      {showSearch && (
        <div className="mb-4">
          <input 
            type="text" 
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter city name..." 
            className="w-full bg-gray-800/50 text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={handleSearch}
            autoFocus
          />
        </div>
      )}
      
      <div className="text-center mb-4">
        {getWeatherIcon(weatherData.detailedTemp, weatherData.description)}
        <div className="text-3xl font-bold text-white mb-2">{weatherData.detailedTemp}</div>
        <div className="text-gray-400 text-sm font-bold">{weatherData.description}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <i className="fas fa-eye text-gray-400 mb-1"></i>
          <div className="text-white text-sm font-bold">{weatherData.visibility}</div>
          <div className="text-gray-500 text-xs font-bold">Visibility</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <i className="fas fa-tint text-blue-400 mb-1"></i>
          <div className="text-white text-sm font-bold">{weatherData.humidity}</div>
          <div className="text-gray-500 text-xs font-bold">Humidity</div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <i className="fas fa-wind text-green-400 mb-1"></i>
          <div className="text-white text-sm font-bold">{weatherData.windSpeed}</div>
          <div className="text-gray-500 text-xs font-bold">Wind</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <i className="fas fa-thermometer-half text-orange-400 mb-1"></i>
          <div className="text-white text-sm font-bold">{weatherData.feelsLike}</div>
          <div className="text-gray-500 text-xs font-bold">Feels like</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherPanel;
