import Widget from '../../widget';
import template from '../../template';

import tpl from './toast.html';

var compiledToast = null;

function ToastConstructor(options) {
  if (!(this instanceof ToastConstructor)) return new ToastConstructor(options);

  this.conf = $.extend({}, {
    type: 'info', // ['info', 'success', 'fail', 'offline']
    content: ''
  }, options);

  this.init();
}

ToastConstructor.prototype.init = function () {
  if (!compiledToast) {
    compiledToast = template.compile(tpl);
  }
  var html = compiledToast(this.conf);
  this.$elem = $(html).appendTo(document.body);
  this.$toast = this.$elem.find('.toast-wrapper');
}

ToastConstructor.prototype.show = function () {
  this.$toast.addClass('toast--visible');
}

ToastConstructor.prototype.hide = function (callback) {
  var _self = this;
  this.$toast.removeClass('toast--visible').transitionEnd(function () {
    _self.destroy();
    if (callback) {
      callback.call(_self);
    }
  });
}

ToastConstructor.prototype.destroy = function () {
  this.$elem.remove();
}

var Toast = function (content, timer, type, callback) {
  var config;
  if (typeof content === 'object') {
    config = content;
  } else {
    if (typeof timer === 'function') {
      callback = arguments[1];
      timer = 2000;
      type = 'info';
    }

    config = {
      content: content,
      type: type
    }
  }

  var toast = ToastConstructor(config);
  toast.show();
  setTimeout(function () {
    toast.hide(callback);
  }, timer);
}

module.exports = Toast;
