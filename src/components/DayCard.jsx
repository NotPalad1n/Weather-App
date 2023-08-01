import React from 'react'
import "../styles/dayCard.css"

const DayCard = (props) => {
  let d = new Date(props.day)

  let time = d.getHours() + " : " + d.getMinutes()
  
  return (
    <div className='dayCard'>
        <p>{time}</p>
        <img src={props.url} alt="" />
        <div>
            <p>{props.temp}</p>
            <p>°C</p>
        </div>
    </div>
  )
}

export default DayCard