const PubSub = require('../helpers/pub_sub');

const SelectView = function (selectElement) {
  this.selectElement = selectElement;
};

SelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:capital-ready', (evt) => {
    this.populateSelect(evt.detail);
  });

  this.selectElement.addEventListener('change', (evt) => {
    console.log(evt);
    const selectedIndex = evt.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  });
};

SelectView.prototype.populateSelect = function (capital) {
  capital.forEach((capital, index) => {
    const option = this.createCapitalOption(capital, index);
    this.selectElement.appendChild(option);
  })
};

SelectView.prototype.createCapitalOption = function (capital, index) {
  const option = document.createElement('option');
  option.textContent = capital;
  option.value = index;
  return option;
};

module.exports = SelectView;
