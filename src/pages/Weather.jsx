import { useState, useEffect } from "react";
import axios from "axios";  
import { motion } from "framer-motion";

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("Pune");
  const [error, setError] = useState("");

  const API_KEY = "f9f9a09799d92ae447897eee6b0b2b3f";

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
      setError("");
    } catch (err) {
      console.log(err);
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);
  return (
    <>
     <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br text-[#000]">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        className=" border bg-opacity-10 backdrop-blur-md rounded-lg p-8 shadow-md text-center"
      >
        <p className="p-5 text-3xl">Weather App</p>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter city"
            className="px-4 py-2 rounded-md text-black outline-none "
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeather}
            className="ml-2 px-4 py-2 bg-[#757575] rounded-md"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-400">{error}</p>}
        {weather && (
          <div>
            <h1 className="text-2xl font-bold">{weather.name}</h1>
            <p className="text-lg">
              {weather.weather[0].description.toUpperCase()}
            </p>
            <p className="text-4xl font-bold mt-2">
              {Math.round(weather.main.temp)}°C
            </p>
            <div className="mt-4 flex justify-center space-x-4">
              <div>
                <p className="text-sm">Humidity</p>
                <p>{weather.main.humidity}%</p>
              </div>
              <div>
                <p className="text-sm">Wind</p>
                <p>{weather.wind.speed} m/s</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
    </>
  )
}

export default Weather