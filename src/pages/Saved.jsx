import { useEffect, useState } from "react";

const API_KEY = "120aae8fb6a7dd24ef1a71b9848d8858";

export default function Saved() {
  const [saved, setSaved] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const cities = JSON.parse(localStorage.getItem("savedCities")) || [];
    setSaved(cities);
  }, []);

  useEffect(() => {
    async function fetchAll() {
      const results = await Promise.all(
        saved.map(async (c) => {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?id=${c.id}&units=metric&appid=${API_KEY}`
          );
          return await res.json();
        })
      );
      setWeatherData(results);
    }
    if (saved.length > 0) fetchAll();
  }, [saved]);

  const removeCity = (id) => {
    const updated = saved.filter((c) => c.id !== id);
    localStorage.setItem("savedCities", JSON.stringify(updated));
    setSaved(updated);
    setWeatherData(weatherData.filter((w) => w.id !== id));
  };

  return (
    <div className="page">
      <h2>Saved Cities</h2>
      {weatherData.length === 0 ? (
        <p>No saved cities yet.</p>
      ) : (
        <div className="saved-list">
          {weatherData.map((w) => (
            <div key={w.id} className="weather-card small">
              <h3>{w.name}</h3>
              <img
                src={`https://openweathermap.org/img/wn/${w.weather[0].icon}@2x.png`}
                alt="icon"
              />
              <p>{Math.round(w.main.temp)}°C</p>
              <p>{w.weather[0].main}</p>
              <button onClick={() => removeCity(w.id)}>❌ Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
