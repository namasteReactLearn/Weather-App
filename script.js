const API_KEY = "dab545f26cd72ab6887fbad26b3c7d38";
const WEATHER_API = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=`;

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".btn_search");
const weatherIcon = document.querySelector(".weather-icon");

const checkWeather = async (city) => {
  const apiData = await fetch(WEATHER_API + city + `&appid=${API_KEY}`);

  if (apiData.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".card").style.display = "none";
  } else {
    const data = await apiData.json();

    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "image/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "image/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "image/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "image/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "image/mist.png";
    }

    document.querySelector(".card").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
};

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
