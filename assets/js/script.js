// API for getting coordinates
var cityState = 'Great Neck, New York'; // get value from user form
var formEl = document.querySelector("#submitForm");

function getCoords(event) {
    event.preventDefault();

    var cityInput = document.querySelector("#cityInput").value;
    var geoURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&limit=1&appid=90f0812cb3a9247776512d212a21e74c';
    fetch(geoURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            oneCallWeather(lat, lon, cityInput);
        });
}

function oneCallWeather(lat, lon, cityInput) {
    var OneCallUrl = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&' + 'lon=' + lon + '&appid=90f0812cb3a9247776512d212a21e74c';
    fetch(OneCallUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (oneCallData) {
            console.log(oneCallData); // CONSOLE LOG
            var spanEl = document.querySelector("#cityName");
            spanEl.textContent = cityInput;
            var currentTemp = document.querySelector("#currentTemp");
            currentTemp.textContent = oneCallData.current.temp;
            var humidity = document.querySelector("#humidity");
            humidity.textContent = oneCallData.current.humidity + ' %';
            var uvI = document.querySelector('#uvI');
            var uviValue = oneCallData.current.uvi;
            uvI.textContent = oneCallData.current.uvi;
            if (uviValue <= 2) {
                uvI.setAttribute("class", "lowUvi");
            }
        })
}

formEl.addEventListener("click", getCoords)