<template>
  <div class="home-recommends">
    <div
      v-for="recommend in recommends"
      :key="recommend.sort"
      class="home-recommends-item"
    >
      <a :href="recommend.link">
        <img :src="recommend.image" alt="recommend img" />
        <div>{{ recommend.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommends",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
.home-recommends {
  display: flex;
  font-size: 12px;
  text-align: center;

  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}

.home-recommends-item {
  flex: 1;
}

.home-recommends-item img {
  width: 80%;
  margin-bottom: 3px;
}
</style>
