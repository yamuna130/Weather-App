const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

function getWeather() {
    const location = document.getElementById('locationInput').value;
    const weatherData = document.getElementById('weatherData');

    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    weatherData.innerHTML = `
                        <h3>${data.name}, ${data.sys.country}</h3>
                        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                    `;
                } else {
                    weatherData.innerHTML = `<p>${data.message}</p>`;
                }
            })
            .catch(error => {
                weatherData.innerHTML = `<p>Error fetching data</p>`;
            });
    } else {
        weatherData.innerHTML = `<p>Please enter a location.</p>`;
    }
}

// Automatically fetch weather data based on user's location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if (data.cod === 200) {
                    document.getElementById('weatherData').innerHTML = `
                        <h3>${data.name}, ${data.sys.country}</h3>
                        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
                        <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
                        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                        <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                    `;
                } else {
                    document.getElementById('weatherData').innerHTML = `<p>${data.message}</p>`;
                }
            })
            .catch(error => {
                document.getElementById('weatherData').innerHTML = `<p>Error fetching data</p>`;
            });
    }, () => {
        document.getElementById('weatherData').innerHTML = `<p>Unable to retrieve your location</p>`;
    });
}
