// hide weather containers and reset button on page load
document.getElementsByClassName("destinationWeather")[0].setAttribute('style', "display: none;");
document.getElementsByClassName("originWeather")[0].setAttribute('style', "display: none;");
document.getElementById("clearForm").style.display = "none";

document.getElementById("clearForm").addEventListener('click', function () 
{
    clearForm();
});

// set body content with flight data
function setBodyContent()
{
    let bodyContent = "";

    if (originData && destinationData && originData.code === destinationData.code) 
    {
        bodyContent =                     
        `<li class="jumbotron list-group-item">
            <h1 class="">Oops! Origin and destination airports can't match!</h1>
            <hr class="my-4">
            <p class="lead">Choose another origin airport city, destination airport city, then click "Find Flights" again!</p>
        </li>`;
    }
    else if (!FlightDataObj || FlightDataObj.Quotes.length == 0)
    {
        bodyContent =                     
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
                    <p class="text-center lead mb-0">${FlightDataObj.Carriers[i].Name}</p>
                </div>
                <div class="arrival-data py-2 col-5">
                    <p class="text-center lead mb-0">${FlightDataObj.Dates.OutboundDates[0].PartialDate}</p>
                    </div>
                </div>
                <div class="price-data py-2 col-3">
                    <p class="text-center lead mb-0">$${FlightDataObj.Quotes[i].MinPrice}</p>
                </div>
            </li>`
        }
        document.getElementById("clearForm").style.display = "initial";
    }
    document.getElementById("flights-list").innerHTML = bodyContent;
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
    
    originData = undefined;
    destinationData = undefined;
    FlightDataObj = null;

    document.getElementById('Origin').value = '';
    document.getElementById('Destination').value = '';
    document.getElementById('inbound-partial-date').value = '';

    document.getElementsByClassName("destinationWeather")[0].setAttribute('style', "display: none;");
    document.getElementsByClassName("originWeather")[0].setAttribute('style', "display: none;");
    document.getElementById("clearForm").style.display = "none";
}

function loading() 
{
    let bodyContent = `
        <div class="mx-auto mt-5">
            <img src="assets/images/loading.gif" class="img-fluid" alt="loading" style="width: 100px">
        </div>
    `;

    document.getElementById("flights-list").innerHTML = bodyContent;
}
