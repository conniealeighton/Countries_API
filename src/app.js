const Countries = require('./models/Countries.js');
const SelectView = require('./views/select_view.js');
const CountryListView = require('./views/countries_list_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const selectElement = document.querySelector('select#capital-select');
  const selectView = new SelectView(selectElement);
  selectView.bindEvents();

  const listContainer = document.querySelector('#country-list');
  const munroListView = new CountryListView(listContainer);
  munroListView.bindEvents();

  const countries = new Countries;
  countries.bindEvents();
  countries.getData();
})
