import React from "react";
import { format, parseISO } from "date-fns";
import "./CSS/WeeklyWeather.css";

function WeeklyWeather({ data }) {
  return (
    <>
      <div className="daily-container card">
        {data.map((day, index) => {
          return (
            <div className="day-row" key={index}>
              <div className="day-label">
                {format(parseISO(day.date), "EEE")}
              </div>
              <div className="day-rain">💧{day.day.daily_chance_of_rain}%</div>
              <div className="day-condition">
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                  className="daily-icon"
                />
                <span className="day-text">{day.day.condition.text}</span>
                <div className="day-temp">
                  {Math.round(day.day.maxtemp_c)}° {Math.round(day.day.mintemp_c)}°
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default WeeklyWeather;
