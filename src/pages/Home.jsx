import { useState, useEffect } from "react";

const API_KEY = "120aae8fb6a7dd24ef1a71b9848d8858";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.cod === "404") {
        setError("City not found!");
        setWeather(null);
      } else {
        setWeather(data);
        setError("");
      }
    } catch {
      setError("Error fetching data");
    }
  };

  const saveCity = () => {
    if (weather) {
      const saved = JSON.parse(localStorage.getItem("savedCities")) || [];
      if (!saved.find((c) => c.id === weather.id)) {
        saved.push({ id: weather.id, name: weather.name });
        localStorage.setItem("savedCities", JSON.stringify(saved));
        alert(`${weather.name} saved!`);
      } else {
        alert("Already saved!");
      }
    }
  };

  return (
    <div className="page">
      <h2>Search Weather</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h3>{weather.name}, {weather.sys.country}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <h2>{Math.round(weather.main.temp)}°C</h2>
          <p>{weather.weather[0].description}</p>
          <button onClick={saveCity}>⭐ Save City</button>
        </div>
      )}
    </div>
  );
}
