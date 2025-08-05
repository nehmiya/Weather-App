export const getWeatherData = async (city, options = {}) => {
  if (!city) throw new Error("City is required");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000); 

  try {
    const resp = await fetch(
      `${
        import.meta.env.VITE_WEATHER_PROXY_URL ||
        "https://weather-app-q6gd.onrender.com"
      }/api/weather?city=${encodeURIComponent(city)}`,
      {
        signal: controller.signal,
        ...options,
      }
    );

    if (!resp.ok) {
      const errBody = await resp.json().catch(() => ({}));
      throw new Error(
        errBody.error || `Weather API proxy returned status ${resp.status}`
      );
    }

    const data = await resp.json();
    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
};
