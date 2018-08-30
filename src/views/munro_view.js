const MunroView = function(container, munro) {
  this.mainContainer = container;
  this.munro = munro;
}

MunroView.prototype.render = function() {
  const munroContainer = document.createElement('div');
  munroContainer.className = "mountain-box";

  const munroName = document.createElement('h2');
  munroName.textContent = this.munro.name;
  munroContainer.appendChild(munroName);

  const munroMeaning = document.createElement('li');
  munroMeaning.textContent = `Meaning: ${this.munro.meaning}`
  munroContainer.appendChild(munroMeaning);

  const munroHeight = document.createElement('li');
  munroHeight.textContent = `Height: ${this.munro.height}`
  munroContainer.appendChild(munroHeight);

  this.mainContainer.appendChild(munroContainer);
}
module.exports = MunroView;
