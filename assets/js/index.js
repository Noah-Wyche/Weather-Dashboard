const apiKey = '5918618550451b2731810039579e408d'; 
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');
const currentWeatherSection = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecast');
const searchHistorySection = document.getElementById('searchHistory');

searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const cityName = cityInput.value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          // Display current weather
          displayCurrentWeather(data);

          // Fetch 5-day forecast
          return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`);
      })
      .then(response => response.json())
      .then(data => {
          // Display 5-day forecast
          displayForecast(data);
          
          // Update search history
          updateSearchHistory(cityName);
      })
      .catch(error => {
          console.error('Error:', error);
      });
});

function displayCurrentWeather(data) {
  const currentWeatherContainer = document.getElementById('currentWeather');
  // Implement this function to update the current weather section
  const html = `
    <h2>${data.name}</h2>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <!-- You can add more information based on the API response -->
  `;
  currentWeatherContainer.innerHTML = html;
}

function displayForecast(data) {
  const forecastContainer = document.getElementById('forecast');
  // Implement this function to update the forecast section
  const forecastList = data.list;

  // Display the forecast for the next 5 days
  for (let i = 0; i < 5; i++) {
    const forecastData = forecastList[i];
    const html = `
      <div class="forecast-box">
        <p>Date: ${forecastData.dt_txt}</p>
        <p>Temperature: ${forecastData.main.temp} °C</p>
        <p>Humidity: ${forecastData.main.humidity}%</p>
        <p>Wind Speed: ${forecastData.wind.speed} m/s</p>
        <!-- You can add more information based on the API response -->
      </div>
    `;
    forecastContainer.innerHTML += html;
  }
}

function updateSearchHistory(cityName) {
 
}