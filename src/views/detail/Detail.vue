<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="detail-content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <Detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
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

import { itemListenerMixin } from "common/mixin";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam
} from "network/detail";

import { debounce } from "common/utils";

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
      recommends: [],
      detailTopYs: [],
      getDetailTopY: null,
      currentIndex: 0
    };
  },
  mixins: [itemListenerMixin],
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

      // 第一次获取，值不对，this.$refs.params.$el.offsetTop还没有加载dom
      // this.detailTopYs = [];
      //   this.detailTopYs.push(0);
      //   this.detailTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.detailTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.detailTopYs.push(this.$refs.recommend.$el.offsetTop);

      // 第二次获取
      // 渲染完成后获取元素的位置信息
      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的dom渲染完成，但是图片还没有加载完
      //   // 所以第一次计算的高度中，图片不包含在内
      //   this.detailTopYs = [];
      //   this.detailTopYs.push(0);
      //   this.detailTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.detailTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.detailTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.detailTopYs);
      // });
    });
    // 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list;
    });
    // 给getDetailTopY赋值一个防抖函数
    this.getDetailTopY = debounce(() => {
      this.detailTopYs = [];
      this.detailTopYs.push(0);
      this.detailTopYs.push(this.$refs.params.$el.offsetTop);
      this.detailTopYs.push(this.$refs.comment.$el.offsetTop);
      this.detailTopYs.push(this.$refs.recommend.$el.offsetTop);
      // 推入一个无限大的数方便之后遍历
      this.detailTopYs.push(Infinity);
    });
  },
  destroyed() {
    // 取消监听全局itemImgLoad事件
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  methods: {
    detailImageLoad() {
      this.getDetailTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.detailTopYs[index], 500);
    },
    contentScroll(position) {
      // 获取y值
      const positionY = -position.y;
      // positionY和组件的高度作对比
      for (let i in this.detailTopYs) {
        if (
          this.currentIndex !== i &&
          positionY > this.detailTopYs[i] &&
          positionY < this.detailTopYs[i + 1]
        ) {
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
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
