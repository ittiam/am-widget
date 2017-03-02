/**
 * tab 切换
 */
import Widget from '../../widget';

var Tab = Widget.extend({
  construct: function (options) {
    this.conf = $.extend({}, {
      container: '.tabs',
      head: '.tabs-header',
      content: '.tabs-body',
      startAt: 0,
      animation: false,
      activeClass: 'active',
      onBeforeSwitch: function() {},
      onAfterSwitch: function() {},
      onFirstShow: function() {}
    }, options);

    var conf = this.conf;
    this.activeIndex = undefined;
    this.$el = $(conf.container);
    this.$head = $(conf.head);
    this.$headItems = this.$head.find('.tab-header-item');
    this.$tabIndicator = this.$head.find('.tabs-active-tab-indicator');
    this.$content = $(conf.content);
    this.$contentItems = this.$content.find('.tab-panel');
    this.tabLength = this.$headItems.length;

    this.init();
  },

  init: function () {
    var conf = this.conf;
    var index = -1;

    if (typeof conf.startAt === 'string') {
      this.$active = this.$headItems.filter(conf.startAt);
      if (this.$active.length) {
        index = this.$active.index();
      } else {
        index = 0;
      }
    } else if (typeof conf.startAt === 'number') {
      index = conf.startAt;
    } else {
      index = 0;
    }

    if (this.$tabIndicator.length) {
      this.$tabIndicator.css('width', 100 / this.tabLength + '%')
    }

    this.switchTo(index);
    this.initEvents();
  },

  initEvents: function (argument) {
    var _this = this;
    this.$head.on('click', '.tab-header-item', function(e) {
      e.preventDefault();

      var index = _this.$headItems.index($(this));
      _this.switchTo(index);
      return false;
    });
  },

  switchTo: function (currentIndex) {
    var conf = this.conf;
    currentIndex = parseInt(currentIndex, 10);

    var self = this;
    var prevIndex = this.activeIndex;

    if (currentIndex === prevIndex) {
      return;
    }

    var $active =  this.$contentItems.eq(currentIndex);

    var hash = this.$headItems.eq(currentIndex).find('a').attr('href');

    if (typeof conf.onBeforeSwitch === 'function') {
      conf.onBeforeSwitch.call(this, currentIndex, prevIndex, hash);
    }

    this.$headItems
      .removeClass(conf.activeClass)
      .eq(currentIndex)
      .addClass(conf.activeClass);

    var $prev = this.$contentItems.eq(this.activeIndex);
    $prev.removeClass('active');
    $active.addClass('active');

    if (this.$tabIndicator.length) {
      this.$tabIndicator.css('left', currentIndex * (100 / this.tabLength) + '%')
    }

    this.activeIndex = currentIndex;

    return this;
  },

  switchToPrev: function () {
    var index = this.index - 1;
    if (index <= 0) {
      index = 0;
    }
    this.switchTo(index);
    return this;
  },

  switchToNext: function () {
    var index = this.activeIndex + 1;
    if (index >= this.tabLength) {
      index = 0;
    }

    this.switchTo(index);
    return this;
  },

  destroy: function () {
    this.$head.off();
    this.$el.remove();
  }
});

module.exports = Tab;
