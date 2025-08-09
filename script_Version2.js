const API_KEY = "YOUR_API_KEY_HERE"; // <-- Replace with your OpenWeatherMap API key

const form = document.getElementById('search-form');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;
  showError(""); // Clear error
  weatherInfo.classList.add('hidden');
  try {
    const data = await getWeather(city);
    displayWeather(data);
  } catch (err) {
    showError("City not found or API error.");
  }
});

async function getWeather(city) {
  const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) throw new Error("API error");
  return response.json();
}

function displayWeather(data) {
  document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById('temperature').textContent = Math.round(data.main.temp);
  document.getElementById('description').textContent = capitalize(data.weather[0].description);
  document.getElementById('humidity').textContent = data.main.humidity;
  document.getElementById('wind').textContent = data.wind.speed;
  document.getElementById('weather-icon').src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  document.getElementById('weather-icon').alt = data.weather[0].main;

  weatherInfo.classList.remove('hidden');
}

function showError(msg) {
  errorMessage.textContent = msg;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}