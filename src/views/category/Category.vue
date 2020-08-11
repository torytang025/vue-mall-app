<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        商品分类
      </template>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem" />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControlOuter"
        class="tab-control-fixed"
        v-show="isFixedTabBar"
      />
      <scroll
        class="tab-content"
        ref="scroll"
        @scroll="contentScroll"
        :probe-type="3"
      >
        <tab-content-category
          :subcategories="showSubcategory"
          @load-over="loadOver"
        ></tab-content-category>
        <tab-control
          class="tab-control-inner"
          :titles="['流行', '新款', '精选']"
          @tabClick="tabClick"
          ref="tabControlInner"
        ></tab-control>
        <tab-content-detail :category-detail="showCategoryDetail" />
      </scroll>
      <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

import TabMenu from "./childCategory/TabMenu";
import TabContentCategory from "./childCategory/TavContentCategory";
import TabContentDetail from "./childCategory/TabContentDetail";

import Scroll from "components/common/scroll/Scroll";
import { itemListenerMixin, backTopMixin } from "common/mixin";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";

export default {
  name: "Category",
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      currentType: "pop",
      tabOffsetTop: 0,
      isFixedTabBar: false,
    };
  },
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
    TabControl,
    TabContentDetail,
  },
  mixins: [itemListenerMixin, backTopMixin],
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subCategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[
        this.currentType
      ];
    },
  },
  created() {
    this.getCategory();
  },
  methods: {
    getCategory() {
      getCategory().then((res) => {
        console.log(res);
        // 获取分类数据
        this.categories = res.data.category.list;
        // 初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subCategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 请求第一个分类的数据
        this.getSubcategory(0);
      });
    },
    // 获取子分类
    getSubcategory(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        console.log(res);
        this.categoryData[index].subCategories = res.data;
        console.log(this.categoryData);
        this.categoryData = { ...this.categoryData };
        console.log(this.categoryData);

        // 获取不同类别商品
        this.getCategoryDetail("pop");
        this.getCategoryDetail("sell");
        this.getCategoryDetail("new");
      });
    },
    // 获取分类详细商品信息
    getCategoryDetail(type) {
      // 获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 发送请求
      getCategoryDetail(miniWallkey, type).then((res) => {
        console.log(res);
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },

    /**
     * 事件响应相关的方法
     */
    // 导航栏点击事件
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      // 同意两个栏的当前高亮
      this.$refs.tabControlInner.currentIndex = this.$refs.tabControlOuter.currentIndex = index;
      // 当点击tabcontrl组件时，回到分类详情的顶部
      this.$refs.scroll.scrollTo(0, -this.tabOffsetTop);
    },
    // 分类栏点击事件
    selectItem(index) {
      this.getSubcategory(index);
      // 当点击分类栏组件时，回到页面顶部
      this.$refs.scroll.scrollTo(0, 0);
    },
    // tab-content-category load完成后确定tab-control的位置
    loadOver() {
      this.tabOffsetTop = this.$refs.tabControlInner.$el.offsetTop;
    },
    contentScroll(position) {
      // 通过混入的函数，判断是否显示回顶图标
      this.listenShowBackTop(position, 800);
      // 判断是否需要固定tab control 的位置
      this.isFixedTabBar = -position.y > this.tabOffsetTop;
    },
  },
};
</script>

<style scoped>
.category {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.content {
  height: calc(100% - 44px - 49px);
  overflow: hidden;

  display: flex;
}

.tab-content {
  height: 100%;
  flex: 1;
}
.tab-control-fixed {
  background-color: white;

  position: absolute;
  top: 44px;
  left: 100px;
  right: 0;
  z-index: 9;
}
</style>
