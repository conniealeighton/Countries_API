const Pokemon = require('./models/pokemon.js');
const PokemonSelectView = require('./views/select_view.js')

document.addEventListener('DOMContentLoaded', () => {
  const pokemonSelectView = new PokemonSelectView;
  pokemonSelectView.bindEvents();

  const pokemon = new Pokemon;
  pokemon.bindEvents();
  pokemon.getData();
});
