import Indicator from '../../../src/components/indicator';
import html from './index.html';

var $page = null;
exports.render = function ($app) {
  $page = $(html);
  $app.append($page);
  this.initEvents();
}

exports.initEvents = function () {
  $page.on('click', '#js-toast-1', function () {
    var indicator = Indicator();
    indicator.open();

    setTimeout(function () {
      indicator.close();
    }, 2000);
  });

  $page.on('click', '#js-toast-2', function () {
    var indicator = Indicator('加载中...');
    indicator.open();

    setTimeout(function () {
      indicator.close();
    }, 2000);
  });

  $page.on('click', '#js-toast-4', function () {
    var spinner = `<div class="spinner-bounce">
            <div class="spinner-bounce-bounce1" style="width: 10px; height: 10px; background-color: #fff;"></div>
            <div class="spinner-bounce-bounce2" style="width: 10px; height: 10px; background-color: #fff;"></div>
            <div class="spinner-bounce-bounce3" style="width: 10px; height: 10px; background-color: #fff;"></div>
          </div>`;
    var indicator = Indicator({
      spinner: spinner
    });
    indicator.open();

    setTimeout(function () {
      indicator.close();
    }, 2000);
  });
}

exports.destroy = function () {
  $page.remove();
}
