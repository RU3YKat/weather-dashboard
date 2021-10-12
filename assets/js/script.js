var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city-input");
var cities = [];
var apiKey = "05e60bc8d4c87c37c95c7da73c943730";

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = cityInputEl
        .value
        .trim()
        // .replace(/\s/g, "")
        .toLowerCase();
    console.log(city);
    if (city) {
        getLatLon(city);
        // getTimeMachine(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a US city name.")
    };

    // use city to save search in localStorage
    saveCitySearch();
    // use city to apply to past search buttons in left column
    // pastCitySearch();
};

function saveCitySearch() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

var getLatLon = function(city) {
    // use current weather api to search lon, lat by city name
    var currentWeatherApi = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + apiKey;
        
    fetch(currentWeatherApi).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                var lat = data.coord['lat'];
                var lon = data.coord['lon'];
                console.log(lat,lon);
                displayCurrentWeather(city, lat, lon);
            });
        }
    });
};

function displayCurrentWeather(city, lat, lon) {
    var apiLatLon = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&units=imperial&appid=' + apiKey;
    fetch(apiLatLon).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {

                console.log(data);

                var currentCity = document.querySelector("#current-city");
                    currentCity.textContent = data.name
                    .replace(/\b\w/g, c => c.toUpperCase());
                    console.log(currentCity.textContent);

                var wiconEl = document.querySelector("#now-wicon");
                var currentWicon = data.weather[0].icon;
                var currentWiconUrl = 'https://openweathermap.org/img/wn/' + currentWicon + '@2x.png';
                
                console.log(currentWicon);
                console.log(currentWiconUrl);

                wiconEl.setAttribute('src', currentWiconUrl);
                wiconEl.setAttribute('alt', currentWicon);


            })
        }
    })
    
}

// var getTimeMachine = function(city) {
        
//     }

searchFormEl.addEventListener("submit", formSubmitHandler);