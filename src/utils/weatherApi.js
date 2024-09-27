import { checkResponse } from "./api";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const main = data.main;
  const temperatureF = main && main.temp;
  const temperatureC = Math.round(((temperatureF - 32) * 5) / 9);

  const weather = {
    city: data.name,
    temp: { F: Math.round(temperatureF), C: temperatureC },
    type: getWeatherType(temperatureF),
    condition: data.weather[0].main.toLowerCase(),
    isDay: isDay(data.sys, Date.now()),
  };

  return weather;
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
