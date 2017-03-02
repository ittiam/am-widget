import InfiniteLoad from '../../../src/components/infinite';

import html from './index.html';

var list = [];
function getData () {
  var temp = [];
  var str = '';
  for (var i = list.length; i < list.length + 20; i++) {
    temp.push(i);
    str = str + `<a class="cell">
                  <div class="cell-content">
                    <div class="cell-title">Item ${i} </div>
                  </div>
                </a>`;
  }

  list = list.concat(temp);
  return str;
}

var $page = null;
var infiniteLoad = null;

exports.render = function ($app) {
  $page = $(html);
  $app.append($page);

  var count = 0;
  var $list = $('.list');
  infiniteLoad = new InfiniteLoad({
    container: '.container',
    loadMoreFn: function (infinite) {
      setTimeout(function () {
        if (count++ < 5) {
          $list.append(getData());
          infinite.unLock();
        } else {
          infinite.noData();
        }
      }, 500);
    }
  });

  this.initEvents();
}

exports.initEvents = function () {

}

exports.destroy = function () {
  list = [];
  infiniteLoad.destroy();
  $page.remove();
}
