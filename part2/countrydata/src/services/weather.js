import axios from "axios";

const baseUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${
  import.meta.env.VITE_WEATHER_KEY
}&units=imperial`;

const getCurrentWeather = (lat, lon) => {
  return axios
    .get(`${baseUrl}&lat=${lat}&lon=${lon}`)
    .then((response) => response.data);
};

const iconURL = (icon) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
};
export default { getCurrentWeather, iconURL };
