import React from 'react'
import "../styles/weather.css"

import DayCard from "./dayCard"

const Weather = () => {
    const apiKey = "61f98b0e485a6a4bf7e81ec69b02bca2"
    
    const [city, setCity] = React.useState("London")
    const [imgUrl, setImgUrl] = React.useState("./day icons/Clouds.svg")

    const [dailyElements, setDailyElements] = React.useState(null)

    function handleChange(event){
        setCity(event.target.value)
    }

    const fetchData = async () => {
        const cityData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
        const location = await cityData.json()

        const lat = location[0].lat
        const lon = location[0].lon

        const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        const weather = await weatherData.json()
        const temp = Math.round(weather.main.temp - 273.15)

        console.log(weather)

        document.querySelector(".temp").textContent = temp
        setImgUrl(`./day icons/${weather.weather[0].main}.svg`)
        document.querySelector(".wind").textContent = weather.wind.speed  
        document.querySelector(".humidity").textContent = weather.main.humidity

        const dailyData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=10&appid=${apiKey}`)
        const daily = await dailyData.json()

        console.log(daily)

        const dailyElements = daily.list.map(
            day => <DayCard 
                key={day.dt}
                day={day.dt} 
                url={`./day icons/${day.weather[0].main}.svg`} 
                temp={Math.round(day.main.temp - 273.15)}
            />
        )

        setDailyElements(dailyElements)


    }

    return (
        <div className='weather'>
            <div className='input'>
                <input 
                    type='text'
                    name='search'
                    className='input'
                    placeholder='Enter a city name'
                    onChange={handleChange}
                />
                <button onClick={fetchData}>Search</button>
            </div>
            <img src={imgUrl} alt="icon" className='icon'/>
            <div>
                <h1 className='temp'>0</h1>
                <h1>°C</h1>
            </div>
            <div className='windAndHumidity'>
                <div>
                    <p className='wind'>0</p>
                    <p>Km/h</p>
                </div>
                <div>
                    <p className='humidity'>0</p>
                    <p>%</p>
                </div>
            </div>    
            <div className='dailyList'>
                {dailyElements}
            </div>
        </div>
    )
}

export default Weather