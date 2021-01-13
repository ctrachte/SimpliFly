const GetData = (url) => {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open('GET', url);
      request.responseType = 'blob';
  
      request.onload = () => {
        if (request.status == 200) {
          resolve(request.response);
        } else {
          reject(Error('The Data Source or API didn\'t respond successfully; error code:' + request.statusText));
        }
      };
  
      request.onerror = () => {
        reject(Error('There was a network error.'));
      };
  
      request.send();
    });
  }