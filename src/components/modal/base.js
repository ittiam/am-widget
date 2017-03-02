import Widget from '../../widget';
import template from '../../template';
import '../../jquery.extend';

import tpl from './modal.html';

var compiledModal = null;

var Modal = Widget.extend({
  construct: function (options) {
    this.conf = $.extend({}, {
      // 内容
      content: '加载中...',
      // 标题
      title: '',
      // 确定按钮回调函数
      ok: function() {},
      okHide: true,
      // 取消按钮回调函数
      cancel: function() {},
      cancelHide: true,
      // 确定按钮文字
      okText: '',
      // 取消按钮文字
      cancelText: '',
      // 自动关闭时间(毫秒)
      timer: null,
      // 动画时间
      duration: 400,
      // 是否锁屏
      mask: true,
      // 点击遮罩层是否关闭
      maskClosable: false,
      transparent: true,
      onOpen: function() {},
      onClose: function() {}
    }, options);

    this.init();
  },

  init: function () {
    if (!compiledModal) {
      compiledModal = template.compile(tpl);
    }

    var html = compiledModal(this.conf);
    this.$dialog = $(html).appendTo(document.body);
    this.$mask = this.$dialog.find('.modal-mask');
    this.$wrapper = this.$dialog.find('.modal-wrapper');

    this.open();
    this.initEvents();
  },

  initEvents: function () {
    var _self = this;

    this.$dialog.on('click', '[data-role=cancel]', function () {
      if (_self.conf.cancelHide) {
        _self.close();
      }

      _self.conf.cancel.call(_self);
    });

    this.$dialog.on('click', '[data-role=ok]', function () {
      if (_self.conf.okHide) {
        _self.close();
      }

      _self.conf.ok.call(_self);
    });

    this.$dialog.on('click', '.modal-close', function () {
      _self.close();
    });

    this.$dialog.on('click', '.modal-mask', function () {
      if (_self.conf.maskClosable) {
        _self.close();
      }
    });
  },

  open: function () {
    var _self = this;
    if (this.conf.onOpen) {
      this.$wrapper.transitionEnd(function () {
        _self.conf.onOpen.call(_self);
      });
    }

    setTimeout(function () {
      _self.$mask.addClass('modal--visible');
      _self.$wrapper.addClass('modal--visible');
    }, 0);
  },

  close: function () {
    var _self = this;
    this.$wrapper.removeClass('modal--visible');
    this.$mask.removeClass('modal--visible').transitionEnd(function () {
      _self.destroy();
    });
  },

  destroy: function () {
    this.$dialog.remove();
  }
});

module.exports = Modal;
