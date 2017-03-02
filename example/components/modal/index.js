import html from './index.html';

import Modal from '../../../src/components/modal';

var $page = null;
exports.render = function ($app) {
  $page = $(html);
  $app.append($page);
  this.initEvents();
}

exports.initEvents = function () {
  $page.on('click', '#js-alert', function () {
    Modal.Alert('alert 弹出框', '提示', function () {
      console.log('alert closed');
    });
  });

  $page.on('click', '#js-confirm', function () {
    Modal.Confirm('是否确定删除，这条数据', '删除？', function () {
      console.log('ok!');
    }, function () {
      console.log('cancel!');
    })
  });

  $page.on('click', '#js-closable', function () {
    new Modal({
      maskClosable: true,
      closable: true,
      content: '这是有可关闭的弹出层！'
    })
  });
}

exports.destroy = function () {
  $page.remove();
}
