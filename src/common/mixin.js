import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    };
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100);
    // 将函数保存到data里方便之后取消
    this.itemImgListener = () => {
      newRefresh();
    };
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },
  deactivated() {
    // 取消监听全局itemImgLoad事件
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  }
};

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    listenShowBackTop(position, showPosition = 1000) {
      this.isShowBackTop = -position.y > showPosition;
    }
  }
};
