import './assets/style/index.less';
import keyboardInput from './components/KeyboardInput.vue';


const keyboardComponent = {
  install(Vue) {
    Vue.component('keyboardInput', keyboardInput);
  },
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(keyboardComponent);
}

export default keyboardComponent;
