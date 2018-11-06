<template>
  <div id="app" class="keyboard-input">
    <div class="ne-number-list" @click.stop="show=true">
      <!-- 密码输入框 -->
      <ul>
        <li v-for="item in length"
            :key="item"
            type="number"
            :class=" `ne-input-number ${item===value.length+1?'active':''}` ">
          {{ value[item-1] }}
        </li>
      </ul>
    </div>

    <!--键盘-->
    <Keyboard @add="add" @del="del" :show="show" @close="show=false"/>
  </div>
</template>

<script>
import Keyboard from './components/Keyboard';
import NumberList from './components/NumberList';

export default {
  props: {
    length: {
      type: Number,
      default: 6,
      required: false,
    },
  },
  name: 'app',
  components: {
    Keyboard,
    NumberList,
  },
  data() {
    return {
      show: false,
      value: [],
    };
  },
  methods: {
    add(v) {
      if (this.value.length >= this.length) {
        this.$emit('finish', this.value.join(''));
        return;
      }
      this.value.push(v);
      this.$emit('input', this.value.join(''));
    },
    del() {
      this.value.pop();
      this.$emit('input', this.value.join(''));
    }
  }
}
</script>

<style scoped lang="less">
  .ne-number-list {
    transition: .5s all;
  }

  .ne-number-list > ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .ne-input-number {
    padding: 0;
    height: 12vw;
    width: 12vw;
    background-color: transparent;
    line-height: 12vw;
    border: 1px solid #d1d4db;
    border-radius: 8px;
    font-size: 6vw;
    text-align: center;
    &.active {
      border: 2px solid #FFBA00;
    }
  }
</style>
