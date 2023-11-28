const apiUrl = api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={5918618550451b2731810039579e408d}
const outputElement = document.getElementById('output');

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  })