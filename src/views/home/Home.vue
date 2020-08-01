<template>
  <div id="home">
    <nav-bar class="home-nav"
      ><template v-slot:center>
        <div>
          购物街
        </div>
      </template></nav-bar
    >
    <scroll class="content">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommends :recommends="recommends"></home-recommends>
      <home-feature-view></home-feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods" class="goods-list"></goods-list>
    </scroll>
  </div>
</template>

<script>
import HomeSwiper from "./childComp/HomeSwiper";
import HomeRecommends from "./childComp/HomeRecommends";
import HomeFeatureView from "./childComp/HomeFeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 1, list: [] },
        new: { page: 1, list: [] },
        sell: { page: 1, list: [] }
      },
      currentTab: "pop"
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentTab].list;
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommends,
    HomeFeatureView,
    TabControl,
    GoodsList,
    Scroll
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();

    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**
     * 网络请求
     */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentTab = "pop";
          break;
        case 1:
          this.currentTab = "new";
          break;
        case 2:
          this.currentTab = "sell";
      }
    },

    /**
     * 网络请求
     */
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        [this.banners, this.recommends] = [
          res.data.banner.list,
          res.data.recommend.list
        ];
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page++;
      });
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
  position: relative;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 100;
}

.tab-control {
  position: sticky;
  top: 44px;
  background-color: white;

  z-index: 9;
}

.goods-list {
  z-index: -1;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
