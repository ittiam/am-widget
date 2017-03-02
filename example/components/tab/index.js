import Tab from '../../../src/components/tab';
import html from './tab.html';

var $page = null;
var tab = null;
exports.render = function ($app) {
  $page = $(html);
  $app.append($page);
  tab = new Tab();
};

exports.initEvents = function () {

}

exports.destroy = function () {
  tab.destroy();
  $page.remove();
}
