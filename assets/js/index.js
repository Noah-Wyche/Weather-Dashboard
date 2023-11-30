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
 
}

function displayForecast(data) {
 
}

function updateSearchHistory(cityName) {
 
}