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

function showCityTemp(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;

  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind-speed").innerHTML = response.data.wind.speed;
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${apiUrl}`).then(showCityTemp);
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", displayCurrentLocation);

search("Manila");
