import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";
import "./Main.css";
// import { useMemo } from "react";

function Main({ weatherData, handleCardClick, weatherTemp }) {
  //   //prettier ignore
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  console.log(weatherTemp);
  const temp = weatherTemp?.temperature?.[currentTemperatureUnit];
  // console.log("***************");
  // console.log(temp);
  //   console.log(currentTemperatureUnit);
  // console.log(currentTemperatureUnit);
  return (
    <main>
      <WeatherCard weatherData={weatherData} weatherTemp={weatherTemp} />
      <section className="cards">
        <p className="cards__text">
          Today is {temp} &deg;F / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
