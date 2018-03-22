var check = (function() {
  var module = {};
  var nameSpace = {
    hamburgerCreator: 'Burger',
    sushiCreator: 'Roll'
  }
  var addItem = function(element, parent) {
    var tmp  = checkListItem.content.cloneNode(true);
    var nameLabel =  tmp.querySelector('.check-list-item-name');
    var consistLabel =  tmp.querySelector('.check-list-item-consist');
    var weightLabel =  tmp.querySelector('.check-list-item-weight');
    var priceLabel =  tmp.querySelector('.check-list-item-price');
    var context = { element: element };
    nameLabel.innerText = nameSpace[parent.name];
    consistLabel.innerText = element.consist;
    weightLabel.innerText = 'Weight' + element.weight;
    priceLabel.innerText = 'Weight' + element.price;

    checkList.append(tmp);
    checkList.lastElementChild.addEventListener('click', onItemClick.bind(context));
  }

  function onItemClick(e) {

  }
  module.name = 'Check';
  module.receive =  function(message, from) {
      addItem(message, from);
  };

  module.send = function() {

  }
  return module;
})()
order.register(check)
/*
message

element;

*/
