import React from 'react'
import './CSS/CurrentWeather.css'
import { format, parse } from 'date-fns'

const getDayandHHMM = (rawDate) => {
  const date = parse(rawDate, "yyyy-MM-dd HH:mm", new Date());
  return format(date, "EEEE, HH:mm a");
}

function CurrentWeather({data,location}) {
  const {localtime , name} = location 
  const {
    temp_c,
    condition,
    humidity,
    wind_kph,
    feelslike_c,
    maxtemp_c,
    mintemp_c,
    uv
  } = data;
  return (
    <>
      <div className="current-weather">
        <div className="card left-card">
          <div>
            <h2>{name}</h2>
            <h1 className="temp">{Math.round(temp_c)}</h1>
            <p>
              ⬆️{Math.round(maxtemp_c)}° / ⬇️{Math.round(mintemp_c)}°
            </p>
            <p>Feels like {feelslike_c}°</p>
            <p>{getDayandHHMM(localtime)}</p>
          </div>
          <div className="condition">
            <img src={condition.icon} alt={condition.text} />
            <h2 className="conditon-text">{condition.text}</h2>
          </div>
        </div>
        <div className="card right-card">
          <div className="detailed-items">
            <span className="detail-label">💨 Wind</span>
            <span className="detail-value">{wind_kph}KM/H</span>
          </div>
          <div className="detailed-items">
            <span className="detail-label">💧 Humidity</span>
            <span className="detail-value">{humidity}%</span>
          </div>
          <div className="detailed-items">
            <span className="detail-label">☀️ UV</span>
            <span className="detail-value">{uv}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentWeather
