<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <nav-bar class="nav-bar">
      <template v-slot:center> 购物车({{ length }}) </template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childCart/CartList";
import CartBottomBar from "./childCart/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    ...mapGetters({
      length: "cartLength"
    })
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
  position: relative;
}
.nav-bar {
  position: relative;
  background-color: var(--color-tint);
  color: white;
}
</style>
