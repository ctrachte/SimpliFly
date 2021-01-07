document.getElementById("findFlights").addEventListener('click', function () {
    if (FlightDataObj == null)
    {
        setTimeout(function () {
            setBodyContent();
        }, 1250);
    }
    else
    { 
        setBodyContent(); 
    }
});

// hide weather containers on page load
document.getElementsByClassName("destinationWeather")[0].setAttribute('style', "display: none;");
document.getElementsByClassName("originWeather")[0].setAttribute('style', "display: none;");


function setBodyContent()
{
    let bodyContent = "";
    if (originData && destinationData && originData.code === destinationData.code) {
        document.getElementById("flights-list").innerHTML =                     
        `<li class="jumbotron list-group-item">
            <h1 class="">Oops! Origin and destination airports can't match!</h1>
            <hr class="my-4">
            <p class="lead">Choose another origin airport city, destination airport city, then click "Find Flights" again!</p>
        </li>`;
    }
    else if (!FlightDataObj || FlightDataObj.Quotes.length == 0)
    {
        document.getElementById("flights-list").innerHTML =                     
        `<li class="jumbotron list-group-item p-0">
        <div class="alert alert-warning mb-0 p-4">
            <h1 class="display-4">We didn't find any flights...</h1><p class="lead">${originData && destinationData ? "from <strong>" + originData.city 
            + "</strong> to <strong>" + destinationData.city + "</strong> on " + ((document.getElementById('inbound-partial-date').value) || new Date().formatSkyScanner()) : ""}</p>
        </div>
            </li>
        <li class="jumbotron list-group-item">
            <p class="lead">Choose another origin airport city, destination airport city, or travel date, then click "Find Flights" again!</p>
        </li>`;
    }
    else
    {
        for (i=0; FlightDataObj.Quotes.length > i; i++) 
        {
            bodyContent = bodyContent + 
            `<li class="flight-listing list-group-item d-flex justify-content-between align-items-center row">
                <div class="departure-data col-4">
                    Departure
                    <br>
                    <div style="font-size: 1.75em">${FlightDataObj.Dates.OutboundDates[0].PartialDate}</div>
                </div>
                <div class="arrival-data col-5">
                    <div class="arrival-data-content">
                        Test Arrival
                        <br>
                        <div style="font-size: 1.75em">${FlightDataObj.Dates.OutboundDates[0].PartialDate}</div>
                    </div>
                </div>
                <div class="price-data col-3">
                    <p class="lead mb-0>${FlightDataObj.Carriers[i].Name}</p>
                    <div style="font-size: 1.75em">$${FlightDataObj.Quotes[i].MinPrice}</div>
                </div>
            </li>`
        }
        document.getElementById("flights-list").innerHTML = bodyContent;
    }
    FlightDataObj = null;
}

