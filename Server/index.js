// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const port = process.env.PORT || 5500;
const WEATHER_API_KEY = process.env.API_KEY;

if (!WEATHER_API_KEY) {
  console.error("Missing WEATHER API key in environment (process.env.API_KEY)");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>The server is up and running...</h1>");
});

const cache = new Map();
const CACHE_TTL_MS = 60 * 1000;

app.get("/api/weather", async (req, res) => {
  const { city } = req.query;
  if (!city)
    return res.status(400).json({ error: "City query parameter is required" });

  const cacheKey = city.toLowerCase();
  const now = Date.now();
  if (cache.has(cacheKey)) {
    const { timestamp, data } = cache.get(cacheKey);
    if (now - timestamp < CACHE_TTL_MS) {
      return res.json(data); 
    }
  }

  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${encodeURIComponent(
      WEATHER_API_KEY
    )}&q=${encodeURIComponent(city)}&days=7&aqi=no&alerts=no`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) {
      console.error(`Weather API responded with status: ${response.status}`);
      const text = await response.text().catch(() => "");
      return res
        .status(response.status)
        .json({ error: "Failed to fetch weather data", details: text });
    }

    const data = await response.json();

    // Cache it
    cache.set(cacheKey, { timestamp: now, data });

    return res.json(data);
  } catch (err) {
    if (err.name === "AbortError") {
      console.error("Upstream weather request timed out");
      return res
        .status(504)
        .json({ error: "Upstream weather service timed out" });
    }
    console.error("Error fetching weather data:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
