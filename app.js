let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationCity = document.querySelector(".location-city");
let weatherIcon = document.querySelector("#wicon");
let degreeSection = document.querySelector(".temperature");
let degreeSpan = document.querySelector(".temperature span");

async function getWeatherInformation(API) {
  const response = await fetch(API);
  const data = await response.json();

  const { temp } = data.main;
  const { main, icon } = data.weather[0];
  temperatureDegree.textContent = temp;
  temperatureDescription.textContent = main;
  degreeSpan.textContent = "F";
  locationCity.textContent = data.name;

  weatherIcon.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" + icon + "@4x.png"
  );
}

degreeSection.addEventListener("click", () => {
  let temp = parseFloat(temperatureDegree.innerHTML);

  if (degreeSpan.textContent === "F") {
    let celsius = (temp - 32) * (5 / 9);
    degreeSpan.textContent = "C";
    temperatureDegree.textContent = celsius.toFixed(2);
  } else {
    let fahrenheit = temp * 1.8 + 32;
    degreeSpan.textContent = "F";
    temperatureDegree.textContent = fahrenheit.toFixed(2);
  }
});

window.addEventListener("load", () => {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const WEATHER_API = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=52ad9e2c79809baae53a45661153086a`;
      getWeatherInformation(WEATHER_API);
    });
  }
});

let getCityWeather = document.getElementById("submit-button");

getCityWeather.addEventListener("click", () => {
  let cityName = document.getElementById("city-name").value;
  console.log(cityName);
  const CITY_API = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=52ad9e2c79809baae53a45661153086a`;
  getWeatherInformation(CITY_API);
});
