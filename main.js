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

function setBodyContent()
{
    let bodyContent = "";

    if (FlightDataObj.Quotes.length == 0)
    {
        document.getElementById("flights-list").innerHTML = "Sorry, no flights could be found for that date."
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

