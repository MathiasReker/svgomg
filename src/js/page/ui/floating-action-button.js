var utils = require('../utils');
var Ripple = require('./ripple');
var Spinner = require('./spinner');

class FloatingActionButton {
  constructor({ title, href, iconSvg, classList, minor }) {
    this.container = utils.strToEl(
      (href ? '<a>' : '<div role="button" tabindex="0">') +
        iconSvg +
      (href ? '</a>' : '</div>') +
    '');

    if (href) {
      this.container.href = href;
    }
    if (title) {
      this.container.setAttribute('title', title);
    }
    this.container.classList.add(minor ? 'minor-floating-action-button' : 'floating-action-button');
    if (classList) {
      classList.forEach((className) => { this.container.classList.add(className); });
    }

    this._ripple = new Ripple();
    this.container.appendChild(this._ripple.container);

    this._spinner = new Spinner();
    this.container.appendChild(this._spinner.container);

    this.container.addEventListener('click', event => this._onClick(event));
  }

  _onClick(event) {
    this._ripple.animate();
  }

  working() {
    this._spinner.show(500);
  }

  done() {
    this._spinner.hide();
  }
}

module.exports = FloatingActionButton;
