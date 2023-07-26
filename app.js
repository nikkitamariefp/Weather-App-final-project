// Feature 1 — display current date and time
function displayCurrentDateAndTime() {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let date = now.getDate();
  let year = now.getFullYear();

  let hour = now.getHours(); // 24-hour format
  let mins = now.getMinutes();
  let twoDigitMin = ("0" + mins).slice(-2);

  let amOrPm = hour >= 12 ? "pm" : "am";
  let hours = hour % 12 || 12;

  let currentDateAndTime = document.querySelector("#current-date-time");
  currentDateAndTime.innerHTML = `${month} ${date}, ${year} <br>${hours}:${twoDigitMin} ${amOrPm}`;

  let currentDay = document.querySelector("#current-day");
  currentDay.innerHTML = `${day}`;
}

// Call the function to display the current date and time
displayCurrentDateAndTime();

// Feature 2 - display the searched city name on the page after the user submits

function search(city) {
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showCityTemp);
}

function handleSubmit(event) {
  event.preventDefault();

  let city = document.querySelector("#city-input").value;
  search(city);
}

function getForecast(coordinates) {
  let apiKey = "b35c686ba9565ba0ab254c2230937552";

  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function showCityTemp(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description.charAt(0).toUpperCase() +
    response.data.weather[0].description.slice(1);
  document
    .querySelector("#main-icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showCityTemp);

  displayForecast();
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    FahrenheitTemperature
  );
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#current-temperature").innerHTML =
    Math.round(celsiusTemperature);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div
                class="card mb-4 weather-forecast"
                style="max-width: 540px;">
                <div class="row g-0">
        <div class="col-md-4">
            <div class="card-body">
                <small class="text-body-secondary next-day">
                    ${day} 32°C
                    <div class="next-date">05/22/2023</div>
                </small>
            </div>
        </div>
        <div class="col-md-4">
            <p class="icon">🌤️</p>
        </div>
    </div>
    </div>  
    `;
  });

  forecastElement.innerHTML = forecastHTML;
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", displayCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);

let celsiusTemperature = null;

search("Manila");
