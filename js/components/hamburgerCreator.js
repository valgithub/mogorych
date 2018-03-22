var summ=0;
var summtop=0;
var rez=0;

function counterBuy(){
  rez=summ+summtop;
  var counter = document.getElementById("counter");
  counter.innerHTML = rez.toFixed(2)+" $";
}

var hamburgerCreator = (function() {
  var moduleId = 'hamburgerCreator';
  var collection = [];
  var _module = {};
  var toppingsConfig = {
    bulka:{id: "bulka", name:"булочка", price: 0.2, weight: 0.3},
  	kotleta: {id: "kotleta", name:"котлета", price: 1, weight: 0.2},
  	syr: {id: "syr", name:"сыр", price: 0.9, weight: 0.1},
  	salat: {id: "salat", name:"салат", price: 0.5, weight: 0.12},
  	luk: {id: "luk", name:"лук", price: 0.2, weight: 0.05},
  	tomat: {id: "tomat", name:"помидор", price: 0.7, weight: 0.08},
  	ogurec: {id: "ogurec", name:"огурец", price: 0.6, weight: 0.07},
  	bekon: {id: "bekon", name:"бекон", price: 1.2, weight: 0.150},
  	sous: {id: "sous", name:"соус", price: 0.5, weight: 0.05}
  };

  function cleanContainer() {
    while (containerElement.firstChild) {
      containerElement.firstChild.remove()
    };
  }



  function init(_container, _collection) {
    if (_collection) {
      collection = [];
      setConfig(_collection, _container);
    }
  }

  function toppings() {
    return toppingsConfig;
  }


  function Hamburger(_price, _weight) {
    var self = this;
    this.element;
    this.price = _price;
    this.weight = _weight;
    this.consist = [];
    summ+=_price;
    this.addtopping = function(topping) {
      this.weight += toppingsConfig[topping].weight;
      this.price += toppingsConfig[topping].price;
      this.consist.push(topping);
      summtop+=toppingsConfig[topping].price;
      updateView();
    };

    function updateView() {
      var elementPrice = self.element.getElementsByClassName("price")[0];
      var elementWeight = self.element.getElementsByClassName("weight")[0];
      elementWeight.innerHTML = "<br>"+"Вес: " + self.weight.toFixed(2)+"  кг";
      elementPrice.innerHTML = "<br>"+"Цена: " + self.price.toFixed(2)+"  $";

      counterBuy();
    };
  }

  Hamburger.prototype.addToDOM = function(parent) {
    //Creating template
    var self = this;
    var template = tmpl;
    var clone = template.content.cloneNode(true);
    var price = clone.querySelector(".price");
    var weight = clone.querySelector(".weight");
    var img = clone.querySelector("img");
    img.setAttribute("src", "assets/img/hamburger.png");
    weight.innerHTML = "<br>"+"Вес: " + this.weight.toFixed(2)+"  кг";
    price.innerHTML = "<br>"+"Цена: " + this.price.toFixed(2)+"  $";
  
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
counterBuy();

  }

  Hamburger.prototype.export = function() {
    return this.consist
  };
  Hamburger.prototype.import = function(toppingIds) {
    var self = this;
    toppingIds.forEach(function(item, i, arr) {
      self.addtopping(item);
    })
  }

  function send(message, to) {
    _module.chatroom.send(message, _module, to);
  }

  function allowDrop(ev) {
    ev.preventDefault();
  }

  function addBurger(items) {

    var newBurger = new Hamburger(2, 0.45);
    newBurger.addToDOM(container);

    if (items) {
      newBurger.import(items);
    }

    collection.push(newBurger);
    send(newBurger);
  }

  function onRecive(){

  };

  function getConfig() {
    var config = [];
    collection.forEach(function(item) {
      config.push(item.export());
    })
    return config
  }


  function setConfig(_collection) {
    _collection.forEach(function(item) {
      addBurger(item, container);
    })
  }
    _module.chatroom = null;
    _module.name =  moduleId;
    _module.add =  function() {
      addBurger();
    };
    _module.getConfig = function() {
      return getConfig()
    };
    _module.toppings = toppings();
    _module.init =  init;
    _module.send = send;
    _module.recive = function(message, from) {
      alert(message +' : '+ from)
    }

  return _module

})();
order.register(hamburgerCreator);
