const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  fetchAndDisplayWeather();
});

const currentWeatherSection = document.getElementById('current-weather');
const forecastSection = document.getElementById('forecast');
const searchHistorySection = document.getElementById('search-history');

function fetchAndDisplayWeather() {
  const apiKey = '5918618550451b2731810039579e408d';
  const cityInput = document.getElementById('cityInput');
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}`;

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
      saveSearchHistory(cityInput.value);
      displayWeatherData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function displayWeatherData(data) {
  const cityName = data.city.name;
  const weatherList = data.list;

  // Group data by day
  const groupedData = groupDataByDay(weatherList);

  // Display today's weather information
  const currentWeatherContainer = document.getElementById('current-weather');
  const todayData = groupedData[Object.keys(groupedData)[0]] || []; // Check if there's data for today

  if (todayData.length > 0) {
    const todayTemperatureKelvin = todayData[0].main.temp;
    const todayHumidity = todayData[0].main.humidity;
    const todayWindSpeed = todayData[0].wind.speed;
    const todayWeatherIcon = todayData[0].weather[0].icon;

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const todayTemperatureCelsius = convertKelvinToCelsius(todayTemperatureKelvin);

    const currentWeatherHtml = `
      <h2>${cityName} - ${formattedDate}</h2>
      <img src="http://openweathermap.org/img/w/${todayWeatherIcon}.png" alt="Weather Icon">
      <p>Temperature: ${todayTemperatureCelsius.toFixed(2)} °C</p>
      <p>Humidity: ${todayHumidity.toFixed(2)} %</p>
      <p>Wind Speed: ${todayWindSpeed.toFixed(2)} m/s</p>
    `;

    currentWeatherContainer.innerHTML = currentWeatherHtml;
  } else {
    currentWeatherContainer.innerHTML = '<p>No data available for today.</p>';
  }

  // Display forecast information for the next 4 days
  const forecastContainer = document.getElementById('forecast');
  const forecastHtml = Object.values(groupedData)
    .slice(1, 5) // Get data for the next 4 days
    .map(dayGroup => {
      const averageTemperatureKelvin = calculateAverage(dayGroup.map(entry => entry.main.temp));
      const averageHumidity = calculateAverage(dayGroup.map(entry => entry.main.humidity));
      const averageWindSpeed = calculateAverage(dayGroup.map(entry => entry.wind.speed));
      const weatherIcon = dayGroup[0].weather[0].icon;

      const averageTemperatureCelsius = convertKelvinToCelsius(averageTemperatureKelvin);


      return `
        <div class="forecast-box">
          <p>${formatDate(new Date(dayGroup[0].dt * 1000))}</p>
          <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="Weather Icon">
          <p> Avg Temp: ${averageTemperatureCelsius.toFixed(2)} °C</p>
          <p> Avg Humidity: ${averageHumidity.toFixed(2)} %</p>
          <p> Wind Speed: ${averageWindSpeed.toFixed(2)} m/s</p>
        </div>
      `;
    })
    .join('');

  forecastContainer.innerHTML = forecastHtml;

  updateSearchHistory();
}

// Function to save search history to local storage
function saveSearchHistory(city) {
  let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  if (!searchHistory.includes(city)) {
    searchHistory.unshift(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }
}

// Function to update the search history section
function updateSearchHistory() {
  const searchHistorySection = document.getElementById('search-history-container');
  
  if (!searchHistorySection) {
    console.error('Search history section not found.');
    return;
  }

  const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
  const historyHtml = searchHistory.map(city => `<button onclick="searchHistoryClicked('${city}')">${city}</button>`).join('');
  
  searchHistorySection.innerHTML = `<h3>Search History</h3>${historyHtml}`;
}


// Function to handle search history button click
function searchHistoryClicked(city) {
  document.getElementById('cityInput').value = city;
  fetchAndDisplayWeather();
}

// Function to convert Kelvin to Celsius
function convertKelvinToCelsius(kelvin) {
  return kelvin - 273.15;
}

// Function to group data by day
function groupDataByDay(data) {
  return data.reduce((result, entry) => {
    const date = new Date(entry.dt * 1000).toLocaleDateString();
    (result[date] = result[date] || []).push(entry);
    return result;
  }, {});
}

// Function to calculate average of an array of values
function calculateAverage(values) {
  const sum = values.reduce((acc, value) => acc + value, 0);
  return sum / values.length;
}

// Function to format a date as a string
function formatDate(date) {
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}
