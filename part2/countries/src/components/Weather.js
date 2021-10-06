import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({});
  const getWeather = () => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${city}`;
    axios
      .get(url)
      .then((res) => {
        setWeather(res.data.current)
      })
      .catch(e => console.log(e))
  }
  useEffect(getWeather, [city])
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p><b>temperature: </b>{weather.temperature} Celsius</p>
      <div>
        <img alt="" src={weather.weather_icons ? weather.weather_icons[0] : ''} />
      </div>
      <p><b>wind: </b>{weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )
}

export default Weather