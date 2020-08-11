<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="item in cartList"
        :key="item.iid"
        :itemInfo="item"
      />
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "./CartListItem";

export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"]),
  },
  components: {
    Scroll,
    CartListItem,
  },
  activated() {
    // 每次进入页面之后刷新可滚动高度
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.content {
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
  overflow: hidden;
}
</style>
