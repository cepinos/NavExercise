'use strict';

var menu = (function(d){
  // Private Attributes
  var primaryMenuItems,
  overlay,

  // Private functions
  init = function(){
    // Initialize attributes
    initializeAttributes();

    // Initialize event listeners
    clickPrimaryMenuItem();
    clickOutSide();
  },
  initializeAttributes = function(){
    primaryMenuItems = d.querySelectorAll('.navbar-primary > li');
    overlay = d.getElementById('overlay');
  },
  // Hide secondary menu and overlay
  hideSecondaryAndOverlay = function(event){
    // Checking if the event was outside menu
    if(event){
      var isOutsideNavbar = clickedOutsideElement('navbar');
    }
    // Hiddin secondary menu and overlay
    if(isOutsideNavbar || !event){
      each.call(primaryMenuItems, function(item, index){
         item.classList.remove('active');
      });
      overlay.style.display = 'none';
    }
  },
  // Listening click event in document
  clickOutSide = function(){
    d.addEventListener('click', hideSecondaryAndOverlay);
  },
  // Show secondary menu and overlay
  showSecondaryAndOverlay = function(menuItem){
    var eventListener = function(event){
      var secondary = menuItem.querySelector('.navbar-secondary');
      // Hide all secondary menus and overlay
      hideSecondaryAndOverlay();
      // If there is a secondary menu show it and show overlay
      if(secondary){
        menuItem.classList.add('active');

        //show overlay
        overlay.style.display = 'block';
      }
    }
    return eventListener
  },
  clickPrimaryMenuItem = function(){
    /*Add Click listener to primary menu items*/
    each.call(primaryMenuItems, function(item, index){
      item.addEventListener('click', showSecondaryAndOverlay(item));
    });
  },
  // aux functions
  each = function(callback){
    console.log('each');
    for (var i = this.length - 1; i >= 0; i--) {
      callback(this[i], i);
    }
  },
  clickedOutsideElement = function(elemId) {
    var theElem = getEventTarget(window.event);
    while(theElem != null) {
      if(theElem.id == elemId)
        return false;
      theElem = theElem.offsetParent;
    }
    return true;
  },
  getEventTarget = function(evt) {
    var targ = (evt.target) ? evt.target : evt.srcElement;
    if(targ != null) {
      if(targ.nodeType == 3)
        targ = targ.parentNode;
    }
    return targ;
  }

  // Public Api
  return {
    "init":init
  }
})(document);