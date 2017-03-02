import ActionSheet from '../../../src/components/actionsheet';
import html from './index.html';

var $page = null;
var actionsheet = null;
exports.render = function ($app) {
  $page = $(html);
  $app.append($page);

  this.initEvents();
}

exports.initEvents = function () {
  $page.on('click', '#js-actionsheet', function () {
    actionsheet = new ActionSheet({
      data: [
        { key: 1, text: '操作一' },
        { key: 2, text: '操作二' },
        { key: 3, text: '操作三' },
      ]
    });
    actionsheet.open();
  });
}

exports.destroy = function () {
  $page.remove();
  actionsheet.destroy();
}
