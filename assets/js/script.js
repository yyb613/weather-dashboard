// Initialize Variables
var formEl = document.querySelector('#submitForm'); // Search button
var dateEl = document.querySelector('#date')        // Date span
var historyEl = document.querySelector('#history'); // Search history div

// Show date in current weather
dateEl.textContent = moment().format('(M/D/YYYY)');

// API: Get coordinates
function getCoords(event) {
    event.preventDefault(); // Prevent Default

    var cityInput = document.querySelector("#cityInput").value; // City input from user

    if (cityInput == '') {                    // if no input...
        cityInput = event.target.textContent; // it's a history click
    }
    
    var geoURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityInput + '&limit=1&appid=90f0812cb3a9247776512d212a21e74c'; // URL

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
    var OneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&' + 'lon=' + lon + '&units=imperial&appid=90f0812cb3a9247776512d212a21e74c'; // URL

    fetch(OneCallUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (oneCallData) {

            /* console.log(oneCallData); // CONSOLE LOG */

            var cityName = document.querySelector("#cityName");       // City
            cityName.textContent = cityInput;

            var icon = document.querySelector("#icon");               // Icon
            var iconImg = document.createElement("img");
            var iconCode = oneCallData.current.weather[0].icon;
            var iconURL = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
            iconImg.src = iconURL;
            icon.innerHTML = '';
            icon.appendChild(iconImg);
            
            var currentTemp = document.querySelector("#currentTemp"); // Temp
            currentTemp.textContent = oneCallData.current.temp + '°F';

            var wind = document.querySelector("#wind");               // Wind
            wind.textContent = oneCallData.current.wind_speed + ' MPH';

            var humidity = document.querySelector("#humidity");       // Humidity
            humidity.textContent = oneCallData.current.humidity + ' %';

            var uvI = document.querySelector('#uvI');                 // UV Index
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

            // UPCOMING WEATHER
            // Day 1
            var cardDate1 = document.querySelector('#day-1 > .card-date');      // Date
            cardDate1.textContent = moment().add(1, 'days').format('M/D/YYYY');
            var cardIcon1 = document.querySelector('#day-1 > .card-icon');      // Icon
            var iconImg1 = document.createElement("img");
            var iconCode = oneCallData.daily[1].weather[0].icon;
            var iconURL = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
            iconImg1.src = iconURL;
            cardIcon1.innerHTML = '';
            cardIcon1.appendChild(iconImg1);
            var cardTemp1 = document.querySelector('#day-1 > .card-temp');      // Temp
            cardTemp1.textContent = 'Temp: ' + oneCallData.daily[1].temp.day + '°F';
            var cardWind1 = document.querySelector('#day-1 > .card-wind');      // Wind
            cardWind1.textContent = 'Wind: ' + oneCallData.daily[1].wind_speed + ' MPH';
            var cardHumid1 = document.querySelector('#day-1 > .card-humidity'); // Humidity
            cardHumid1.textContent = 'Humidity: ' + oneCallData.daily[1].humidity + '%';
            
            // Day 2
            var cardDate2 = document.querySelector('#day-2 > .card-date');      // Date
            cardDate2.textContent = moment().add(2, 'days').format('M/D/YYYY');
            var cardIcon2 = document.querySelector('#day-2 > .card-icon');      // Icon
            var iconImg2 = document.createElement("img");
            var iconCode = oneCallData.daily[2].weather[0].icon;
            var iconURL = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
            iconImg2.src = iconURL;
            cardIcon2.innerHTML = '';
            cardIcon2.appendChild(iconImg2);
            var cardTemp2 = document.querySelector('#day-2 > .card-temp');      // Temp
            cardTemp2.textContent = 'Temp: ' + oneCallData.daily[2].temp.day + '°F';
            var cardWind2 = document.querySelector('#day-2 > .card-wind');      // Wind
            cardWind2.textContent = 'Wind: ' + oneCallData.daily[2].wind_speed + ' MPH';
            var cardHumid2 = document.querySelector('#day-2 > .card-humidity'); // Humidity
            cardHumid2.textContent = 'Humidity: ' + oneCallData.daily[2].humidity + '%';
            
            // Day 3
            var cardDate3 = document.querySelector('#day-3 > .card-date');       // Date
            cardDate3.textContent = moment().add(3, 'days').format('M/D/YYYY');
            var cardIcon3 = document.querySelector('#day-3 > .card-icon');       // Icon
            var iconImg3 = document.createElement("img");
            var iconCode = oneCallData.daily[3].weather[0].icon;
            var iconURL = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
            cardIcon3.innerHTML = '';
            iconImg3.src = iconURL;
            cardIcon3.appendChild(iconImg3);
            var cardTemp3 = document.querySelector('#day-3 > .card-temp');       // Temp
            cardTemp3.textContent = 'Temp: ' + oneCallData.daily[3].temp.day + '°F';
            var cardWind3 = document.querySelector('#day-3 > .card-wind');       // Wind
            cardWind3.textContent = 'Wind: ' + oneCallData.daily[3].wind_speed + ' MPH';
            var cardHumid3 = document.querySelector('#day-3 > .card-humidity');  // Humidity
            cardHumid3.textContent = 'Humidity: ' + oneCallData.daily[3].humidity + '%';
            
            // Day 4
            var cardDate4 = document.querySelector('#day-4 > .card-date');       // Date
            cardDate4.textContent = moment().add(4, 'days').format('M/D/YYYY');
            var cardIcon4 = document.querySelector('#day-4 > .card-icon');       // Icon
            var iconImg4 = document.createElement("img");
            var iconCode = oneCallData.daily[4].weather[0].icon;
            var iconURL = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
            iconImg4.src = iconURL;
            cardIcon4.innerHTML = '';
            cardIcon4.appendChild(iconImg4);            
            var cardTemp4 = document.querySelector('#day-4 > .card-temp');       // Temp
            cardTemp4.textContent = 'Temp: ' + oneCallData.daily[4].temp.day + '°F';
            var cardWind4 = document.querySelector('#day-4 > .card-wind');       // Wind
            cardWind4.textContent = 'Wind: ' + oneCallData.daily[4].wind_speed + ' MPH';
            var cardHumid4 = document.querySelector('#day-4 > .card-humidity');  // Humidity
            cardHumid4.textContent = 'Humidity: ' + oneCallData.daily[4].humidity + '%';
            
            // Day 5
            var cardDate5 = document.querySelector('#day-5 > .card-date');       // Date
            cardDate5.textContent = moment().add(5, 'days').format('M/D/YYYY');
            var cardIcon5 = document.querySelector('#day-5 > .card-icon');       // Icon
            var iconImg5 = document.createElement("img");
            var iconCode = oneCallData.daily[5].weather[0].icon;
            var iconURL = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png';
            cardIcon5.innerHTML = '';
            iconImg5.src = iconURL;
            cardIcon5.appendChild(iconImg5);
            var cardTemp5 = document.querySelector('#day-5 > .card-temp');       // Temp
            cardTemp5.textContent = 'Temp: ' + oneCallData.daily[5].temp.day + '°F';
            var cardWind5 = document.querySelector('#day-5 > .card-wind');       // Wind
            cardWind5.textContent = 'Wind: ' + oneCallData.daily[5].wind_speed + ' MPH';
            var cardHumid5 = document.querySelector('#day-5 > .card-humidity');  // Humidity
            cardHumid5.textContent = 'Humidity: ' + oneCallData.daily[5].humidity + '%';
        })


    // SAVE SEARCH HISTORY
    citiesArray.unshift(cityInput);                    // push entered city to array
    if (citiesArray.length > 8) {                      // if array length > 8...
        citiesArray.splice(citiesArray.length - 1, 1); // remove last element
    } 
    var citiesString = JSON.stringify(citiesArray);    // convert array -> string
    localStorage.setItem("cities", citiesString);      // push to Local Storage

    // APPEND SEARCH HISTORY
    appendCities();
}

// LOAD SEARCH HISTORY
var citiesArray = JSON.parse(localStorage.getItem("cities")) || []; // get from Local History
                                                                    // (or create empty array)
// Append Search History Function
function appendCities() {
    historyEl.innerHTML = '';         // reset history
    for (var i = 0; i < citiesArray.length; i++) {
        var historyBtn = document.createElement("button");     // create button
        historyBtn.textContent = citiesArray[i];               // inject city from array
        historyBtn.setAttribute("class", "row history-btn");   // set class
        historyBtn.addEventListener("click", function(event) { // (upon click...)
            event.preventDefault();                            // Prevent Default
            document.querySelector("#cityInput").value = '';   // reset input field
            getCoords(event);         // call first API
        });
        historyEl.append(historyBtn); // append to history
    }
}

// APPEND SEARCH HISTORY
appendCities();

// Get coordinates when click 'Search'
formEl.addEventListener("click", getCoords);