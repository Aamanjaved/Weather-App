const apiKey = '238b7afa7a1adbfcccbb4fa4a086858d'; // Replace with your OpenWeatherMap API key
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const temperature = document.querySelector(".temp");
const summary = document.querySelector(".summary");
const loc = document.querySelector(".location");
const icon = document.querySelector(".icon");

getWeatherBtn.addEventListener("click", () => {
    const city = cityInput.value;
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    const base = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    fetch(base)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                updateUI(data);
            } else {
                alert("City not found");
            }
        })
        .catch(error => console.error("Error fetching weather data:", error));
}

function updateUI(data) {
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    summary.textContent = data.weather[0].description;
    loc.textContent = `${data.name}, ${data.sys.country}`;
    const icon1 = data.weather[0].icon;
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon1}.png" alt="Weather Icon">`;
}