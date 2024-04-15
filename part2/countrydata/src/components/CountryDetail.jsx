import { useState, useEffect, useCallback } from "react";
import "../App.css";
import weatherService from "../services/weather";

const CountryDetail = ({ country }) => {
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital[0]}</div>
      <div>Currency: {Object.values(country.currencies)[0].name}</div>
      <h4>Languages</h4>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <h4>Flag</h4>
      <img src={country.flags.svg} className="country-flag-img" />
      <CountryWeather
        capital={country.capital[0]}
        lat={country.capitalInfo.latlng[0]}
        lon={country.capitalInfo.latlng[1]}
      />
    </>
  );
};

const CountryWeather = ({ capital, lat, lon }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    weatherService.getCurrentWeather(lat, lon).then((data) => {
      setWeatherData(data);
    });
  }, [lat, lon]);

  if (weatherData === null) {
    return null;
  }

  return (
    <>
      <h4>Weather in {capital}</h4>
      <img src={weatherService.iconURL(weatherData.weather[0].icon)} />
      <div>Temperature: {weatherData.main.temp}° Fahrenheit</div>
      <div>Wind speed: {weatherData.wind.speed} mph</div>
    </>
  );
};

export default CountryDetail;
