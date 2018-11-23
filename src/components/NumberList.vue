<template>
  <div class="ne-number-container" @click.stop="$emit('focus')">
   <div class="ne-number">
      <!-- 密码输入框 -->
    <ul>
      <li v-for="item in length" :key="item" type="number" :class="`ne-input-number ${(item===inputData.length+1)&&focus?'active':''}` ">
        {{inputData[item-1]|makeSecret(secret)}}
      </li>
    </ul>
   <label>
      <input v-focus="autoFocus" :value="inputData" :type="type" @input="keyboardInput" class="ne-input" @focus="focus=true" @blur="focus=false">
   </label>
   </div>
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
    },
    type: {
      type: String,
      default: 'text',
    },
    autoFocus: {
      //  是否自动获取焦点
      type: Boolean,
      default: true,
    },
    value: {
      // 外部传入值
      type: String,
      required: true,
    },
    secret: {
      // 是否加密显示
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      inputData: '',
      focus: false,
    };
  },
  watch: {
    value: {
      handler(v) {
        this.inputData = v;
      },
      immediate: true,
    },
  },
  filters: {
    makeSecret(value, sec) {
      return (value || value === 0) && sec ? '*' : value;
    },
  },
  directives: {
    focus: {
      inserted(e, boundary) {
        if (boundary.value) {
          e.focus();
        }
      },
    },
  },
  methods: {
    keyboardInput(e) {
      const v = e.target.value.slice(0, this.length);
      this.$emit('input', v);
      if (v.length >= this.length) {
        e.target.blur();
      }
    },
  },
};
</script>

<style scoped lang="less">
  .ne-number {
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
      opacity: 0;
      border: none;
      background: transparent;
      & input {
        width: 0;
        height: 0;
        border: none;
        background: transparent;
        color: transparent;
      }
    }
  }

  .ne-input-number {
    position: relative;
    padding: 0;
    box-sizing: border-box;
    height: 12vw;
    width: 12vw;
    background-color: transparent;
    line-height: 12vw;
    border: 1px solid #BFBFBF;
    border-radius: 8px;
    font-size: 6vw;
    text-align: center;
    &.active {
      border: 2px solid #ffba00;
      &:after {
        position: absolute;
        top: 50%;
        margin: -12px 0 0 -5px;
        font-size: 24px;
        height: 24px;
        width: 10px;
        line-height: 24px;
        text-align: center;
        content: '|';
        color: #666;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        animation: shining 1s linear infinite;
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
