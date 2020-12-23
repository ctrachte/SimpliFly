// triggers calls to Weatherstack API on click of 'submit' button
document.getElementById("findFlights").addEventListener('click', function () {
    // origin location weather call
    const data = null;
    // origin location weather call, or a random index from the airportData
    const originLocation = originData || airportData[Math.floor(Math.random() * Math.floor(300))];
    const xhrOriginWeatherStack = new XMLHttpRequest();

    //let queryStringOrigin = "https://api.weatherstack.com/current" + "?access_key=" + WeatherstackKey + "&query=" + originLocation.city + ", " + originLocation.state;
    let queryStringOrigin = "https://forecast.weather.gov/MapClick.php?lat=" + originLocation.lat + "&lon=" + originLocation.lon + "&unit=0&lg=english&FcstType=dwml";
    // xhrOriginWeatherStack.withCredentials = true;
    xhrOriginWeatherStack.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            let parser = new DOMParser();
            let xmlDoc = parser.parseFromString(this.responseText,"text/xml");
            let currentObservation = xmlDoc.querySelectorAll('[type="current observations"]')[0];
            currentObservation = currentObservation.getElementsByTagName('parameters')[0];
            let currentTemp = currentObservation.querySelectorAll('[type="apparent"]')[0].getElementsByTagName('value')[0].innerHTML;
            let currentCondIcon = currentObservation.getElementsByTagName('conditions-icon')[0].getElementsByTagName('icon-link')[0].innerHTML;
            let currentCondDesc = currentObservation.getElementsByTagName('weather')[0].getElementsByTagName('weather-conditions')[0].getAttribute('weather-summary');

            document.getElementById('originWeatherIcon').setAttribute('alt', currentCondDesc);
            document.getElementById('originWeatherDesc').innerHTML = "Currently: " + currentCondDesc;
            document.getElementById('originWeatherIcon').setAttribute('src', currentCondIcon);
            document.getElementById('originWeatherTemp').innerHTML = currentTemp + "&#176;" + "F";
            document.getElementById('originWeatherCity').innerHTML = originLocation.city + ", " + originLocation.state; // + ", " + originLocation.country;
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
            let xmlDoc = parser.parseFromString(this.responseText,"text/xml");
            let currentObservation = xmlDoc.querySelectorAll('[type="current observations"]')[0];
            currentObservation = currentObservation.getElementsByTagName('parameters')[0];
            let currentTemp = currentObservation.querySelectorAll('[type="apparent"]')[0].getElementsByTagName('value')[0].innerHTML;
            let currentCondIcon = currentObservation.getElementsByTagName('conditions-icon')[0].getElementsByTagName('icon-link')[0].innerHTML;
            let currentCondDesc = currentObservation.getElementsByTagName('weather')[0].getElementsByTagName('weather-conditions')[0].getAttribute('weather-summary');

            document.getElementById('destWeatherIcon').setAttribute('alt', currentCondDesc);
            document.getElementById('destWeatherDesc').innerHTML = "Currently: " + currentCondDesc;
            document.getElementById('destWeatherIcon').setAttribute('src', currentCondIcon);
            document.getElementById('destWeatherTemp').innerHTML = currentTemp + "&#176;" + "F";
            document.getElementById('destWeatherCity').innerHTML = destinationLocation.city + ", " + destinationLocation.state; // + ", " + destinationLocation.country;
        }
    });
    xhrDestinationWeatherStack.open("GET", queryStringDestination);
    // xhrDestinationWeatherStack.setRequestHeader("access_key", WeatherstackKey);
    xhrDestinationWeatherStack.send(data);
    // console.log(destinationData, originData)
});
