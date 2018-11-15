import './assets/style/index.less';
import keyboardInput from './components/KeyboardInput.vue';
import Keyboard from './components/keyboardInput/Keyboard';
import NumberList from './components/keyboardInput/NumberList';


const keyboardComponent = {
  install(Vue) {
    Vue.component('keyboardInput', keyboardInput);
    Vue.component('Keyboard', Keyboard);
    Vue.component('NumberList', NumberList);
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(keyboardComponent);
}

export default {
  keyboardInput,
  Keyboard,
  NumberList,
};
