<template>
  <div class="tab-content-detail">
    <goods-list :goods="categoryDetail"></goods-list>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";

export default {
  name: "TabContentDetail",
  props: {
    categoryDetail: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsList,
  },
};
</script>

<style scoped>
</style>
