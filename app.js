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

function findMyCity(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#my-city");
  console.log(cityInput.value);

  // note : create a new variable to "contain" the form input, trim it. Create a new variable to set uppercase and lowercase
  let cityName = cityInput.value.trim();
  let capitalisedCityName =
    cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
  // end

  let newCity = document.querySelector("#current-city");
  newCity.innerHTML = `${capitalisedCityName}`;

  fetchCityTemp(capitalisedCityName);
  showLocation(position);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", findMyCity);

// Display the temperature of the searched city

function fetchCityTemp(capitalisedCityName) {
  let apiKey = "b400ae3b711a616262d18b0ca2cbe78f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitalisedCityName}&units=metric`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCityTemp);
}

function showCityTemp(response) {
  //console.log(response.data.main.temp);

  let temp = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#current-temp");

  tempElement.innerHTML = `${temp}`;
}

// Location button -- UNFINISHED

function showLocation(position) {
  // console.log(position);
  let lat = position.coords.latitude;
  let long = position.coords.longitude;

  let myLocation = document.querySelector("#current-city");
  myLocation.innerHTML = `${lat}, ${long}`;
}

function showCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("#location-button");
button.addEventListener("click", showCurrentLocation);

searchCity("Manila");
