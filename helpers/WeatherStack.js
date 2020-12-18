

document.getElementById("findFlights").addEventListener('click', function () {
    const originLocation = document.getElementById("Origin").value;
    const destLocation = document.getElementById("Destination").value;
    // origin location weather call
    const xhrOriginWeatherStack = new XMLHttpRequest();
    let queryStringOrigin = "http://api.weatherstack.com/current"
        + "? access_key = " + WeatherstackKey
        + "& query = " + originLocation;
    xhrOriginWeatherStack.withCredentials = true;
    xhrOriginWeatherStack.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });
    xhrOriginWeatherStack.open("GET", queryStringOrigin);
    xhrOriginWeatherStack.send(data);
});
