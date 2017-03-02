// jQuery 扩展
function whichTransitionEvent(){
  var t, el = document.createElement('fakeelement');

  var transitions = {
    'transition'      : 'transitionend',
    'OTransition'     : 'oTransitionEnd',
    'MozTransition'   : 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  }

  for (t in transitions){
    if (el.style[t] !== undefined){
      return transitions[t];
    }
  }
}

function whichAnimationEvent () {
  var t, el = document.createElement('fakeelement');

  var animations = {
    'animation'      : 'animationend',
    'OAnimation'     : 'oAnimationEnd',
    'MozAnimation'   : 'animationend',
    'WebkitAnimation': 'webkitAnimationEnd'
  }

  for (t in animations){
    if (el.style[t] !== undefined){
      return animations[t];
    }
  }
}

var transitionEvent = whichTransitionEvent();
var animationEvent = whichAnimationEvent();

$.fn.transitionEnd = function (callback) {
  var dom = this;
  function fireCallback (e) {
    if (e.target !== this) return;
    callback.call(this, e);
    dom.off(transitionEvent, fireCallback);
  }
  if (callback) {
    dom.on(transitionEvent, fireCallback);
  }
  return this;
}

$.fn.animationEnd = function (callback) {
  var dom = this;
  function fireCallback (e) {
    if (e.target !== this) return;
    callback.call(this, e);
    dom.off(animationEvent, fireCallback);
  }
  if (callback) {
    dom.on(animationEvent, fireCallback);
  }
  return this;
}
