import Widget from '../../widget';
import template from '../../template';
import '../../jquery.extend';

import tpl from './actionsheet.html';
var compiledActionSheet = template.compile(tpl);

var ActionSheet = Widget.extend({
  construct: function (options) {
    this.conf = $.extend({}, {
      data: [],
      showCls: 'show'
    }, options);

    this.init();
  },

  init: function () {
    this.$elem = $(compiledActionSheet({
      data: this.conf.data
    })).appendTo(document.body);

    this.$mask = $('.mask-hook', this.$elem);
    this.$panel = $('.panel-hook', this.$elem);
    this.$cancel = $('.actionsheet-cancel', this.$elem);

    this.initEvents();
  },

  open: function () {
    this.$elem.show();
    var showCls = this.conf.showCls;

    setTimeout(function() {
      this.$mask.addClass(showCls);
      this.$panel.addClass(showCls);
    }.bind(this), 0);
  },

  close: function () {
    var _self = this;
    var showCls = this.conf.showCls;
    this.$mask.transitionEnd(function () {
      _self.destroy();
    });

    this.$mask.removeClass(showCls);
    this.$panel.removeClass(showCls);
  },

  initEvents: function () {
    var _self = this;
    this.$mask.on('click', function() {
      this.close();
    }.bind(this));

    this.$panel.on('click', '.actionsheet-cell', function() {
      var key = $(this).data('key');
      _self.trigger('action.select', key);
      _self.close();
    });

    this.$cancel.on('click', function() {
      this.close();
    }.bind(this));
  },

  destroy: function () {
    this.$mask.off();
    this.$panel.off();
    this.$cancel.off();
    this.$elem.remove();
  }
});

module.exports = ActionSheet;
