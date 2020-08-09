<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        商品分类
      </template>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories"></tab-menu>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import TabMenu from "./childCategory/TabMenu";
// import BScroll from "better-scroll";

import { getCategory } from "network/category";

export default {
  name: "Category",
  data() {
    return {
      // scroll: null,
      categories: [],
    };
  },
  components: {
    NavBar,
    TabMenu,
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      getCategory().then((res) => {
        console.log(res);
        this.categories = res.data.category.list;
      });
    },
  },
};
</script>

<style scoped>
.category {
  height: 100vh;
}
.nav-bar {
  color: white;
  background-color: var(--color-tint);

  z-index: 10;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
</style>
