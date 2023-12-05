const searchForm = document.getElementById('search-form');
const currentWeatherSection = document.getElementById('current-weather');
const forecastSection = document.getElementById('forecast');
const searchHistorySection = document.getElementById('search-history');

function fetchAndDisplayWeather() {
  const apiKey = '5918618550451b2731810039579e408d';
  const cityInput = document.getElementById('cityInput');
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const jsonString = JSON.stringify(data);
      console.log(jsonString);
      localStorage.setItem('weatherData', jsonString);
      displayWeatherData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayWeatherData(data) {
  const weatherContainer = document.getElementById('weather-container');
  const html = `
    <h2>${data.name}</h2>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Weather: ${data.weather[0].description}</p>
  `;
  weatherContainer.innerHTML = html;
}