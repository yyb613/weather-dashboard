// Initialize Variables
var formEl = document.querySelector('#submitForm');
var date = document.querySelector('#date')

// Show date
date.textContent = moment().format('(M/D/YYYY)');

// API: Get coordinates
function getCoords(event) {
    event.preventDefault(); // Prevent Default

    var cityInput = document.querySelector("#cityInput").value; // City input from user
    var geoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&limit=1&appid=90f0812cb3a9247776512d212a21e74c';

    fetch(geoURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var lat = data[0].lat; // retrieve latitude
            var lon = data[0].lon; // retrieve longitude
            oneCallWeather(lat, lon, cityInput); // Call next API
        });
}

// API: Get current/upcoming weather
function oneCallWeather(lat, lon, cityInput) {
    var OneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&' + 'lon=' + lon + '&units=imperial&appid=90f0812cb3a9247776512d212a21e74c';

    fetch(OneCallUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (oneCallData) {

            console.log(oneCallData); // CONSOLE LOG

            var spanEl = document.querySelector("#cityName");
            spanEl.textContent = cityInput;

            var currentTemp = document.querySelector("#currentTemp");
            currentTemp.textContent = oneCallData.current.temp + '°F';

            var wind = document.querySelector("#wind");
            wind.textContent = oneCallData.current.wind_speed + ' MPH';

            var humidity = document.querySelector("#humidity");
            humidity.textContent = oneCallData.current.humidity + ' %';

            var uvI = document.querySelector('#uvI');
            var uviValue = oneCallData.current.uvi;
            uvI.textContent = oneCallData.current.uvi;

            if (uviValue <= 2) {
                uvI.setAttribute("class", "lowUvi");   // Low UVI
            } else if (uviValue >= 3 && uviValue <= 5) {
                uvI.setAttribute("class", "medUvi");   // Medium UVI
            } else if (uviValue === 6 || uviValue === 7) {
                uvI.setAttribute("class", "highUvi");  // High UVI
            } else if (uviValue >= 8 && uviValue <= 10) {
                uvI.setAttribute("class", "vHighUvi"); // Very High UVI
            } else if (uviValue >= 11) {
                uvI.setAttribute("class", "eHighUvi"); // Extremely High UVI
            }

            var cardDate1 = document.querySelector('#day-1 > #card-date');
            cardDate1.textContent = moment().add(1, 'days').format('M/D/YYYY');

            var cardDate2 = document.querySelector('#day-2 > #card-date');
            cardDate2.textContent = moment().add(2, 'days').format('M/D/YYYY');

            var cardDate3 = document.querySelector('#day-3 > #card-date');
            cardDate3.textContent = moment().add(3, 'days').format('M/D/YYYY');

            var cardDate4 = document.querySelector('#day-4 > #card-date');
            cardDate4.textContent = moment().add(4, 'days').format('M/D/YYYY');

            var cardDate5 = document.querySelector('#day-5 > #card-date');
            cardDate5.textContent = moment().add(5, 'days').format('M/D/YYYY');

            
            
            
          

        })
}

// Get coords when click 'Search'
formEl.addEventListener("click", getCoords);