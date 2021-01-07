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
            `<li class="justify-content-between list-group-item p-0 mb-1 d-flex align-items-center row">
                <div class="departure-data py-2 col-4">
                    <p class="text-center mb-0">Departure</p>
                    <p class="text-center lead mb-0">${FlightDataObj.Dates.OutboundDates[0].PartialDate}</p>
                </div>
                <div class="arrival-data py-2 col-5">
                    <div class="arrival-data-content">
                        <p class="text-center mb-0">Arrival</p>
                        <p class="text-center lead mb-0">${FlightDataObj.Dates.OutboundDates[0].PartialDate}</p>
                    </div>
                </div>
                <div class="price-data py-2 col-3">
                    <p class="text-center mb-0">${FlightDataObj.Carriers[i].Name}</p>
                    <p class="text-center lead mb-0">$${FlightDataObj.Quotes[i].MinPrice}</p>
                </div>
            </li>`
        }
        document.getElementById("flights-list").innerHTML = bodyContent;
    }
    FlightDataObj = null;
}

