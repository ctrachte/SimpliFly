let FlightDataObj = null;

// we need to formate dates properly for the API, so lets extend the DATE class
Date.prototype.formatSkyScanner = function () {
    return this.getFullYear() + "-"
        + (this.getMonth().length > 1 ? (this.getMonth() + 1) : "0" + (this.getMonth() + 1)) +
        "-" + (this.getDate().length > 1 ? (this.getDate() + 1) : "0" + (this.getDate() + 1));
}

// triggers calls to SkyScanner API on click of 'submit' button
document.getElementById("findFlights").addEventListener('click', function () {
    loading();
    getSkyscannerData(originData, destinationData, AirportDataUSA);
});

function getSkyscannerData(originData, destinationData, AirportDataUSA) {
    const originAirportCode = (originData || AirportDataUSA[Math.floor(Math.random() * Math.floor(300))]).code + "-sky";
    const destAirportCode = (destinationData || AirportDataUSA[Math.floor(Math.random() * Math.floor(300))]).code + "-sky";
    const inboundpartialdate = (document.getElementById('inbound-partial-date').value) || new Date().formatSkyScanner(); // modify this later to be more specific to the HTML element.
    if (originData && destinationData && originData.code === destinationData.code) {
        bodyContent =
            `<li class="jumbotron list-group-item">
                <h1 class="">Oops! Origin and destination airports can't match!</h1>
                <hr class="my-4">
                <p class="lead">Choose another origin airport city, destination airport city, then click "Find Flights" again!</p>
            </li>`;
        document.getElementById("flights-list").innerHTML = bodyContent;
        return;
    }
    const queryString = "/apiservices/browsedates/v1.0/US/USD/en-US/" + originAirportCode + "/" + destAirportCode + "/" + inboundpartialdate + "?inboundpartialdate=" + inboundpartialdate;
    let url = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com" + queryString;
    GetData(url, true).then((result) => resolveSkyScanner(result), (result) => rejectSkyScanner(result));
}