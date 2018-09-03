const PubSub = require('../helpers/pub_sub.js');
const CountryDetailView = require('./countries_detail_view');

const CountryListView = function (container) {
  this.container = container;
};

CountryListView.prototype.bindEvents = function () {
  PubSub.subscribe('Countries:countries-ready', (evt) => {
    this.clearList();
    this.renderCountryDetailViews(evt.detail);
  });
};

CountryListView.prototype.clearList = function () {
  this.container.innerHTML = '';
};

CountryListView.prototype.renderCountryDetailViews = function (countries) {
  countries.forEach((country) => {
    const countryItem = this.createCountryListItem(country);
    this.container.appendChild(countryItem);
  });
};

CountryListView.prototype.createCountryListItem = function (country) {
  const countryDetailView = new CountryDetailView();
  const countryDetail = countryDetailView.createCountryDetail(country);
  return countryDetail;
};

module.exports = CountryListView;
