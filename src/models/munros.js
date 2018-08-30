const PubSub = require('../helpers/pub_sub.js')
const Request = require('../helpers/request_helper.js')

const Munros = function(url){
  this.url = url;
  this.munros = [];
}

Munros.prototype.getData = function () {
  const request = new Request(this.url);
  request.get().then(data => {
    this.munros = data;
    PubSub.publish('Munros:data-ready', data);
  });

};

Munros.prototype.bindEvents = function() {
  PubSub.subscribe('SelectView:selection', (event) => {
    PubSub.publish('Munros:data-ready', this.filterMunros(event.detail));
  })
}

Munros.prototype.filterMunros = function(region) {
  return this.munros.filter((munro) => {
    return munro.region === region;
  })
}

module.exports = Munros;
