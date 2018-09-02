const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Pokemon = function() {
  this.pokemonData = [];
  this.types = [];
  this.allPokemonUrl = [];
}

Pokemon.prototype.bindEvents = function () {
  const urlArray = this.allPokemonUrl
  PubSub.publish('Pokemon:typesUrl', urlArray)
};

Pokemon.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://pokeapi.co/api/v2/pokemon/?limit=150')
  requestHelper.get((data) => {
    PubSub.publish('Pokemon:pokemon-ready', data);
    this.publishTypes(data);
  });
}

Pokemon.prototype.publishTypes = function (data) {
  this.pokemonData = data;
  this.types = this.typesURl(data);
  PubSub.publish('Pokemon:types-ready', this.types)
};

Pokemon.prototype.typesURl = function () {
  const allPokemon = this.pokemonData.results


  allPokemon.forEach((pokemon) => {
    url = pokemon.url
    this.allPokemonUrl.push(url)
  })
  // console.log(this.allPokemonUrl);
};





module.exports = Pokemon;
