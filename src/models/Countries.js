const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Countries = function () {
  this.countriesData = [];
  this.capitals = [];
}

Countries.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:change', (evt)  => {
    const capitalIndex = evt.detail;
    this.publishCountriesByCapital(capitalIndex);
  })
};

Countries.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://restcountries.eu/rest/v2/all')
  requestHelper.get((data) => {
    PubSub.publish('Countries:countries-ready', data);
    this.publishCapitals(data);
  });
}

Countries.prototype.publishCapitals = function (data) {
  this.countriesData = data;
  this.capitals = this.uniqueCapitalList();
  PubSub.publish('Countries:capital-ready', this.capitals);
}

Countries.prototype.capitalList = function () {
  const fullList = this.countriesData.map(country => country.capital);
  return fullList;
}

Countries.prototype.uniqueCapitalList = function () {
  return this.capitalList().filter((country, index, array) => {
    return array.indexOf(country) === index;
  });
}

Countries.prototype.countriesByCapital = function (capitalIndex) {
  const selectedCapital = this.capitals[capitalIndex];
  return this.countriesData.filter((country) => {
    return country.capital === selectedCapital;

  });
};

Countries.prototype.publishCountriesByCapital = function (capitalIndex) {
  const foundCountries = this.countriesByCapital(capitalIndex);
  PubSub.publish('Countries:countries-ready', foundCountries);
};

module.exports = Countries;
