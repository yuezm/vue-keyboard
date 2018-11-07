<template>
  <div class="keyboard-container" id="y-keyboard-container">
    <ul>
      <li class="keyboard-list"
          v-for="i in keyboardLength"
          :key="i"
          @click.stop="add(i)">
        {{i}}
      </li>
      <li class="keyboard-list keyboard-delete"
          @click.stop="del">
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'keyboard',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show(nowV) {
      this.defaultDom.style.transform = nowV ? 'translateY(0)' : 'translateY(40vh)';
    },
  },
  data() {
    return {
      keyboardLength: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0 ],
      defaultDom: null,
    };
  },
  methods: {
    add(v) {
      this.$emit('add', v);
    },
    del() {
      this.$emit('del');
    },
  },
  mounted() {
    this.defaultDom = document.querySelector('#y-keyboard-container');
    // 初始化执行一次,不能在watch执行，因为那时还未赋值defaultDom
    if (this.show) {
      this.defaultDom.style.transform = 'translateY(0)';
    }
    // 监听点击事件，点击别处关闭键盘
    document.addEventListener('click', () => {
      this.$emit('close');
    }, false);
  },
};
</script>

<style scoped lang="less">
  .keyboard-container {
    position: fixed;
    z-index: 99;
    bottom: 0;
    left: 0;
    padding: 2vw 0 0 2vw;
    background-color: #d1d4db;
    transition: 0.3s all;
    transform: translateY(40vh);
  }

  ul {
    display: flex;
    flex-wrap: wrap;
  }

  .keyboard-list {
    margin-right: 2vw;
    margin-bottom: 2vw;
    height: 7.7vh;
    width: 30.66vw;
    background-color: #fff;
    color: #000100;
    border-radius: 8px;
    text-align: center;
    line-height: 7.7vh;
    font-size: 6vw;
    &:active {
      background-color: #959daa;
    }
  }

  .keyboard-delete {
    font-size: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAeCAMAAABg6AyVAAAAbFBMVEUAAAAfHiIdHB4eHR8dHR4eHB4dHB4dHR8gICIdHB4dHB4dHB4dHB8eHh8hISEeHR8fHB8fHR8fHR8fHx8eHiArKyszMzMeHB8eHB8fHR8eHiAeHh4dHB4vLjDY2Nn////b29zKysq9vb28vLzkfBRpAAAAHHRSTlMAK/PW+I/llBv77N1kSCPwWlFAOTMGBb28hHlu08g5sgAAAMlJREFUOMuV1MsWgiAQgGHQyOx+s+sgYO//jnnMGIdDDfwbN99CYEDQFiVEKkolPUG7gl9VTWC31NKuDbVz+Fc1tRJtPDmxS2BS3p5ZC+XXnnbAVoz2WEBCH7uZAalzGoa06whGiznT6sG2xgX4QO2Aej1+KN7XBKL2FvGaMtTWBhbQhtoaYzVQrHKwuGf8hhAPSF5g3xPSt45sCHcouNWx436FGA+RHyQcD35EcUj54U8ff4WYvVi1zLjelUh/OG6XjOeLWv5hfAOI+HLwwOAqhAAAAABJRU5ErkJggg==) no-repeat center center;
    background-size: auto 15px
  }

</style>
