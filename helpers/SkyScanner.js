// triggers calls to SkyScanner API on click of 'submit' button
document.getElementById("findFlights").addEventListener('click', function () {
    const data = null;
    const originAirportCode = (originData || airportData[Math.floor(Math.random() * Math.floor(300))]).code + "-sky";
    const destAirportCode = (destinationData || airportData[Math.floor(Math.random() * Math.floor(300))]).code  + "-sky";
    const inboundpartialdate = document.getElementById('inbound-partial-date').value; // modify this later to be more specific to the HTML element.
    // console.log(originAirportCode, destAirportCode, inboundpartialdate);
    const xhrSkyScannerRequest = new XMLHttpRequest();
    const queryString = "/apiservices/browsedates/v1.0/US/USD/en-US/" + originAirportCode + "/" + destAirportCode + "/" + inboundpartialdate + "?inboundpartialdate=" + inboundpartialdate;
    xhrSkyScannerRequest.withCredentials = true;

    xhrSkyScannerRequest.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            // TODO: map data returned to the UI, and handle errors
            console.log(JSON.parse(this.responseText));
        }
    });
    xhrSkyScannerRequest.open("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com" + queryString);
    xhrSkyScannerRequest.setRequestHeader("x-rapidapi-key", SkyScannerKey);
    xhrSkyScannerRequest.setRequestHeader("x-rapidapi-host", SkyScannerHost);
    xhrSkyScannerRequest.send(data);
});