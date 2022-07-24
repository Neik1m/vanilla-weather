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
  console.log(response.data);
  document.querySelector("#city-search").innerHTML = response.data.name;
  document.querySelector("#api-temp").innerHTML = Math.round(
    response.data.main.temp
  );
}

function search(event) {
  event.preventDefault();
  // let cityElement = document.querySelector("#searched-city");
  // let citySearch = document.querySelector("#city-input");
  // cityElement.innerHTML = citySearch.value;
  let city = document.querySelector("#city-input").value;
  let apiKey = "97b9838032fcdf9880d37346b3190f7d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

dateElement.innerHTML = formattedDate(currentTime);
