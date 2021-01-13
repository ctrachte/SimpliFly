const GetData = (url, withCredentials = false) => {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open('GET', url);
        if (withCredentials) {
            request.setRequestHeader("x-rapidapi-key", SkyScannerKey);
            request.setRequestHeader("x-rapidapi-host", SkyScannerHost);
        }
        request.withCredentials = withCredentials;
        request.onload = () => {
            if (request.status == 200) {
                if (withCredentials) {
                    consonle.log(FlightDataObj)
                    FlightDataObj = JSON.parse(this.responseText);
                }
                resolve(request.response);
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