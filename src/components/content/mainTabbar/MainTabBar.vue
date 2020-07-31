<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <template v-slot:pic>
        <img src="~assets/img/tabbar/home.svg" alt="home" />
      </template>
      <template v-slot:picActive>
        <img src="~assets/img/tabbar/home_active.svg" alt="homeActive" />
      </template>
      <template v-slot:text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <template v-slot:pic>
        <img src="~assets/img/tabbar/category.svg" alt="category" />
      </template>
      <template v-slot:picActive>
        <img
          src="~assets/img/tabbar/category_active.svg"
          alt="categoryActive"
        />
      </template>
      <template v-slot:text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <template v-slot:pic>
        <img src="~assets/img/tabbar/shopcart.svg" alt="shopcart" />
      </template>
      <template v-slot:picActive>
        <img
          src="~assets/img/tabbar/shopcart_active.svg"
          alt="shopcartActive"
        />
      </template>
      <template v-slot:text>
        <div>购物车</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <template v-slot:pic>
        <img src="~assets/img/tabbar/profile.svg" alt="profile" />
      </template>
      <template v-slot:picActive>
        <img src="~assets/img/tabbar/profile_active.svg" alt="profileActive" />
      </template>
      <template v-slot:text>
        <div>个人</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  name: "MainTabBar",
  data() {
    return {};
  },
  components: {
    TabBar,
    TabBarItem
  }
};
</script>

<style scoped></style>
