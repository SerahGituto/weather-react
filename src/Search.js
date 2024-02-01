import React, { useState } from "react";
import axios from "axios";
import "./Search.css";
import FormattedDate from "./FormattedDate";
import WeatherUnit from "./WeatherUnit";
import Icon from "./Icon";

export default function Search(props) {
  const [message, setMessage] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  function updateCity(event) {
    setCity(event.target.value);
  }

  function displayWeather(response) {
    setMessage({
      ready: true,
      city: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      date: new Date(response.data.dt * 1000),
      icon: response.data.weather[0].icon,
    });
  }

  function weatherSearch() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7784a4cd4aa2e0c25ead7bd96d585b8a&units=metric`;
    axios.get(url).then(displayWeather);
  }

  function handleSumbit(event) {
    event.preventDefault();
    weatherSearch();
  }

  if (message.ready) {
    return (
      <div className="search">
        <div className="container">
          <form onSubmit={handleSumbit}>
            <input
              type="text"
              placeholder="Type City..."
              onChange={updateCity}
            />
            <button value="submit">Submit</button>
          </form>
          <br />
          <h2>{message.city}</h2>

          <Icon code={message.icon} />

          <WeatherUnit temperature={message.temperature} />

          <ul>
            <li>
              <FormattedDate date={message.date} />{" "}
            </li>
            <li>Wind:{Math.round(message.wind)}km|hr </li>
            <li> Humidity:{Math.round(message.humidity)}%</li>
            <li> Description:{message.description}</li>
          </ul>
        </div>
      </div>
    );
  } else {
    weatherSearch();
    return "loading....";
  }
}
