function formattedDate(date) {
  let hours = date.getHours();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date-time");
let currentTime = new Date();

let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", search);

function showTemperature(response) {
  document.querySelector("#city-search").innerHTML = response.data.name;
  document.querySelector("#api-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "97b9838032fcdf9880d37346b3190f7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

dateElement.innerHTML = formattedDate(currentTime);

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "97b9838032fcdf9880d37346b3190f7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function currentTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let head = (document.querySelector("#api-temp").innerHTML = Math.round(
    response.data.main.temp
  ));
}

navigator.geolocation.getCurrentPosition(showPosition);

let currentLocationButton = document.querySelector("#button");
currentLocationButton.addEventListener("click", showTemperature);
