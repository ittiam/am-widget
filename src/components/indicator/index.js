import template from '../../template';
import tpl from './indicator.html';

var compiledIndicator = null;

function Indicator (options) {
  if (!(this instanceof Indicator)) return new Indicator(options);

  if (typeof options === 'string') {
    options = {
      text: options
    };
  }

  this.conf = $.extend({}, {
    text: '',
    size: 32,
    color: '#fff',
    spinner: ''
  }, options);

  if (!compiledIndicator) {
    compiledIndicator = template.compile(tpl);
  }
}

var proto = Indicator.prototype;

proto.open = function () {
  var conf = this.conf;

  var html = compiledIndicator(conf);

  this.$indicator = $(html).appendTo(document.body);
  this.$wrapper = this.$indicator.find('.indicator-wrapper');
  this.$spinner = this.$indicator.find('.spinner-snake');

  if (this.$spinner.length) {
    this.$spinner.css({
      'border-top-color': conf.color,
      'border-left-color': conf.color,
      'border-bottom-color': conf.color,
      'width': conf.size + 'px',
      'height': conf.size + 'px'
    });
  }

  if (conf.text) {
    this.$wrapper.css({
      'padding': '20px'
    });
  }

  this.$wrapper.addClass('indicator--visible');
}

proto.close = function () {
  var _self = this;

  this.$wrapper.removeClass('indicator--visible').transitionEnd(function () {
    _self.$indicator.remove();
  });
}


module.exports = Indicator;
