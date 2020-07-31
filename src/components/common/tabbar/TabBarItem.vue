<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="pic"></slot></div>
    <div v-else><slot name="picActive"></slot></div>
    <div :style="activeStyle"><slot name="text"></slot></div>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red',
    },
  },
  data() {
    return {};
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path);
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.push('/location').catch((err) => {
        console.log(err);
      }); // 这个函数防止访问同一个路径时报错（虽然这个报错不影响应用正确运行）
      this.$router.replace(this.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}
.tab-bar-item img {
  height: 24px;
  width: 24px;
  margin-top: 3px;
  margin-bottom: 2px;

  vertical-align: middle;
}

.active {
  color: red;
}
</style>
