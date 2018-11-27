import './assets/style/index.less';
import NumberList from './components/NumberList';

const mobileKeyboard = {
  install(Vue) {
    Vue.component('NumberList', NumberList);
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(mobileKeyboard);
}

export default mobileKeyboard;

export {
  NumberList,
};
