var pizzaCreator = (function() {
  var moduleId = 'pizzaCreator';
  var collection = [];
  var _module = {};
  var toppingsConfig = {
  kolbasa:  {id:"kolbasa", name:"колбаса",price: 1, weight: 0.2},
  	grib: {id: "grib", name:"грибы",price: 0.5, weight: 0.12},
  	parmezan: {id: "parmezan", name:"пармезан",price: 0.9, weight: 0.1},
  	syr: {id: "syr", name:"сыр",price: 0.9, weight: 0.1},
  	luk: {id: "luk", name:"лук",price: 0.2, weight: 0.05},
  	tomat: {id: "tomat", name:"помидор",price: 0.7, weight: 0.08},
  	marinat: {id: "marinat", name:"огурец марин",price: 0.6, weight: 0.07},
  	bekon: {id: "bekon", name:"бекон",price: 1.2, weight: 0.150},
  	sous: {id: "sous", name:"соус",price: 0.5, weight: 0.05}
  };

  function init(_container, _collection) {
    if (_collection) {
      collection = [];
      setConfig(_collection);
    }
  }

  function toppings() {
    return toppingsConfig
  }


  function Pizza(_price, _weight) {
    var self = this;
    this.element;
    this.price = _price;
    this.weight = _weight;
    this.consist = [];
    this.addtopping = function(topping) {
      this.weight += toppingsConfig[topping].weight;
      this.price += toppingsConfig[topping].price;
      this.consist.push(topping);
      updateView();
    };

    function updateView() {
      var elementPrice = self.element.getElementsByClassName("price")[0];
      var elementWeight = self.element.getElementsByClassName("weight")[0];
      elementPrice.innerHTML = "Price: " + self.price;
      elementWeight.innerHTML = "Weight: " + self.weight;
    };
  }

  Pizza.prototype.addToDOM = function(parent) {
    //Creating template
    var self = this;
    var template = tmpl;
    var clone = template.content.cloneNode(true);
    var price = clone.querySelector(".price");
    var weight = clone.querySelector(".weight");
    var img = clone.querySelector("img");
    img.setAttribute("src", "assets/img/pizza.png");
    price.innerHTML = "Price: " + this.price;
    weight.innerHTML = "Weight: " + this.weight;

    //Add to DOM
    parent.prepend(clone);
    this.element = parent.firstElementChild;

    //D&D listeners
    self.element.addEventListener("dragover", function(e) {
      allowDrop(event)
    }, false);

    self.element.addEventListener("drop", function(e) {
      drop(event)
    }, false);

    function drop(ev) {
      ev.preventDefault();
      self.addtopping(ev.dataTransfer.getData("text"));
    }
  }

  Pizza.prototype.export = function() {
    return this.consist
  };
  Pizza.prototype.import = function(toppingIds) {
    var self = this;
    toppingIds.forEach(function(item, i, arr) {
      self.addtopping(item);
    })
  }



  function allowDrop(ev) {
    ev.preventDefault();
  }

  function add(listOftoppings) {
    var newPizza = new Pizza(5, 0.8);

    newPizza.addToDOM(container);
    if (listOftoppings) {
      newPizza.import(listOftoppings);
    }

    collection.push(newPizza);
  }

  function getConfig() {
    var config = [];
    collection.forEach(function(item) {
      config.push(item.export());
    })
    return config
  }

  function send(message, to) {
      alert(message +' : ' + to)

  }

  function setConfig(_collection) {
    _collection.forEach(function(item) {
      add(item);
    })
  }
})()
//   _module.chatroom = null;
//   _module.name =  moduleId;
//   _module.add =  function() {
//     addPizza();
//   };
//   _module.getConfig = function() {
//     return getConfig()
//   };
//   _module.toppings = toppings();
//   _module.init =  init;
//   _module.send = send;
//   _module.recive = function(message, from) {
//     alert(message +' : '+ from)
//   }
//
// return _module
//
// })();
// order.register(pizzaCreator);
