let apiKey = "cfef58fe7390c0a2031a7807e6e4b184";
const input = document.querySelector(".search__input");
let city;
let api;
document.addEventListener("DOMContentLoaded", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccses, errorHandler)
    } else {
        alert("Your browser not support geolocation api ")
    }
});

function errorHandler() {
    alert("error");
}

function onSuccses(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

    dataFetch();
}
const searchBtn = document.querySelector(".search__btn"),
    temperature = document.querySelector(".content__degree"),
    titleCity = document.querySelector(".content__title"),
    humidity = document.querySelector(".content__humidity"),
    desc = document.querySelector(".content__descText"),
    speedWind = document.querySelector(".content__windSpeed"),
    icon = document.querySelector(".content__icon");

searchBtn.addEventListener("click", () => {
    if (input.value != "") {
        city = input.value;
        api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
            // fetch(api)
            //     .then((response => response.json()))
            //     .then((data => weatherDetails(data)));
        dataFetch();
    }
    input.value = "";
})


function dataFetch() {
    fetch(api)
        .then((response => response.json()))
        .then((data => weatherDetails(data)));
}

function weatherDetails(result) {
    if (result.cod == '404') {
        alert(city + " не найден")
    }
    console.log(result);
    temperature.innerHTML = Math.round(result.main.temp) + "°C";
    titleCity.innerHTML = `${result.name}, ${result.sys.country}`
    humidity.innerHTML = "Humidity: " + result.main.humidity + "%";
    desc.innerHTML = result.weather[0].description;
    icon.src = "./img/" + result.weather[0].icon + ".png";
    //icon.src = `http://openweathermap.org/img/wn/${result.weather[0].icon}.png`;
    speedWind.innerHTML = `Wind speed: ${result.wind.speed} km/h`;

}