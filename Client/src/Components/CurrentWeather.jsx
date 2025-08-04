import React from 'react'
import './CSS/CurrentWeather.css'
import { format, parse } from 'date-fns'

const getDayandHHMM = (rawDate) => {
  const date = parse(rawDate, "yyyy-MM-dd HH:mm", new Date());
  return format(date, "EEEE, HH:mm a");
}

const getWindDescription = (windSpeed)=>{
  if (windSpeed < 10) {
    return "Light breeze";
  } else if (windSpeed < 20) {
    return "Moderate breeze";
  } else if (windSpeed < 30) {
    return "Strong breeze";
  } else {
    return "Gale force winds";
  }
}

const getHumidityDescription = (humidity) => {
  if (humidity < 30) {
    return "Dry";
  } else if (humidity < 60) {
    return "Comfortable";
  } else if (humidity < 80) {
    return "Humid";
  } else {
    return "Very humid";
  }
}

const getUVDescription = (uv)=>{
  if (uv < 3) {
    return "Low risk of harm from unprotected sun exposure";
  } else if (uv < 6) {
    return "Moderate risk of harm from unprotected sun exposure";
  } else if (uv < 8) {
    return "High risk of harm from unprotected sun exposure";
  } else if (uv < 11) {
    return "Very high risk of harm from unprotected sun exposure";
  } else {
    return "Extreme risk of harm from unprotected sun exposure";
  }

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
            <br />
            <small>{getWindDescription(wind_kph)}</small>
          </div>
          <div className="detailed-items">
            <span className="detail-label">💧 Humidity</span>
            <span className="detail-value">{humidity}%</span>
            <br />
            <small>{getHumidityDescription(humidity)}</small>
          </div>
          <div className="detailed-items">
            <span className="detail-label">☀️ UV Index</span>
            <span className="detail-value">{uv}</span>
            <br />
            <small>{getUVDescription(uv)}</small>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentWeather
