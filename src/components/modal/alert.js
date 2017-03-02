import Modal from './base';

var Alert = function (content, title, okFunc) {
  var config;
  if (typeof content === 'object') {
    config = content;
  } else {
    if (typeof title === 'function') {
      okFunc = arguments[1];
      title = undefined;
    }

    config = {
      content: content,
      title: title,
      ok: okFunc
    }
  }

  return new Modal({
    content: config.content,
    title: config.title,
    ok: config.ok,
    okText: '确认'
  });
}

module.exports = Alert;
