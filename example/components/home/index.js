import html from './home.html';

var $page = null;
exports.render = function ($app) {
  $page = $(html);
  $app.append($page);
  this.initEvents();
}

exports.initEvents = function () {
  $page.find('.list-header').on('click', function () {
    var $this = $(this);
    var $list = $this.parents('.list');

    if ($list.hasClass('category-closed')) {
      $list.removeClass('category-closed').addClass('category-open');
    } else if ($list.hasClass('category-open')) {
      $list.removeClass('category-open').addClass('category-closed');
    }
  });
}

exports.destroy = function () {
  $page.remove();
}
