const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const PokemonSelectView = function() {

}

PokemonSelectView.prototype.bindEvents = function () {
  PubSub.subscribe('Pokemon:typesUrl', (evt) => {
    this.getTypes(evt);
  })
};

PokemonSelectView.prototype.getTypes = function (typesUrl) {
  console.log(typesUrl.detail);
};
// test

module.exports = PokemonSelectView;
