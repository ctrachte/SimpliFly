const GetData = (url, withCredentials) => {
    return new Promise((resolve, reject) => {
        // loading();
        let request = new XMLHttpRequest();
        request.open('GET', url);
        request.setRequestHeader("x-rapidapi-key", SkyScannerKey);
        request.setRequestHeader("x-rapidapi-host", SkyScannerHost);
        request.withCredentials = withCredentials;
        request.onload = () => {
            if (request.status == 200) {
                FlightDataObj = JSON.parse(request.response);
                console.log(FlightDataObj);
                resolve(FlightDataObj);
            } else {
                FlightDataObj = null;
                reject(Error('The Data Source or API didn\'t respond successfully; error code:' + request.statusText));
            }
        };

        request.onerror = () => {
            reject(Error('There was a network error. Check your network connection and try again. All previously made reqests are cached.'));
        };

        request.send();
    });
}