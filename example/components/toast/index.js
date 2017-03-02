import Toast from '../../../src/components/toast';
import html from './index.html';

var $page = null;
exports.render = function ($app) {
  $page = $(html);
  $app.append($page);
  this.initEvents();
}

exports.initEvents = function () {
  $page.on('click', '#js-toast', function () {
    Toast('加载中...', function () {
      console.log('hide toast');
    });
  });
}

exports.destroy = function () {
  $page.remove();
}
