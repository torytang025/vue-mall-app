<template>
  <div class="category">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        商品分类
      </template>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" />
      <scroll class="tab-content">
        <div>
          <tab-content-category
            :subcategories="showSubcategory"
          ></tab-content-category>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import TabMenu from "./childCategory/TabMenu";
import TabContentCategory from "./childCategory/TavContentCategory";

import Scroll from "components/common/scroll/Scroll";

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
    };
  },
  components: {
    NavBar,
    TabMenu,
    Scroll,
    TabContentCategory,
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subCategories;
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
    getSubcategory(index) {
      this.currentIndex = index;
      const maitKey = this.categories[index].maitKey;
      getSubcategory(maitKey).then((res) => {
        console.log(res);
        this.categoryData[index].subCategories = res.data;
        console.log(this.categoryData);
        this.categoryData = { ...this.categoryData };
        console.log(this.categoryData);
        this.getCategoryDetail("pop");
        this.getCategoryDetail("sell");
        this.getCategoryDetail("new");
      });
    },
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
</style>
