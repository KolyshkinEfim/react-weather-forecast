import React, { useState } from "react";
import axios from "axios";

const WeatherApp = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=02253f5825ee70abca9d7ff5784cfd40`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((responce) => {
        setData(responce.data);
        console.log(responce.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="container">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          onKeyDown={searchLocation}
          type="text"
        />
      </div>
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main ? <h1>{data.main.temp} °C</h1> : null}
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>
      </div>
      {data.name != undefined && (
        <div>
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like} °C</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? (
                <p className="bold">{data.main.humidity} %</p>
              ) : null}
              <p>Hymidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
              <p>Wind speed</p>
            </div>
          </div>
          <div className="bottom">
            <div className="temp_max">
              Max temp
              {data.main ? <p>{data.main.temp_max} °C</p> : null}
            </div>
            <div className="temp_min">
              Min temp
              {data.main ? <p>{data.main.temp_min} °C</p> : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default WeatherApp;
