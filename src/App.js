import React, { useState } from "react";
import axios from "axios";
import "./index.css";
function App() {
  const [location, setLocation] = useState("");
  const [data, setData] = useState({});

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">East London</div>
          <div className="temp">
            <h1>30°C</h1>
          </div>
          <div className="description">Cloudy with a chance of meatballs</div>
        </div>
        <div className="bottom">
          <div className="feelslike">
            <p>30°C</p>
          </div>
          <div className="humidity">
            <p>62%</p>
          </div>
          <div className="wind">
            <p>2 KPH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
