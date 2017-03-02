## Am-widget

基于 jQuery 的移动 UI 组件


## 方法

- Events
  - mixTo()
  - on()
  - off()
  - emit()

- template
  - compile(html)

- Cookie
   - get(name, options)
   - set(name, value, options)
   - remove(name, options)

- Widget
  - extend(obj)


## 如何组件开发

```js
var Tab = Widget.extend({
  // 类静态成员
  statics: {

  },

  // 构造函数，若不需要可缺省
  construct: function (options) {
    this.conf = $.extend({
      container: null,
      head: null,
      headItems: null,
      content: null,
      contentItems: null,
      startAt: 0,
      activeClass: 'active',
      hash: false,
      hoverToSwitch: false,
      onBeforeSwitch: function () {},
      onAfterSwitch: function () {},
      onFirstShow: function () {}
    }, options);

    this.index = undefined;
    var conf = this.conf;
    this.$el = $(conf.container);
    this.init();
  },

  init: function() {
    this.initEvents();
  },

  initEvents: function() {

  },

  destroy: function() {
    this.unbind();
    this.$el.remove();
    this.off();
  },

  unbind: function() {
    return this;
  },

  switchTo: function (index) {
    this.index = index;
    console.log('current index: ' + this.index + '!');
  },

  // 其他成员方法
  ...

});

var tab = new Tab('tab');
tab.switchTo(2);
// tab 的其他实例方法
tab.on()
tab.off()
tab.emit()
```
