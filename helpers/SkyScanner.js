// triggers calls to SkyScanner API on click of 'submit' button
document.getElementById("findFlights").addEventListener('click', function () {
    // origin location call
    const data = null;
    // origin location call
    const originLocation = originData || airportData[Math.floor(Math.random() * Math.floor(300))];
    const xhrSkyScannerRequest = new XMLHttpRequest();
    const queryString = "/apiservices/browsedates/v1.0/US/USD/en-US/SFO-sky/LAX-sky/2019-09-01?inboundpartialdate=2019-12-01";
    xhrSkyScannerRequest.withCredentials = true;

    xhrSkyScannerRequest.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
        }
    });
    
    xhrSkyScannerRequest.open("GET", SkyScannerHost);
    xhrSkyScannerRequest.setRequestHeader("x-rapidapi-key", SkyScannerKey);
    xhrSkyScannerRequest.setRequestHeader("x-rapidapi-host", SkyScannerHost + queryString);
    xhrSkyScannerRequest.send(data);
});