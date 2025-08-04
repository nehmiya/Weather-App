import React from 'react'
import './CSS/HourlyWeather.css'
import { format, parse } from 'date-fns'

function HourlyWeather({data}) {
  return (
    <>
      <div className="hourly-container card">
        {
          data.map((hour,index)=>{
            return (
              <div className="hour-card" key={index}>
                <div className="hour-time">
                  {format(
                    parse(hour.time, "yyyy-MM-dd HH:mm", new Date()),
                    "h a"
                  )}
                </div>
                <img
                  src={hour.condition.icon}
                  alt="icon"
                  className="hour-icon"
                />
                <div className="hour-temp">{Math.round(hour.temp_c)}°c</div>
                <div className="hour-rain">💧 {hour.chance_of_rain}%</div>
              </div>
            );
          })
        }
      </div>
      
    </>
  )
}

export default HourlyWeather
