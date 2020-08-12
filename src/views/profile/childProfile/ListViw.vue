<template>
  <div id="list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <span class="icon">
        <img :src="item.icon" alt="icon" />
      </span>
      <div class="info">{{ item.info }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListViw",
  props: {
    listData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
#list {
  background-color: #fff;
  font-size: 14px;
  font-weight: 500;
  color: #333;
}
#list .item {
  height: 44px;
  line-height: 44px;
  position: relative;
}
.icon img {
  width: 25px;
  height: 25px;
}
.item .icon {
  margin-top: 10px;
  position: absolute;
  left: 15px;
  top: -3px;
}

.item .info {
  margin-left: 42px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-left: 5px;
}
.item:last-of-type .info {
  border-bottom: none;
}
</style>
