let originData, destinationData;
// remove non-USA entries in airport data 
let AirportDataUSA = airportData.filter(function (entry) {
  return entry.country === 'United States';
});
document.getElementById('Destination').addEventListener("keyup", function (e) {
  let searchField = this.value;
  if (searchField === '') {
    document.getElementById('filter-records-destination').innerHTML = '';
    document.querySelector('.DestinationLocations').style.display = 'none';
    return;
  }
  let regex = new RegExp(searchField, "i");
  let output = '<ul class="list-group list-group-flush" id="DestinationList">';
  let count = 1;
  $.each(AirportDataUSA, function (key, val) {
    if ((val.city.search(regex) != -1) || (val.code.search(regex) != -1) || (val.state ? val.state.search(regex) != -1 : false)) {
      if (val.country === "United States") {
        output += `<li class="list-group-item" value="${key}"> ${val.code} - ${val.name} - ${val.city}, ${val.state}</li>`;
        count++;
      }
    }
  });
  output += '</ul>';
  document.querySelector('.DestinationLocations').style.display = 'block';
  $('#filter-records-destination').html(output);
  DestinationHighlights();
});

document.getElementById('Origin').addEventListener("keyup", function (e) {
  let searchField = this.value;
  if (searchField === '') {
    document.getElementById('filter-records-origin').innerHTML = '';
    document.querySelector('.OriginLocations').style.display = 'none';
    return;
  }
  let regex = new RegExp(searchField, "i");
  let output = '<ul class="list-group list-group-flush" id="OriginList">';
  let count = 1;
  $.each(AirportDataUSA, function (key, val) {
    if ((val.city.search(regex) != -1) || (val.code.search(regex) != -1) || (val.state ? val.state.search(regex) != -1 : false)) {
      output += `<li class="list-group-item" value="${key}"> ${val.code} - ${val.name} - ${val.city}, ${val.state}</li>`;
      count++;
    }
  });
  output += '</ul>';
  document.querySelector('.OriginLocations').style.display = 'block';
  $('#filter-records-origin').html(output);
  OriginHighlights();
});

document.getElementById('inbound-partial-date').addEventListener("change", function (e) {
  document.getElementById("clearForm").style.display = "initial";
});
  
function OriginHighlights() {
  let Origin = document.getElementById("OriginList");

  Origin.addEventListener("mouseover", function (e) {
    e.target.style.background = "#ffc107";
  });

  Origin.addEventListener("mouseout", function (e) {
    e.target.style.background = "white";
  });

  Origin.addEventListener("click", function (e) {
    originData = AirportDataUSA[e.target.value];
    document.getElementById("Origin").value = originData.city + ", " + originData.state;
    document.querySelector('.OriginLocations').style.display = 'none';
    document.getElementById("clearForm").style.display = "initial";
  });
}

function DestinationHighlights() {
  let Destination = document.getElementById("DestinationList");

  Destination.addEventListener("mouseover", function (e) {
    e.target.style.background = "#ffc107";
  });

  Destination.addEventListener("mouseout", function (e) {
    e.target.style.background = "white";
  });

  Destination.addEventListener("click", function (e) {
    destinationData = AirportDataUSA[e.target.value];
    document.getElementById("Destination").value = destinationData.city + ", " + destinationData.state;
    document.querySelector('.DestinationLocations').style.display = 'none';
    document.getElementById("clearForm").style.display = "initial";
  });
}

//Find more infor and source code @ https://www.js-tutorials.com/jquery-tutorials/live-search-json-objects-data-using-jquery/