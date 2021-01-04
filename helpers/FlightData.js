const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.responseType = 'json';

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
        console.log(this.response);
	}
});

xhr.open("GET", "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/LAX-sky/MIA-sky/2021-01-20");
xhr.setRequestHeader("x-rapidapi-key", SkyScannerKey);
xhr.setRequestHeader("x-rapidapi-host", SkyScannerHost);

xhr.send(data);