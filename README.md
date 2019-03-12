# vue-keyboard

### 兼容性

Vue 2.0+

IOS Safari: 6+
Android Browser: 4+
Chrome for Android: 71
Firefox for Android: 64
UC Browser for Android: 11.8

### 如何使用

> 在vue单页面中使用

##### 全局导入
```
// main.js

import mobileInput from "vue-mobile-keyboard";

Vue.use(mobileInput);

// demo.vue

<template>
  <NumberList v-model="data"/>
</template>

export default {
  data() {
    return {
      data: '',
    }
  }
}
```
##### 按需加载
```
// demo.vue

<template>
  <NumberList v-model="data"/>
</template>

<script>
import { NumberList } from "vue-mobile-keyboard";

export default {
  name: 'app',
  components: {
    NumberList,
  },
  data() {
    return {
      data: '',
    }
  }
}
```
> 在非vue单页面中使用
```
  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="[vue-mobile-keyboard.path]/dist/build.js "></script>
  ...
  <div id="app">
    <number-list v-model="data" :length="6" @finish="finish"></number-list>
  </div>
    <script>
      new Vue({
        el: '#app',
        data:{
          data: '',
        },
        methods: {
          finish(v) {
            alert('输入完毕，输入为:' + v);
          }
        }
      });
    </script>
  ...
```

### 组件参数
|参数|类型|是否必传|说明|
|--|--|--|--|
|length|Number|false|输入框的个数,最小为1,最大为8,默认6|
|type|String|false|输入框类型, enum[ 'text', 'number', 'tel' ],默认text|
|isInitFocus|Boolean|false|是否自动获取焦点(在IOS无法使用),默认false|
|value|String|false|父组件传给子组件的值,父组件使用v-model时,会自动传入该值|
|isSecret|Boolean|false|是否加密显示,默认false|
|rule|RegExp|false|输入框输入值的校验|
|entireRule|RegExp|false|输入框整体校验|

### 组件事件
|时间名称|回调参数|说明|
|--|--|--|
|finish|v: 用户输入的值|当用户完成输入触发|
