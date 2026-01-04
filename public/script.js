// Ik heb geen "secret" voor de API key, hier zit geen security risico aan.
const API_KEY = '07de55c9b766f3d1164c540abe73bbbe';
const CITY = 'Tilburg';
const COUNTRY_CODE = 'NL';

// Huidig weer ophalen
async function fetchCurrentWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY_CODE}&appid=${API_KEY}&units=metric&lang=nl`
        );
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message || 'Kon weergegevens niet ophalen');
        }

        displayCurrentWeather(data);
    } catch (error) {
        console.error('Fout bij ophalen huidige weer:', error);
        document.getElementById('weather-info').innerHTML = `
            <p style="color: red;">Kon weergegevens niet ophalen: ${error.message}</p>
        `;
    }
}

// Voorspelling ophalen
async function fetchForecast() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY_CODE}&appid=${API_KEY}&units=metric&lang=nl&cnt=8`
        );
        const data = await response.json();

        if (data.cod !== '200') {
            throw new Error(data.message || 'Kon voorspelling niet ophalen');
        }

        displayForecast(data);
    } catch (error) {
        console.error('Fout bij ophalen voorspelling:', error);
        document.getElementById('forecast-container').innerHTML = `
            <p style="color: red;">Kon voorspelling niet ophalen: ${error.message}</p>
        `;
    }
}

// Huidig weer weergeven
function displayCurrentWeather(data) {
    const weatherInfo = document.getElementById('weather-info');

    const weather = data.weather[0];
    const iconUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

    weatherInfo.innerHTML = `
        <div class="weather-card">
            <div>
                <h2>${data.name}</h2>
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
    const forecastContainer = document.getElementById('forecast-container');
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