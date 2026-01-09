// API key voor OpenWeatherMap (let op: in productie moet dit beter beveiligd worden)
const API_KEY = '07de55c9b766f3d1164c540abe73bbbe';

// Standaard locatie instellen
let currentCity = 'Tilburg';
let currentCountryCode = 'NL';

// DOM elementen ophalen
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const forecastContainer = document.getElementById('forecast-container');

// Event listener voor zoekknop
searchBtn.addEventListener('click', () => {
    const inputValue = locationInput.value.trim();
    if (inputValue) {
        // Splits de input in stad en landcode (bijv. "Amsterdam, NL")
        const parts = inputValue.split(',').map(part => part.trim());
        currentCity = parts[0];
        currentCountryCode = parts.length > 1 ? parts[1] : 'NL'; // Standaard NL als geen landcode is opgegeven

        // Haal nieuwe weergegevens op
        fetchCurrentWeather();
        fetchForecast();
    } else {
        alert('Voer een geldige locatie in');
    }
});

// Enter is ook doorgaan in plaats van muisklikken
locationInput.addEventListener('keydown', (event) => { //event = als er iets gebeurd in de browser
    if (event.key === 'Enter') {
        event.preventDefault();  //formulier submitten, pagina niet herladen, JavaScript (fetchCurrentWeather()) draait
        searchBtn.click();
    }
});

// Huidig weer ophalen
async function fetchCurrentWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${currentCity},${currentCountryCode}&appid=${API_KEY}&units=metric&lang=nl`
        );
        const data = await response.json();

        // Controleer of de API een foutmelding teruggeeft
        if (data.cod !== 200) {
            throw new Error(data.message || 'Kon weergegevens niet ophalen');
        }

        displayCurrentWeather(data);
    } catch (error) {
        console.error('Fout bij ophalen huidige weer:', error);
        weatherInfo.innerHTML = `
            <p style="color: red;">Kon weergegevens niet ophalen: ${error.message}</p>
            <p>Controleer of de locatie correct is ingevuld (bijv. "Amsterdam, NL")</p>
        `;
    }
}

// Voorspelling ophalen
async function fetchForecast() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity},${currentCountryCode}&appid=${API_KEY}&units=metric&lang=nl&cnt=8`
        );
        const data = await response.json();

        if (data.cod !== '200') {
            throw new Error(data.message || 'Kon voorspelling niet ophalen');
        }

        displayForecast(data);
    } catch (error) {
        console.error('Fout bij ophalen voorspelling:', error);
        forecastContainer.innerHTML = `
            <p style="color: red;">Kon voorspelling niet ophalen: ${error.message}</p>
        `;
    }
}

// Huidig weer weergeven
function displayCurrentWeather(data) {
    const weather = data.weather[0];
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

    weatherInfo.innerHTML = `
        <div class="weather-card">
            <div>
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>${Math.round(data.main.temp)}°C</p>
                <p>${weather.description}</p>
                <p>Vochtigheid: ${data.main.humidity}%</p>
                <p>Wind: ${Math.round(data.wind.speed * 3.6)} km/h</p>
            </div>
            <img src="${iconUrl}" alt="${weather.description}" class="weather-icon">
        </div>
    `;
}

// Voorspelling weergeven
function displayForecast(data) {
    forecastContainer.innerHTML = '<h2>Voorspelling voor de komende uren</h2>';

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const time = date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' });
        const weather = item.weather[0];
        const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}.png`;

        forecastContainer.innerHTML += `
            <div class="forecast-item">
                <span class="forecast-time">${time}</span>
                <span class="forecast-desc">${weather.description}</span>
                <span class="forecast-temp">${Math.round(item.main.temp)}°C</span>
                <img src="${iconUrl}" alt="${weather.description}" class="weather-icon">
            </div>
        `;
    });
}

// Initialisatie
document.addEventListener('DOMContentLoaded', () => {
    fetchCurrentWeather();
    fetchForecast();
});