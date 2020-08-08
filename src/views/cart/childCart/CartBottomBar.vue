<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :is-checked="isSelectAll"
        @click.native="selectAllClick"
      />
      <span>全选</span>
    </div>
    <div class="total-price">合计：{{ totalPrice }}</div>
    <div class="calculate">去计算（{{ checkLength }}）</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter(item => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return this.$store.state.cartList.every(item => item.checked);
    }
  },
  methods: {
    selectAllClick() {
      let flag = !this.isSelectAll;
      this.$store.state.cartList.forEach(item => {
        item.checked = flag;
      });
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eeeeee;
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  z-index: 10;
  line-height: 40px;
  display: flex;

  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.total-price {
  flex: 1;
  padding-left: 10px;
}
.calculate {
  width: 90px;
  background-color: var(--color-tint);
  color: white;
  text-align: center;
}
</style>
