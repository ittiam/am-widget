import html from './badge.html';

var $page = null;
exports.render = function ($app) {
  $page = $(html);
  $app.append($page);
}

exports.initEvents = function () {

}

exports.destroy = function () {
  $page.remove();
}
