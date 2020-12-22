let originData, destinationData;

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
    $.each(airportData, function(key, val){
        if ((val.city.search(regex) != -1) || (val.code.search(regex) != -1)) {
          output += `<li class="list-group-item" value="${key}"> ${val.code} - ${val.name} - ${val.city}, ${val.state}</li>`;
          if(count%2 == 0){
          }
          count++;
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
    console.log(regex)
    $.each(airportData, function(key, val){
        if ((val.city.search(regex) != -1) || (val.code.search(regex) != -1)) {
          output += `<li class="list-group-item" value="${key}"> ${val.code} - ${val.name} - ${val.city}, ${val.state}</li>`;
          if(count%2 == 0){
          }
          count++;
        }
      });
      output += '</ul>';
      document.querySelector('.OriginLocations').style.display = 'block';
      $('#filter-records-origin').html(output);
      OriginHighlights();
});

function OriginHighlights () {
  let Origin = document.getElementById("OriginList");

  Origin.addEventListener("mouseover", function(e){
    e.target.style.background = "#ffc107";
  });

  Origin.addEventListener("mouseout", function(e){
    e.target.style.background = "white";
  });

  Origin.addEventListener("click", function(e){
    originData = airportData[e.target.value];
    document.getElementById("Origin").value = airportData[e.target.value].city;
    document.querySelector('.OriginLocations').style.display = 'none';
  });
}

function DestinationHighlights () {
  let Destination = document.getElementById("DestinationList");

  Destination.addEventListener("mouseover", function(e){
    e.target.style.background = "#ffc107";
  });

  Destination.addEventListener("mouseout", function(e){
    e.target.style.background = "white";
  });

  Destination.addEventListener("click", function(e){
    destinationData = airportData[e.target.value];
    document.getElementById("Destination").value = airportData[e.target.value].city;
    document.querySelector('.DestinationLocations').style.display = 'none';
  });
}

// document.getElementById('Origin').addEventListener("blur", function(){
//     document.querySelector('.OriginLocations').style.display = 'none';
// });

// document.getElementById('Destination').addEventListener("blur", function(){
//   document.querySelector('.DestinationLocations').style.display = 'none';
// });



//Find more infor and source code @ https://www.js-tutorials.com/jquery-tutorials/live-search-json-objects-data-using-jquery/