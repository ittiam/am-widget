import Widget from '../../widget';
import throttle from './underscore.throttle';
import LocalScrollFix from './localscrollfix';
import ScrollFix from './scrollfix';

function isIos() {
  return /iphone/i.test(window.navigator.userAgent)
}

function generateHtml(str) {
  return `<div style="text-align: center;font-size: 14px;line-height: 50px;">${str}</div>`
}

var InfiniteLoad = Widget.extend({
  construct: function (options) {
    this.conf = $.extend({}, {
      container: '',
      isInitLock: false,
      window: window,
      useLocalScrollFix: false,
      useScrollFix: false,
      threshold: 10,
      loadingHtml: generateHtml('加载中...'),
      noDataHtml: generateHtml('没有更多数据了'),
      exceptionHtml: generateHtml('出现异常'),
      loadMoreFn: function() {}
    }, options);

    var conf = this.conf;
    this.$elem = $(conf.container);
    this.loadMoreFn = conf.loadMoreFn;
    this.isLock = conf.isInitLock;
    this.hasMore = true;
    this.win = conf.window;
    this.windowHeight = window.innerHeight;

    this.init();
  },

  init: function () {
    this.createBottomDom();
    this.fixLocalScroll();

    this.scrollListener = this.scrollListener.bind(this)
    this.resizeListener = this.resizeListener.bind(this)

    //对滚动和resize的监听函数设置节流
    this.scrollListenerWrapThrottle = throttle(this.scrollListener, 50);
    this.resizeListenerWrapThrottle = throttle(this.resizeListener, 50);

    this.attachScrollListener();
  },

  fixLocalScroll: function () {
    if (this.win !== window && isIos()) {
      if (this.conf.useLocalScrollFix) {
        this.localScrollFix = new LocalScrollFix(this.win);
      }
      if (this.conf.useScrollFix) {
        new ScrollFix(this.win);
      }
    } else {
      this.conf.useLocalScrollFix = false;
      this.conf.useScrollFix = false;
    }
  },

  createBottomDom: function () {
    this.$elem.append(`<div class="scrollload-bottom">${this.conf.loadingHtml}</div>`);
    this.bottomDom = this.$elem.find('.scrollload-bottom')[0];
  },

  showNoDataDom: function () {
    this.bottomDom.innerHTML = this.conf.noDataHtml
  },

  showLoadingDom: function () {
    this.bottomDom.innerHTML = this.conf.loadingHtml
  },

  showExceptionDom: function () {
    this.bottomDom.innerHTML = this.conf.exceptionHtml
  },

  scrollListener: function () {
    if (this.isLock) {
      return;
    }

    if (this.isBottom()) {
      this.isLock = true;
      this.loadMoreFn.call(this, this);
    }
  },

  resizeListener: function () {
    //更新缓存的windowHeight
    if (this.win === window) {
      this.windowHeight = window.innerHeight
    }
    this.scrollListener()
  },

  attachScrollListener: function () {
    this.win.addEventListener('scroll', this.scrollListenerWrapThrottle);
    this.win.addEventListener('resize', this.resizeListenerWrapThrottle);
    this.scrollListener();
  },

  detachScrollListener: function () {
    this.win.removeEventListener('scroll', this.scrollListenerWrapThrottle);
    this.win.removeEventListener('resize', this.resizeListenerWrapThrottle);
  },

  isBottom: function () {
    const { win, bottomDom, windowHeight } = this;
    let bottomDomTop = bottomDom.getBoundingClientRect().top;
    let winHeight;

    if (win === window) {
      winHeight = windowHeight;
    } else {
      const {height, top} = win.getBoundingClientRect();
      winHeight = height;
      bottomDomTop = bottomDomTop - top;
    }

    return bottomDomTop - winHeight <= this.conf.threshold;
  },

  lock: function () {
    this.isLock = true;
  },

  unLock: function () {
    this.isLock = false;
    if (this.hasMore) {
      this.scrollListener();
    }
    if (this.conf.useLocalScrollFix) {
      this.localScrollFix.update();
    }
  },

  noData: function () {
    this.lock();

    this.hasMore = false;
    this.showNoDataDom();

    if (this.conf.useLocalScrollFix && !this.localScrollFix.isArrived) {
      this.localScrollFix.arrived();
    }

    this.detachScrollListener();
  },

  refreshData: function () {
    //为了同时兼容<div><ul><li></li></ul></div>和<ul><li></li></ul>的写法
    if (this.$elem.find('.scrollload-bottom').length) {
      this.showLoadingDom();
    } else {
      this.createBottomDom();
    }

    this.isLock = false;
    this.hasMore = true;

    if (this.conf.useLocalScrollFix) {
      this.localScrollFix = new LocalScrollFix(this.win);
    }

    this.attachScrollListener();
  },

  throwException: function () {
    this.showExceptionDom();
  },

  solveException: function () {
    if (this.hasMore) {
      this.showLoadingDom();
      this.unLock();
    } else {
      this.showNoDataDom();
    }
  },

  destroy: function () {
    this.detachScrollListener();
    this.$elem.remove();
  }
});

module.exports = InfiniteLoad;
