<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <Detail-base-info :goods="goods"></Detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childDetail/DetailNavBar";
import DetailSwiper from "./childDetail/DetailSwiper";
import DetailBaseInfo from "./childDetail/DetailBaseInfo";
import DetailShopInfo from "./childDetail/DetailShopInfo";
import DetailGoodsInfo from "./childDetail/DetailGoodsInfo";
import DetailParamInfo from "./childDetail/DetailParamInfo";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop, GoodsParam } from "network/detail";

import { debounce } from "common/utils";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    Scroll,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {}
    };
  },
  methods: {},
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      // 获取顶部轮播图的图片
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 获取商家信息
      this.shop = new Shop(data.shopInfo);
      // 获取商品细节图片
      this.detailInfo = data.detailInfo;
      // 获取商品参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
    });
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 20);
    this.$bus.$on("detailImageLoads", () => {
      refresh();
    });
  }
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 60px;

  overflow: hidden;
}
</style>
