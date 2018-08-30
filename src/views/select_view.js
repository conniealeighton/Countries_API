const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(element){
  this.element = element;
  this.munros = [];
  this.regions = [];
};

SelectView.prototype.bindEvents = function() {
  PubSub.subscribe('Munros:data-ready', (event) => {
    this.munros = event.detail;
    this.renderSelect();
  })

  this.element.addEventListener('input', (event) => {
    const region = this.regions[event.target.selectedIndex];
    PubSub.publish('SelectView:selection', region)
  })
}

SelectView.prototype.renderSelect = function () {
  this.regions = this.munros
    .map(munro => munro.region)
    .filter((region, index, munros) => munros.indexOf(region) === index);

  this.regions.forEach(region => {
    const option = document.createElement("option")
    option.text = region
    this.element.add(option)
  })
};

module.exports = SelectView;
