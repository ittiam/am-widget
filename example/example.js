import './example.less';
import director from './director';

FastClick.attach(document.body);

var router = new director.Router();

var components = {
  home: require('./components/home'),
  tab: require('./components/tab'),
  actionsheet: require('./components/actionsheet'),
  button: require('./components/button'),
  card: require('./components/card'),
  indicator: require('./components/indicator'),
  list: require('./components/list'),
  modal: require('./components/modal'),
  spinner: require('./components/spinner'),
  textbox: require('./components/textbox'),
  toast: require('./components/toast'),
  step: require('./components/step'),
  media: require('./components/media'),
  grid: require('./components/grid'),
  badge: require('./components/badge'),
  infinite: require('./components/infinite'),
  searchbox: require('./components/searchbox')
};

var $app = $('#app');

var current = null;

function load (context) {
  if (context === current) {
    return;
  }
  destroy(current);
  var page = components[context];
  // 销毁

  if (page) {
    current = context;

    page.render($app);
  }
}

function destroy (context) {
  var page = components[context];
  if (page && page.destroy) {
    page.destroy();
  }
}

router.on('/:page', load);

router.init('/home')
