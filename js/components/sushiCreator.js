var sushiCreator = (function() {
  var moduleId = 'sushiCreator';
  var collection = [];
  var toppingsConfig = {
    sushi1: {id:"sushi1", name:"суши1", price: 1, weight: 0.2},
    sushi2: {id: "sushi2", name:"суши2", price: 0.5, weight: 0.12},
    sushi3: {id: "sushi3", name:"суши3", price: 0.9, weight: 0.1},
    sushi4: {id: "sushi4", name:"суши4", price: 0.9, weight: 0.1},
    sushi5: {id: "sushi5", name:"суши5", price: 0.2, weight: 0.05},
    sushi6: {id: "sushi6", name:"суши6", price: 0.7, weight: 0.08},
    sushi7: {id: "sushi7", name:"суши7", price: 0.6, weight: 0.07},
    sushi8: {id: "sushi8", name:"суши8", price: 1.2, weight: 0.150},
    sushi9: {id: "sushi9", name:"суши9", price: 0.5, weight: 0.05}
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


  function Sushi(_price, _weight) {
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
      elementPrice.innerHTML = "<br>"+"Цена: " + self.price.toFixed(2)+"  $";
      elementWeight.innerHTML = "<br>"+"Вес: " + self.weight.toFixed(2)+"  кг";
    };
  }

  Sushi.prototype.addToDOM = function(parent) {
    //Creating template
    var self = this;
    var template = tmpl;
    var clone = template.content.cloneNode(true);
    var price = clone.querySelector(".price");
    var weight = clone.querySelector(".weight");
    var img = clone.querySelector("img");
    img.setAttribute("src", "assets/img/sushi.png");
    price.innerHTML = "<br>"+"Цена: " + self.price.toFixed(2)+"  $";
    weight.innerHTML = "<br>"+"Вес: " + self.weight.toFixed(2)+"  кг";

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

  Sushi.prototype.export = function() {
    return this.consist
  };
  Sushi.prototype.import = function(toppingIds) {
    var self = this;
    toppingIds.forEach(function(item, i, arr) {
      self.addtopping(item);
    })
  }



  function allowDrop(ev) {
    ev.preventDefault();
  }

  function add(listOfsushi) {
    var newSushi = new Sushi(10, 0.7);

    newSushi.addToDOM(container);
    if (listOfsushi) {
      newSushi.import(listOfsushi);
    }

    collection.push(newSushi);
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


  return {
    "add": function() {
      add();
    },
    "getConfig": function() {
      return getConfig()
    },
    "toppings": toppings(),
    "init": init,
    send:send,
    recive: function(message, from) {
      alert(message + ' : ' + from)
    }
  }


})()
