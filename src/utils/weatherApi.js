export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const main = data.main;
  const temperatureF = main && main.temp;
  const temperatureC = Math.round(((temperatureF - 32) * 5) / 9);

  const weather = {
    city: data.name,
    temp: { F: Math.round(temperatureF), C: temperatureC },
    type: getWeatherType(temperatureF), // Based on Fahrenheit
    condition: data.weather[0].main.toLowerCase(),
    isDay: isDay(data.sys, Date.now()),
  };

  return weather;
};

// export const filterWeatherData = (data) => {
//   const result = {};
//   result.city = data.name;
//   result.temp = { F: data.main.temp };
//   result.type = getWeatherType(result.temp.F);
//   result.condition = data.weather[0].main.toLowerCase();
//   result.isDay = isDay(data.sys, Date.now());
//   return result;
// };

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

// export const parseWeatherData = (data) => {
//   const main = data.main;
//   const temperature = main && main.temp;
//   const weather = {
//     temperature: {
//       F: Math.round(temperature),
//       // prettier-ignore
//       C: Math.round((temperature - 32) * 5 / 9),
//     },
//   };
//   console.log(weather);
//   return weather;
// };

// weather.temperature.F = data.main.temp;
// weather.temperature.C = Math.round(((data.main.temp - 32) * 5) / 9);
