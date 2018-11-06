<template>
  <div class="keyboard-input">
    <!--显示框-->
    <NumberList :secret="secret" @focus="show=true" :length="length" :value="value"/>
    <!--键盘-->
    <Keyboard @add="add" @del="del" :show="show||defaultShow" @close="show=false;$emit('close')"/>
  </div>
</template>

<script>
import Keyboard from './keyboardInput/Keyboard';
import NumberList from './keyboardInput/NumberList';

export default {
  name: 'keyboardInput',
  props: {
    length: {
      type: Number,
      default: 6,
      required: false,
    },
    // 是否加密显示
    secret: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 由父级组件来控制弹窗，当使用该属性时，必须接受close事件，并关闭将该值设为false,否则不会关闭键盘
    defaultShow: {
      type: Boolean,
      required: false,
      default: false,
    },
    defaultValue: {
      type: [ Array, String, Number ],
      default: '',
    },
  },
  components: {
    Keyboard,
    NumberList,
  },
  watch: {
    defaultValue: {
      handler(v) {
        this.value = Array.isArray(v) ? v : v.toString().split('');
      },
      immediate: true,
    },
  },
  data() {
    return {
      // 输入框控制键盘是否弹出
      show: false,
      value: [],
    };
  },
  methods: {
    add(v) {
      if (this.value.length >= this.length) {
        return;
      }
      this.value.push(v);
      const _v = this.value.join('');
      // 绑定v-model的事件
      this.$emit('input', _v);
      // 发送完成事件
      if (_v.length >= this.length) this.$emit('finish', _v);
    },
    del() {
      this.value.pop();
      // 绑定v-model的事件
      this.$emit('input', this.value.join(''));
    },
  },
};
</script>
