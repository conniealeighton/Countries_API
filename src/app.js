const Munros = require('./models/munros.js');
const ListView = require('./views/list_view.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const munros = new Munros ('https://munroapi.herokuapp.com/api/munros')
  const container = document.querySelector('#container');
  const listView = new ListView(container);
  const dropdown = document.querySelector('#munro-dropdown');
  const selectView = new SelectView(dropdown);

  selectView.bindEvents();
  listView.bindEvents();
  munros.getData();
})
