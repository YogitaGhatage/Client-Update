import React, { useState, useEffect } from "react";
import './weather.css'

import clear from '../../assets/clear.png'
import cloud from '../../assets/cloud.png'
import drizzle from '../../assets/drizzle.png'
import rain from '../../assets/rain.png'
import snow from '../../assets/snow.png'
import humidityIcon from '../../assets/humidity.png'
import windIcon from '../../assets/wind.png'
import searchIcon from '../../assets/search.png'

const Weather = () => {
  const api_key = "e3cb793e49ab7044d6807e2b43111e8e";
  const [wicon, setWicon] = useState(cloud);
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    // Fetch weather data for current location when component mounts
    getCurrentLocationWeather();
  }, []);

  const getCurrentLocationWeather = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${api_key}`;
        const response = await fetch(url);
        const data = await response.json();
        setLocationData(data);
        updateWeatherIcon(data.weather[0].icon);
      }, (error) => {
        console.error('Error getting current location:', error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const updateWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case "01d":
      case "01n":
        setWicon(clear);
        break;
      case "02d":
      case "02n":
      case "03d":
      case "03n":
        setWicon(cloud);
        break;
      case "04d":
      case "04n":
        setWicon(drizzle);
        break;
      case "09d":
      case "09n":
      case "10d":
      case "10n":
        setWicon(rain);
        break;
      case "13d":
      case "13n":
        setWicon(snow);
        break;
      default:
        setWicon(cloud);
        break;
    }
  };

  const handleSearch = async () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    const response = await fetch(url);
    const data = await response.json();
    setLocationData(data);
    updateWeatherIcon(data.weather[0].icon);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder='search' />
        <div className="search" onClick={handleSearch}>
          <img src={searchIcon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      <div className="weather-temp">{locationData ? `${locationData.main.temp}°C` : 'Loading...'}</div>
      <div className="weather-location">{locationData ? locationData.name : 'Loading...'}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidityIcon} alt="" className="icon" height={50} />
          <div className="data">
            <div className="humidity-percent">{locationData ? `${locationData.main.humidity}%` : 'Loading...'}</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={windIcon} alt="" className="icon" height={50} />
          <div className="data">
            <div className="wind-rate">{locationData ? `${locationData.wind.speed} km/h` : 'Loading...'}</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather;
