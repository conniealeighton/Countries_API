const PubSub = require('../helpers/pub_sub.js');
const MunroView = require('../views/munro_view.js')

const ListView = function(container) {
  this.container = container;
  this.munros = [];
}

ListView.prototype.bindEvents = function () {
  PubSub.subscribe('Munros:data-ready', event => {
    this.munros = event.detail;
    this.render();
  })
};

ListView.prototype.render = function () {
  this.munros.forEach(munro => {
    const munroView = new MunroView(this.container, munro);
    munroView.render();
  });
};

module.exports = ListView;
