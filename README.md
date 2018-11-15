# vue-keyboard

### 如何使用

> 在vue单页面中使用

直接调用已经组合好了的键盘和数字框
```
import {keyboardInput} from 'vue-mobile-keyboard';
// demo.vue
<template>
  <keyboardInput/>
</template>
```
也可以自己组合键盘和数字框
```
// demo.vue
import {Keyboard,NumberList} from 'vue-mobile-keyboard';
<template>
  <div>
    <!--显示框-->
    <NumberList :secret="secret" @focus="show=true" :length="length" :value="value"/>
    <!--键盘-->
    <Keyboard @add="add" @del="del" :show="show" @close="show=false;$emit('close')"/>
   </div>
</template>

...
  data() {
    return {
      // 输入框控制键盘是否弹出
      show: false,
      value: [],
      length: 4,
      secret: false,
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
  }
...
```

> 在非vue单页面中使用
```
  <script src="[vue-mobile-keyboard.path]/dist/build.js "></script>
  ...
  <div id="app">
    <keyboard-input :length="6" @finish="finish"></keyboard-input>
  </div>
    <script>
      new Vue({
        el: '#app',
        methods: {
          finish(v) {
            alert('输入完毕，输入为:' + v);
          }
        }
      });
    </script>
  ...
```

### 调用时的参数