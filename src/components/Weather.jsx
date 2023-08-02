import React from 'react'
import "../styles/weather.css"

import DayCard from "./dayCard"

import Raindrop from "../assets/raindrop.svg"
import Wind from "../assets/wind.svg";

const Weather = (props) => {
    const apiKey = "61f98b0e485a6a4bf7e81ec69b02bca2"

    const [dailyElements, setDailyElements] = React.useState(null)

    const fetchData = async () => {

        const dailyData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=10&appid=${apiKey}`)
        const daily = await dailyData.json()      

        const dailyElements = daily.list.map(
            day => {
                const d = new Date(day.dt)

                const time = d.getHours() + ":" + d.getMinutes()
            
                return(
                    <DayCard 
                        key={day.dt}
                        day={time} 
                        url={`./day icons/${day.weather[0].main}.svg`} 
                        temp={Math.round(day.main.temp - 273.15)}
                    />
                )
            }
        )

        setDailyElements(dailyElements)

    }

    return (
      <div className="weather">
        <img src={props.url} alt="icon" className="icon" />
        <p className="description">description</p>
        <div>
          <h1 className="temp">0</h1>
          <h1>°C</h1>
        </div>
        <section className="info">
          <div className="minAndMax">
            <p>
              max : <span className="max">0</span> / min :{" "}
              <span className="min">0</span>
            </p>
          </div>
          <div className="windAndHumidity">
            <div>
              <img src={Wind} alt="wind" />
              <p className="wind">0</p>
              <p>Km/h</p>
            </div>
            <div>
              <img src={Raindrop} alt="raindrop" />
              <p className="humidity">0</p>
              <p>%</p>
            </div>
          </div>
        </section>
        <div className="dailyList">{dailyElements}</div>
      </div>
    );
}

export default Weather