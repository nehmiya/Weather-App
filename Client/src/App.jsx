import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "./Components/SearchBar";
import { getWeatherData } from "./api";
import CurrentWeather from "./Components/CurrentWeather";
import HourlyWeather from "./Components/HourlyWeather";
import WeeklyWeather from "./Components/WeeklyWeather";
import { parse } from "date-fns";
import "./App.css";

const getGradientClass = (hour) => {
  if (hour >= 6 && hour < 9) return "bg-sunrise";
  if (hour >= 9 && hour < 18) return "bg-day";
  if (hour >= 18 && hour < 21) return "bg-sunset";
  return "bg-night";
};

function App() {
  const [city, setCity] = useState("Addis Ababa");
  const [weatherData, setWeatherData] = useState({
    current: null,
    hourly: null,
    weekly: null,
    location: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hour = useMemo(() => {
    const localtimeStr = weatherData.location?.localtime; 
    if (typeof localtimeStr === "string") {
      const parsed = parse(localtimeStr, "yyyy-MM-dd HH:mm", new Date());
      if (!isNaN(parsed)) {
        return parsed.getHours();
      }
    }
    return new Date().getHours();
  }, [weatherData.location]);

  const gradientClass = useMemo(() => getGradientClass(hour), [hour]);

  useEffect(() => {
    if (!city) return; 
    const fetchingWeatherData = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getWeatherData(city);

        const todayForecast = data?.forecast?.forecastday?.[0];
        if (!todayForecast) {
          throw new Error("Incomplete forecast data received");
        }

        const { mintemp_c, maxtemp_c } = todayForecast.day;

        setWeatherData({
          current: {
            ...data.current,
            mintemp_c,
            maxtemp_c,
          },
          hourly: todayForecast.hour ?? [], 
          weekly: data.forecast.forecastday,
          location: data.location,
        });
      } catch (err) {
        const message =
          err?.message || typeof err === "string"
            ? err
            : "Failed to fetch weather data";
        setError(`Error: ${message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchingWeatherData();
  }, [city]);

console.log(weatherData.current);


  return (
    <div className={`app ${gradientClass}`}>
      <div className="container">
        <SearchBar onSearch={setCity} />
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        {weatherData.current && weatherData.location && (
          <>
            <CurrentWeather
              data={weatherData.current}
              location={weatherData.location}
            />
            <HourlyWeather data={weatherData.hourly} />
            <WeeklyWeather data={weatherData.weekly} />
          </>
        )}
        {!loading && !error && !weatherData.current && (
          <p>No weather data available. Try searching for a city.</p>
        )}
      </div>
    </div>
  );
}

export default App;
