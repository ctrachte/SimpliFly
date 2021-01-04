// triggers calls to SkyScanner API on click of 'submit' button
document.getElementById("findFlights").addEventListener('click', function () {
    // origin location call
    const data = null;
    // origin location call
    const originAirportCode = (originData || airportData[Math.floor(Math.random() * Math.floor(300))]).code + "-sky";
    const destAirportCode = (destinationData || airportData[Math.floor(Math.random() * Math.floor(300))]).code  + "-sky";
    const inboundpartialdate = document.querySelectorAll('[type="date"]')[0].value; // modify this later to be more specific to the HTML element.
    console.log(originAirportCode, destAirportCode, inboundpartialdate);
    const xhrSkyScannerRequest = new XMLHttpRequest();
    const queryString = "/apiservices/browsedates/v1.0/US/USD/en-US/" + originAirportCode + "/" + destAirportCode + "/" + inboundpartialdate + "?inboundpartialdate=" + inboundpartialdate;
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