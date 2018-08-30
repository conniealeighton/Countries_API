const PubSub = require('../helpers/pub_sub.js')
const Request = require('../helpers/request_helper.js')

const Munros = function(url){
  this.url = url;
  this.munros = [];
}

Munros.prototype.getData = function () {
  const request = new Request(this.url);
  request.get().then(data => {
    PubSub.publish('Munros:data-ready', data);
  });

};

module.exports = Munros;



// Countries.prototype.getData = function () {
//   const request = new Request(this.url);
//   // request.get >>> (data => this.handleData(data));
//   request.get().then(data => this.handleData(data))
//   .catch((err) => {
//     console.log(`There has been an error` + err);
//   });
// };
