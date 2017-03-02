import Widget from '../../widget';

var Picker = Widget.extend({
  construct: function (options) {
    this.conf = $.extend({}, {

    }, options);
  }
});

module.exports = Picker;
