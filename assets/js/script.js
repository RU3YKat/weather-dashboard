var citySearchEl = document.querySelector("#city-search");

var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log("yes!")
};

citySearchEl.addEventListener("submit", formSubmitHandler);