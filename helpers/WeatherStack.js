// triggers calls to Weatherstack API on click of 'submit' button
document.getElementById("findFlights").addEventListener('click', function () {
    // origin location weather call
    const data = null;
    // origin location weather call, or a random index from the airportData
    const originLocation = originData || airportData[Math.floor(Math.random() * Math.floor(300))];
    const xhrOriginWeatherStack = new XMLHttpRequest();

    //let queryStringOrigin = "https://api.weatherstack.com/current" + "?access_key=" + WeatherstackKey + "&query=" + originLocation.city + ", " + originLocation.state;
    let queryStringOrigin = "https://forecast.weather.gov/MapClick.php?lat=" + originLocation.lat + "&lon=" + originLocation.lon + "&unit=0&lg=english&FcstType=dwml";
    //A point forecast is unavailable for the requested location
    //https://forecast.weather.gov/MapClick.php?lat=47.1715&lon=8.51622&unit=0&lg=english&FcstType=dwml
    // xhrOriginWeatherStack.withCredentials = true;

    xhrOriginWeatherStack.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let parser = new DOMParser();

            document.getElementById('originWeatherCity').innerHTML = originLocation.city + ", " + originLocation.state; // + ", " + originLocation.country;

            //<title>Forecast Error</title><meta name="title" content="Forecast Error" />
            if (this.responseText.includes("<title>Forecast Error</title>")) {
                //Error with forecast
                document.getElementById('originWeatherIcon').setAttribute('alt', '');
                document.getElementById('originWeatherDesc').innerHTML = '';
                document.getElementById('originWeatherIcon').setAttribute('src', '');
                document.getElementById('originWeatherTemp').innerHTML = '';
                return;
            }

            let xmlDoc = parser.parseFromString(this.responseText, "text/xml");
            let currentObservation = xmlDoc.querySelectorAll('[type="current observations"]')[0];
            currentObservation = currentObservation.getElementsByTagName('parameters')[0];
            let currentTemp = currentObservation.querySelectorAll('[type="apparent"]')[0].getElementsByTagName('value')[0].innerHTML;
            let currentCondIcon = currentObservation.getElementsByTagName('conditions-icon')[0].getElementsByTagName('icon-link')[0].innerHTML;
            let currentCondDesc = currentObservation.getElementsByTagName('weather')[0].getElementsByTagName('weather-conditions')[0].getAttribute('weather-summary');

            if (xhrOriginWeatherStack.status === 0 || xhrOriginWeatherStack.status === 200) {
                document.getElementById('originWeatherIcon').setAttribute('alt', currentCondDesc);
                document.getElementById('originWeatherDesc').innerHTML = "Currently: " + currentCondDesc;
                if (!currentCondIcon || currentCondIcon == 'NULL') {
                    document.getElementById('originWeatherIcon').setAttribute('src', '');
                }
                else {
                    document.getElementById('originWeatherIcon').setAttribute('src', currentCondIcon);
                }
                document.getElementById('originWeatherTemp').innerHTML = currentTemp + "&#176;" + "F";
            }
            else {
                document.getElementById('originWeatherDesc').innerHTML = "Error retrieving weather data";
                document.getElementById('originWeatherTemp').innerHTML = "";
                document.getElementById('originWeatherIcon').remove();
            }
        }
    });
    xhrOriginWeatherStack.open("GET", queryStringOrigin);
    // xhrOriginWeatherStack.setRequestHeader("access_key", WeatherstackKey);
    xhrOriginWeatherStack.send(data);

    // destination location weather call, or a random index from the airportData
    const destinationLocation = destinationData || airportData[Math.floor(Math.random() * Math.floor(300))];
    const xhrDestinationWeatherStack = new XMLHttpRequest();

    destinationLocation.lat;
    destinationLocation.lon;

    //let queryStringDestination = "https://api.weatherstack.com/current" + "?access_key=" + WeatherstackKey + "&query=" + destinationLocation.city + ", " + destinationLocation.state;
    let queryStringDestination = "https://forecast.weather.gov/MapClick.php?lat=" + destinationLocation.lat + "&lon=" + destinationLocation.lon + "&unit=0&lg=english&FcstType=dwml";
    // xhrDestinationWeatherStack.withCredentials = true;
    xhrDestinationWeatherStack.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let parser = new DOMParser();

            document.getElementById('destWeatherCity').innerHTML = destinationLocation.city + ", " + destinationLocation.state; // + ", " + destinationLocation.country;

            //<title>Forecast Error</title><meta name="title" content="Forecast Error" />
            if (this.responseText.includes("<title>Forecast Error</title>")) {
                //Error with forecast
                document.getElementById('destWeatherIcon').setAttribute('alt', '');
                document.getElementById('destWeatherDesc').innerHTML = '';
                document.getElementById('destWeatherIcon').setAttribute('src', '');
                document.getElementById('destWeatherTemp').innerHTML = '';
                return;
            }

            let xmlDoc = parser.parseFromString(this.responseText, "text/xml");
            let currentObservation = xmlDoc.querySelectorAll('[type="current observations"]')[0];
            currentObservation = currentObservation.getElementsByTagName('parameters')[0];
            let currentTemp = currentObservation.querySelectorAll('[type="apparent"]')[0].getElementsByTagName('value')[0].innerHTML;
            let currentCondIcon = currentObservation.getElementsByTagName('conditions-icon')[0].getElementsByTagName('icon-link')[0].innerHTML;
            let currentCondDesc = currentObservation.getElementsByTagName('weather')[0].getElementsByTagName('weather-conditions')[0].getAttribute('weather-summary');

            if (xhrDestinationWeatherStack.status === 0 || xhrDestinationWeatherStack.status === 200) {

                document.getElementById('destWeatherIcon').setAttribute('alt', currentCondDesc);
                document.getElementById('destWeatherDesc').innerHTML = "Currently: " + currentCondDesc;
    
                if (!currentCondIcon || currentCondIcon === 'NULL') {
                    document.getElementById('destWeatherIcon').setAttribute('src', '');
                }
                else {
                    document.getElementById('destWeatherIcon').setAttribute('src', currentCondIcon);
                }
                document.getElementById('destWeatherTemp').innerHTML = currentTemp + "&#176;" + "F";
            }
            else {
                document.getElementById('destWeatherDesc').innerHTML = "Error retrieving weather data";
                document.getElementById('destWeatherTemp').innerHTML = "";
                document.getElementById('destWeatherIcon').remove();
            }
            
            // hide weather containers on page load
            document.getElementsByClassName("destinationWeather")[0].setAttribute('style', "display: block;");
            document.getElementsByClassName("originWeather")[0].setAttribute('style', "display: block;");
        }
    });
    xhrDestinationWeatherStack.open("GET", queryStringDestination);
    // xhrDestinationWeatherStack.setRequestHeader("access_key", WeatherstackKey);
    xhrDestinationWeatherStack.send(data);
    // console.log(destinationData, originData)
});
