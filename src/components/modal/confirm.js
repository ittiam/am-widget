import Modal from './base';

var Confirm = function (content, title, okFunc, cancelFunc) {
  var config;
  if (typeof content === 'object') {
    config = content
  } else {
    if (typeof title === 'function') {
      cancelFunc = arguments[2];
      okFunc = arguments[1];
      title = undefined;
    }

    config = {
      content: content,
      title: title,
      ok: okFunc,
      cancel: cancelFunc,
      okHide: true
    }
  }

  return new Modal({
    content: config.content,
    title: config.title,
    ok: config.ok,
    cancel: config.cancel,
    okText: config.okText || '确认',
    okHide: config.okHide,
    cancelText: config.cancelText || '取消'
  });
};

module.exports = Confirm;
