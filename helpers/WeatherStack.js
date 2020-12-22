// triggers calls to Weatherstack API on click of 'submit' button
document.getElementById("findFlights").addEventListener('click', function () {
    // origin location weather call
    const data = null;
    // origin location weather call, or a random index from the airportData
    const originLocation = originData || airportData[ Math.floor(Math.random() * Math.floor(300))];
    const xhrOriginWeatherStack = new XMLHttpRequest();
    let queryStringOrigin = "http://api.weatherstack.com/current" + "?access_key=" + WeatherstackKey + "&query=" + originLocation.city + ", " + originLocation.state;
    // xhrOriginWeatherStack.withCredentials = true;
    xhrOriginWeatherStack.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log("Origin weatherstack res:", this.responseText);
        }
    });
    xhrOriginWeatherStack.open("GET", queryStringOrigin);
    // xhrOriginWeatherStack.setRequestHeader("access_key", WeatherstackKey);
    xhrOriginWeatherStack.send(data);

    // destination location weather call, or a random index from the airportData
    const destinationLocation = destinationData || airportData[ Math.floor(Math.random() * Math.floor(300))];
    const xhrDestinationWeatherStack = new XMLHttpRequest();
    let queryStringDestination = "http://api.weatherstack.com/current" + "?access_key=" + WeatherstackKey + "&query=" + destinationLocation.city + ", " + destinationLocation.state;
        // xhrDestinationWeatherStack.withCredentials = true;
        xhrDestinationWeatherStack.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log("Destination weatherstack res:", this.responseText);
        }
    });
    xhrDestinationWeatherStack.open("GET", queryStringDestination);
    // xhrDestinationWeatherStack.setRequestHeader("access_key", WeatherstackKey);
    xhrDestinationWeatherStack.send(data);
    // console.log(destinationData, originData)
});
