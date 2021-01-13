// hide weather containers and reset button on page load
document.getElementsByClassName("destinationWeather")[0].setAttribute('style', "display: none;");
document.getElementsByClassName("originWeather")[0].setAttribute('style', "display: none;");
document.getElementById("clearForm").style.display = "none";

document.getElementById("clearForm").addEventListener('click', function () {
    clearForm();
});

// set body content with flight data
function resolveSkyScanner(FlightDataObj) {
    document.getElementById("flights-list").innerHTML = "";
    let bodyContent = document.getElementById("flights-list").innerHTML;
    if (FlightDataObj.Quotes.length > 0) {
        for (i = 0; FlightDataObj.Quotes.length > i; i++) {
            bodyContent +=
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
    } else {
        rejectSkyScanner();
        return;
    }
    document.getElementById("clearForm").style.display = "initial";
    document.getElementById("flights-list").innerHTML = bodyContent;
}

function rejectSkyScanner() {
    document.getElementById("flights-list").innerHTML = bodyContent;
}

// clears form when 'Reset' btn is clicked
function clearForm() {
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

function loading() {
    let bodyContent = `
        <div class="mx-auto mt-5">
            <img src="assets/images/loading.gif" class="img-fluid" alt="loading" style="width: 100px">
        </div>
    `;

    document.getElementById("flights-list").innerHTML = bodyContent;
}
