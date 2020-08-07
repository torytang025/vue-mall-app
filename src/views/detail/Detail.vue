<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="detail-content" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <Detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      />
      <detail-param-info :param-info="paramInfo" />
      <detail-comment-info :comment-info="commentInfo" />
      <goods-list :goods="recommends" />
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
import DetailCommentInfo from "./childDetail/DetailCommentInfo";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";

// import { debounce } from "common/utils";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: []
    };
  },
  created() {
    this.iid = this.$route.params.iid;

    // 请求详情数据
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
      // 获取评论信息
      if (data.rate.cRate != 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
  },

  methods: {
    detailImageLoad() {
      this.$refs.scroll.refresh();
    }
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

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-content {
  position: absolute;
  top: 44px;
  bottom: 60px;

  overflow: hidden;
}
</style>
