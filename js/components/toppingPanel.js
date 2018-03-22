var toppingPanel = (function() {
  var _export = {};
  var config = {};
  var containerElement = null;
  var topingItemElm = toppingsTmpl.content.childNodes[0];


  _export.init = function(_config, _container) {
    containerElement = _container;
    config = _config;
    renderPanel()
  }

  function cleanContainer() {
    while (containerElement.firstChild) {
      containerElement.firstChild.remove()
    };
  }

  function renderPanel() {
    cleanContainer();
    toppingsContainer.style.display="inline";
    for (var item in config) {
      if (config.hasOwnProperty(item)) {
        var tmpl = topingItemElm.cloneNode(true);
        var img = tmpl.querySelector("img");
        var context = {
          id: item
        };
        img.setAttribute('src', 'assets/img/' + item + '.png');
        img.setAttribute('draggable', true)
        containerElement.appendChild(tmpl);

        containerElement.lastChild.querySelector("img").addEventListener('dragstart', onDrag.bind(context));
       // toppingItem.style.cursor="pointer";
      }
    }
  }

  function onDrag(ev) {
    ev.dataTransfer.setData("text", this.id);
  }

  return _export
})()
