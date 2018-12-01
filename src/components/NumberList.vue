<template>
  <div class="keyboard-number-container">
    <!-- 密码输入框 -->
    <ul>
      <li v-for="item in length"
          :key="item"
          :class="`keyboard-list ${(item===inputData.length+1)&&focus?'active':''}` ">
        {{inputData[item-1]|makeSecret(secret)}}
      </li>
    </ul>
    <label><input v-focus="initFocus"
                  :autofocus="initFocus"
                  :value="inputData"
                  :type="type"
                  @input="keyboardInput"
                  @focus="focus=true"
                  @blur="focus=false"/>
    </label>
  </div>
</template>

<script>
export default {
  name: 'number-list',
  props: {
    // 输入框个数
    length: {
      type: Number,
      required: false,
      default: 6,
      validator(v) {
        return v >= 1 && v <= 8;
      },
    },
    type: {
      type: String,
      required: false,
      default: 'text',
      validator(v) {
        return [ 'text', 'number', 'tel' ].includes(v);
      },
    },
    //  是否自动获取焦点
    initFocus: {
      type: Boolean,
      required: false,
      default: true,
    },
    value: {
      type: String,
      required: false,
      default: '',
    },
    // 是否加密显示
    secret: {
      type: Boolean,
      required: false,
      default: false,
    },
    rule: {
      type: RegExp,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      inputData: '',
      focus: true,
    };
  },
  filters: {
    makeSecret(value, sec) {
      return (value || value === 0) && sec ? '*' : value;
    },
  },
  directives: {
    focus: {
      inserted(el, b) {
        if (b.value) {
          el.focus();
        }
      },
    },
  },
  methods: {
    keyboardInput(e) {
      const _v = e.target.value.substring(0, this.length);
      const _oldV = this.inputData;
      // 输入规则检测
      if (this.rule && _v !== '' && !this.rule.test(_v.slice(-1))) {
        e.target.value = _oldV;
        return;
      }

      // 输入超出检测
      if (_v === _oldV && _v.length >= this.length) {
        e.target.value = _v;
        return;
      }
      this.inputData = _v;
      this.$emit('input', _v);

      // 结束输入检测
      if (_v.length >= this.length) {
        this.$emit('finish', _v);
      }
    },
  },
  updated() {
    this.inputData = this.value;
  },
  created() {
    this.inputData = this.value;
  },
};
</script>

<style scoped lang="less">
  div, ul, li, input, label {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  li {
    list-style: none;
  }

  .keyboard-number-container {
    position: relative;
    & > ul {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
    & label {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      opacity: 0 !important;
      border: none;
      background: transparent;
      & input {
        width: 100%;
        height: 100%;
        background: transparent !important;
        padding: 0 !important;
        border: none !important;
        color: transparent !important;
        text-indent: 200vw;
        margin-left: -200vw;
      }
    }
  }

  .keyboard-list {
    content: '';
    height: 12vw;
    width: 12vw;
    background-color: transparent;
    line-height: 12vw;
    border: 1px solid #3E3E3E;
    border-radius: 8px;
    font-size: 6vw;
    text-align: center;
    color: #000;
    &.active {
      content: '';
      border: 1px solid #ffba00;
      &:before {
        content: '丨';
        line-height: 1vw;
        color: #777;
        animation: shining 1s linear infinite normal;
      }
    }
  }

  @keyframes shining {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 1;
    }
  }
</style>
