import React from 'react'
import "../styles/dayCard.css"

const DayCard = (props) => {
  return (
    <div className='dayCard'>
        <p>{props.day}</p>
        <img src={props.url} alt="" />
        <div>
            <p>{props.temp}</p>
            <p>°C</p>
        </div>
    </div>
  )
}

export default DayCard