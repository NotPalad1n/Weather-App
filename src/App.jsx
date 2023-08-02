import React from "react";
import Weather from "./components/Weather";
import Search from "./components/Search";
import "./styles/app.css";

function App() {
  const apiKey = "61f98b0e485a6a4bf7e81ec69b02bca2";

  const [url, setUrl] = React.useState("./day icons/clouds.svg");

  const [searchData, setSearchData] = React.useState({
    lat: 0,
    lon: 0,
  });

  const handleOnSearchChange = (searchData) => {
    setSearchData(searchData);
    fetchData(searchData.lat, searchData.lon);
  };

  const fetchData = async (lat, lon) => {
    const weatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const weather = await weatherData.json();
    const temp = Math.round(weather.main.temp - 273.15);

    console.log(weather);

    document.querySelector(".temp").textContent = temp;
    document.querySelector(".description").textContent =
      weather.weather[0].description;
    document.querySelector(".wind").textContent = weather.wind.speed;
    document.querySelector(".humidity").textContent = weather.main.humidity;
    document.querySelector(".min").textContent = Math.round(
      weather.main.temp_min - 273.15
    );
    document.querySelector(".max").textContent = Math.round(
      weather.main.temp_max - 273.15
    );
    setUrl(`./day icons/${weather.weather[0].description}.svg`);
  };

  return (
    <div className="app">
      <Search onSearchChange={handleOnSearchChange} />
      <Weather url={url} />
    </div>
  );
}

export default App;
