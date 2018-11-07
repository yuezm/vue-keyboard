<template>
  <div class="ne-number-list" @click.stop="$emit('focus')">
    <!-- 密码输入框 -->
    <ul>
      <li v-for="item in length" :key="item" type="number"
          :class=" `ne-input-number ${item===value.length+1?'active':''}` ">
        {{value[item-1]|makeSecret(secret)}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'number-list',
  props: {
    length: {
      type: Number,
      required: false,
      default: 6,
    },
    value: {
      type: Array,
      required: false,
      default() {
        return [];
      },
    },
    secret: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  filters: {
    makeSecret(value, sec) {
      return (value || value === 0) && sec ? '*' : value;
    },
  },
};
</script>

<style scoped lang="less">
  .ne-number-list {
    transition: 0.5s all;
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
    border: 1px solid #BFBFBF;
    border-radius: 8px;
    font-size: 6vw;
    text-align: center;
    &.active {
      border: 2px solid #ffba00;
    }
  }
</style>
