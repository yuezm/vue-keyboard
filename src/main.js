import './assets/style/index.less';
import NumberList from './components/NumberList';


const keyboardComponent = {
  install(Vue) {
    Vue.component('NumberList', NumberList);
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(keyboardComponent);
}

export default {
  NumberList,
};
