var currentCreator = null;

	var tabsPanel = (function() {
	  var _export = {};
	  var currentTab = null;
	  var tabsConfig = [{
	    id: 'hamburger',
	    name: 'Cool Hamburger'
	  }, {
	    id: 'pizza',
	    name: 'Awesome Pizza'
	  }, {
	    id: 'sushi',
	    name: 'Great sushi'
	  },
	{id:'drink', name: 'Drink'}];
	  var tabClick = new Click();

	  function renderView() {
	    tabsConfig.forEach(function(item, i, arr) {
	      var scope = {
	        id: item.id
	      };
	      var span = document.createElement("span");
	      var img = document.createElement("img");
	      img.setAttribute("src", "assets/img/" + item.id + ".png");
	      img.setAttribute("id", item.id);
	      span.appendChild(img);
	      tabs.appendChild(span);
	      tabs.lastElementChild.addEventListener('click', onClick.bind(scope))
	    })

	  }
	  renderView();

	  function onClick() {
	    currentTab = this.id;
	    tabClick.fire(currentTab)
	  }


	  _export.onTabChanged = tabClick;
	  _export.getCurrenrttab = function() {
	    return currentTab;
	  }
	  return _export;
	})()
