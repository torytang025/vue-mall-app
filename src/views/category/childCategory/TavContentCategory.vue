<template>
  <div class="tab-content-category">
    <grid-view
      :cols="3"
      :lineSpace="15"
      :v-margin="20"
      v-if="subcategories.list"
    >
      <div
        class="item"
        v-for="(item, index) in subcategories.list"
        :key="index"
      >
        <a :href="item.link">
          <img
            class="item-img"
            :src="item.image"
            alt=""
            @load="itemImgListener"
          />
          <div class="item-text">{{ item.title }}</div>
        </a>
      </div>
    </grid-view>
  </div>
</template>

<script>
import GridView from "components/common/gridview/GridView";
import { debounce } from "common/utils";

export default {
  name: "TavContentCategory",
  props: {
    subcategories: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      itemImgListner: null,
    };
  },
  components: {
    GridView,
  },
  mounted() {
    // 创造节流返回函数，等最后一个图像加载完成之后才返回
    let newLoadOver = debounce(this.loadOver, 1000);
    // 将函数保存到data里方便之后取消
    this.itemImgListener = () => {
      newLoadOver();
    };
  },
  methods: {
    loadOver() {
      this.$emit("load-over");
    },
  },
};
</script>

<style scoped>
.item {
  text-align: center;
  font-size: 12px;
}
.item-img {
  width: 80%;
}
.item-text {
  margin-top: 15px;
}
</style>
