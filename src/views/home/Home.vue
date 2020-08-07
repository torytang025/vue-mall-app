<template>
  <div id="home">
    <nav-bar class="home-nav"
      ><template v-slot:center>
        <div>
          购物街
        </div>
      </template></nav-bar
    >
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControlOuter"
      class="tab-control-fixed"
      v-show="isFixedTabBar"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <home-recommends :recommends="recommends"></home-recommends>
      <home-feature-view></home-feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControlInner"
        class="tab-control-inner"
      ></tab-control>
      <goods-list :goods="showGoods" class="goods-list"></goods-list>
    </scroll>

    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
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
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

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
      currentTab: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isFixedTabBar: false,
      scrollY: 0
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
    Scroll,
    BackTop
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();

    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 对refresh进行防抖处理
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    // 监听item中图片加载完成
    this.$bus.$on("goodsItemImageLoad", () => {
      refresh();
    });

    // 获取tabControl的offsetTop
    // 所有组件都有一个 $el属性：用于获取组件中的元素
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.scrollY);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.scrollY = this.$refs.scroll.getScrollY();
  },
  methods: {
    /**
     * 事件监听
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
      this.$refs.tabControlInner.currentIndex = this.$refs.tabControlOuter.currentIndex = index;
      // 当点击tabcontrl组件时，回到商品栏顶部
      this.$refs.scroll.scrollTo(0, -this.tabOffsetTop);
    },

    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    // 监听滚动
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      this.isFixedTabBar = -position.y > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentTab);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControlInner.$el.offsetTop;
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
  position: relative;
  height: 100vh;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;
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

  overflow: hidden;
}
.tab-control-inner {
  background-color: white;
}

.tab-control-fixed {
  background-color: white;
  position: relative;
  z-index: 9;
}
</style>
