var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-input");
var apiKey = "05e60bc8d4c87c37c95c7da73c943730";


var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl
        .value
        .trim();
    
    if (city) {
        getCurrentWeather(city);
        getTimeMachine(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a US city name.")
    };
    // use city to save search in localStorage
    // saveCitySearch();
    // use city to apply to past search buttons in left column
    // pastCitySearch();
};

var getCurrentWeather = function(city) {
    console.log(city);
    // get current weather by city name
    var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    console.log(currentWeatherApi);
    fetch(currentWeatherApi).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {

            })
        }
    })
}

var getTimeMachine = function(city) {
    var getLatLong = function(city) {
        
    }
}

searchFormEl.addEventListener("submit", formSubmitHandler);