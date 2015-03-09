'use strict';
(function(w, menu, nav){
  var load = function(){
    menu.init();
    nav.then(
      function(data){
        menu.addItems(data);
        menu.init();
      },
      function(error){}
    );
  }
  w.addEventListener("load", load);
})(window, menu, nav);