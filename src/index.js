import "./style.css";
import { getWeather } from "./api.js";
function getFormattedDate(dateInput = new Date()) {
  const date = new Date(dateInput);
  const day = date.getDate();
  const options = { month: "short", weekday: "short" };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(date);

  const month = parts.find(part => part.type === "month").value;
  const weekday = parts.find(part => part.type === "weekday").value;

  return `${month} ${day}, ${weekday}`;
}


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weather-form");
  const input = document.getElementById("city-input");
  const location = document.getElementById("location");
  const temperature = document.getElementById("temperature");
  const temp_icon = document.getElementById("temperature-icon");
  const humidity = document.getElementById("humidity");
  const visibility = document.getElementById("visibility");
  const condition = document.getElementById("condition");
  const wind = document.getElementById("wind");
  const dateText = document.getElementById("my-date")


  async function loadWeather(city) {
    try {
      const data = await getWeather(city);
      location.textContent = `${data.location.name}, ${data.location.country}`;
      temperature.textContent = `${data.current.temp_c}°C`;
      temp_icon.src = `https:${data.current.condition.icon}`;
      temp_icon.alt = data.current.condition.text;
      humidity.textContent = `${data.current.humidity}%`;
      visibility.textContent = `${data.current.vis_km} km`;
      condition.textContent = data.current.condition.text;
      wind.textContent = `${data.current.wind_kph} km/h ${data.current.wind_dir}`;
      dateText.textContent = getFormattedDate(data.location.localtime)
      input.value = city;

    } catch (error) {
      console.error("Error", error);
      location.textContent = "City not found";
      temperature.textContent = "";
      temp_icon.src = "";
      humidity.textContent = "";
      visibility.textContent = "";
      condition.textContent = "";
      wind.textContent = "";
    }
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = input.value.trim();
    if (city) {
      loadWeather(city);
    }
  });

  loadWeather("London");
});

