'use strict';

var menu = (function(d, w){
  // Private Attributes
  var primaryMenuItems,
  overlay,
  hamburguer,
  content,
  primaryMenu,
  navbar,
  // Private functions
  init = function(){
    // Initialize attributes
    initializeAttributes();

    // Initialize event listeners
    clickPrimaryMenuItem();
    clickOutSide();
    showMenuOnHamburguer();
    onResize();
  },
  initializeAttributes = function(){
    primaryMenuItems = d.querySelectorAll('.navbar-primary > li');
    primaryMenu = d.querySelector('.navbar-primary');
    overlay = d.getElementById('overlay');
    hamburguer = d.getElementById('hamburguer');
    navbar = d.getElementById('navbar');
    content = d.getElementById('content');
  },
  // Hide secondary menu and overlay
  hideSecondaryAndOverlay = function(event){
    // Checking if the event was outside menu
    if(event){
      var isOutsideNavbar = clickedElement('overlay');
    }
    // Hiding secondary menu and overlay
    if(isOutsideNavbar || !event){
      each.call(primaryMenuItems, function(item, index){
        item.classList.remove('active');
        var chevron = item.querySelector('.chevron');

        if(chevron){
          chevron.classList.remove('rotate180');
        }
      });
      overlay.style.display = content.classList.contains('menu-active') ? 'block' : 'none';
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
      var chevron = menuItem.querySelector('.chevron');
      // Hide all secondary menus and overlay
      // If there is a secondary menu show it and show overlay
      if(secondary){
        menuItem.classList.toggle('active');
        var isActive = menuItem.classList.contains('active');
        hideSecondaryAndOverlay();
        isActive ? menuItem.classList.add('active') : menuItem.classList.remove('active');
        if(chevron){
          isActive ? chevron.classList.add('rotate180') : chevron.classList.remove('rotate180');
        }
        //show overlay
        overlay.style.display = isActive ||
                                content.classList.contains('menu-active')
                                ? 'block' : 'none';
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
    for (var i = this.length - 1; i >= 0; i--) {
      callback(this[i], i);
    }
  },
  clickedElement = function(elemId) {
    var theElem = getEventTarget(window.event);
    while(theElem != null) {
      if(theElem.id == elemId)
        return true;
      theElem = theElem.offsetParent;
    }
    return false;
  },
  getEventTarget = function(evt) {
    var targ = (evt.target) ? evt.target : evt.srcElement;
    if(targ != null) {
      if(targ.nodeType == 3)
        targ = targ.parentNode;
    }
    return targ;
  },
  toggleMenu = function(event){
    navbar.classList.toggle('menu-active');
    content.classList.toggle('menu-active');
    overlay.style.display = content.classList.contains('menu-active') ? 'block' : 'none';
  },
  hideMenu = function(event){
    navbar.classList.remove('menu-active');
    content.classList.remove('menu-active');
    overlay.style.display = 'none';
  },
  /*hamburguer*/
  showMenuOnHamburguer = function(){
    hamburguer.addEventListener('click', toggleMenu);
  },
  onResize = function(){
    w.addEventListener("resize", function(){
      hideMenu();
      hideSecondaryAndOverlay();
    });
  },



  addItems = function(menu, menuObject){
    menuObject = menuObject || primaryMenu;
    for (var i = 0; i <= menu.items.length - 1; i++) {
      var item = menu.items[i],
      li = d.createElement('li'),
      a = d.createElement('a'),
      ul = d.createElement('ul'),
      label = document.createTextNode(item.label);
      ul.setAttribute('class', 'navbar-secondary');
      a.setAttribute('href', item.url);
      a.appendChild(label);
      if(item.items && item.items.length){
        var icon = d.createElement('icon');
        icon.setAttribute('class', 'chevron');
        a.appendChild(icon);
      }
      li.appendChild(a);
      if(item.items){
        addItems(item, ul)
        li.appendChild(ul);

      }
      menuObject.appendChild(li);
    };
  }

  // Public Api
  return {
    "init":init,
    "addItems":addItems
  }
})(document, window);