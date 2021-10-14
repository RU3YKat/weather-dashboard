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
        cityInputEl.value = '';
    } else {
        alert('Please enter a US city name.')
    };
    // use city to save search in localStorage
    saveCitySearch();
    // use city to apply to past search buttons in left column
    // pastCitySearch();
};

function saveCitySearch() {
    localStorage.setItem('cities', JSON.stringify(cities));
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
                // show current city, edited to capitalize first letters with regexp
                var currentCity = document.querySelector("#current-city");
                    currentCity.textContent = data.name
                    .replace(/\b\w/g, c => c.toUpperCase());
                    console.log(currentCity.textContent);

                // define and add current weather icon
                var wiconEl = document.querySelector("#now-wicon");
                var currentWicon = data.weather[0].icon;
                var currentWiconUrl = 'https://openweathermap.org/img/wn/' + currentWicon + '@2x.png';

                wiconEl.setAttribute('src', currentWiconUrl);
                wiconEl.setAttribute('alt', currentWicon);

                // define and add current temp in F
                var tempEl = document.querySelector('#current-temp');
                var roundTemp = data.main.temp;
                tempEl.textContent = Math.round(roundTemp);

                // define and add current winds
                var windEl = document.querySelector('#wind');
                var roundWind = data.wind.speed;
                windEl.textContent = Math.round(roundWind);

                // define and add current humidity
                var humidityEl = document.querySelector('#humidity');
                humidityEl.textContent = data.main.humidity;

                // define and add UV index
                // define options(cases) for color indicator
                

                showHiddenEl();
            })
        }
    })
};

function showHiddenEl() {
    var hiddenEl = document.querySelector('#hide');
    hiddenEl.classList.remove('d-none');
}

searchFormEl.addEventListener('submit', formSubmitHandler);

// use ENTER key to trigger searchFormEl
searchFormEl.addEventListener('keyup', function(event) {
    if (event.keycode == 13) {
        searchFormEl.click();
    }
})
