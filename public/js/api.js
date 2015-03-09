//GET /api/nav.json
var getJSON = (function(){
  return function(url) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status == 200) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      xhr.send();
    });
  }
})();

var nav = (function(get){
  // It returns a promise
  return get('/api/nav.json');
})(getJSON);
