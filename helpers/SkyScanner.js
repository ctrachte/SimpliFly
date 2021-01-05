let FlightDataObj = null;

// we need to formate dates properly for the API, so lets extend the DATE class
Date.prototype.formatSkyScanner = function(){
    return  this.getFullYear() + "-"
    + (this.getMonth().length > 1 ? (this.getMonth() + 1) : "0" + (this.getMonth() + 1)) +
    "-" +  (this.getDate().length > 1 ? (this.getDate() + 1) : "0" + (this.getDate() + 1));
}

// triggers calls to SkyScanner API on click of 'submit' button
document.getElementById("findFlights").addEventListener('click', function () {
    const originAirportCode = (originData || airportData[Math.floor(Math.random() * Math.floor(300))]).code + "-sky";
    const destAirportCode = (destinationData || airportData[Math.floor(Math.random() * Math.floor(300))]).code  + "-sky";
    const inboundpartialdate = (document.getElementById('inbound-partial-date').value) || new Date().formatSkyScanner(); // modify this later to be more specific to the HTML element.
    // console.log(originAirportCode, destAirportCode, inboundpartialdate);
    const xhrSkyScannerRequest = new XMLHttpRequest();
    const queryString = "/apiservices/browsedates/v1.0/US/USD/en-US/" + originAirportCode + "/" + destAirportCode + "/" + inboundpartialdate + "?inboundpartialdate=" + inboundpartialdate;
    xhrSkyScannerRequest.withCredentials = true;

    xhrSkyScannerRequest.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            // TODO: map data returned to the UI, and handle errors
            // need loading icon to be rendered while waiting for a response
            console.log(JSON.parse(this.responseText));
            FlightDataObj = JSON.parse(this.responseText);
        }
    });
    xhrSkyScannerRequest.open("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com" + queryString);
    xhrSkyScannerRequest.setRequestHeader("x-rapidapi-key", SkyScannerKey);
    xhrSkyScannerRequest.setRequestHeader("x-rapidapi-host", SkyScannerHost);
    xhrSkyScannerRequest.send();
});