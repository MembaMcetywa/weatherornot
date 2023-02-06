import React, { useState } from "react";
import axios from "axios";
import "./index.css";
import KEY from "./util.js";
import Forecast from "./components/forecast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${KEY}`;

  const searchCity = (event) => {
    if (event.key === "Enter") {
      toast.info("Fetching weather info");
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  return (
    <div className="app">
      <div className="hero">
        <div className="heading">onlyweather.</div>
      </div>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyDown={searchCity}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">{data.name}</div>
          <div className="temp">
            {data.main ? <h1>{Math.floor(data.main.temp)} °C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className="bottom">
            <div className="feelslike">
              {data.main ? (
                <p className="bold">{Math.floor(data.main.feels_like)} °C</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity} %</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{Math.floor(data.wind.speed)} KPH</p>
              ) : null}
              <p>Windspeed</p>
            </div>
          </div>
        )}
        <Forecast />
        <ToastContainer autoClose={1000} theme="colored" newestOnTop={true} />
      </div>
    </div>
  );
}

export default App;
