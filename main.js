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

document.getElementById("clearForm").addEventListener('click', function () 
{
    clearForm();
});

// hide weather containers on page load
document.getElementsByClassName("destinationWeather")[0].setAttribute('style', "display: none;");
document.getElementsByClassName("originWeather")[0].setAttribute('style', "display: none;");

// set body content with flight data
function setBodyContent()
{
    let bodyContent = "";
    if (originData && destinationData && originData.code === destinationData.code) {
        document.getElementById("flights-list").innerHTML =                     
        `<li class="jumbotron list-group-item">
            <h1 class="display-4">Oops! Origin and destination airports can't match!</h1>
            <hr class="my-4">
            <p class="lead">Choose another origin airport city, destination airport city, then click "Find Flights" again!</p>
        </li>`;
    }
    else if (!FlightDataObj || FlightDataObj.Quotes.length == 0)
    {
        document.getElementById("flights-list").innerHTML =                     
        `<li class="jumbotron list-group-item">
            <h1 class="display-4">We didn't find any flights ... ${originData && destinationData ? "from " + originData.city 
            + " to " + destinationData.city + " on " + ((document.getElementById('inbound-partial-date').value) || new Date().formatSkyScanner()) : ""}</h1>
            <hr class="my-4">
            <p class="lead">Choose another origin airport city, destination airport city, or travel date, then click "Find Flights" again!</p>
        </li>`;
    }
    else
    {
        for (i=0; FlightDataObj.Quotes.length > i; i++) 
        {
            bodyContent = bodyContent + 
            `<li class="flight-listing list-group-item d-flex justify-content-between align-items-center row">
                <div class="departure-data col-5">
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
                <div class="price-data col-2">
                    Price
                    <br>
                    <div style="font-size: 1.75em">$${FlightDataObj.Quotes[i].MinPrice}</div>
                </div>
            </li>`
        }
        document.getElementById("flights-list").innerHTML = bodyContent;
    }
    FlightDataObj = null;
}

// clears form when 'Reset' btn is clicked
function clearForm()
{
    document.getElementById("flights-list").innerHTML = 
        `<li class="jumbotron list-group-item">
            <h1 class="display-4">Welcome to SimpliFly!</h1>
            <p class="lead">A simple and fast way to find flight and weather information for anywhere in the United States - no extra clicks, account creations, or email subscriptions!</p>
            <hr class="my-4">
            <p>To get started, choose an origin airport city, a destination airport city, and a travel date, then click "Find Flights"!</p>
        </li>`;
    
    FlightDataObj = null;

    document.getElementById('Origin').value = '';
    document.getElementById('Destination').value = '';
    document.getElementById('inbound-partial-date').value = '';
}

