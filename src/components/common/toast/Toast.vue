<template>
  <transition name="toast-trans">
    <div class="toast" v-show="isShow">
      <div>{{ message }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Toast",
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message, duration = 2000) {
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;

  width: 180px;
  text-align: center;
  border-radius: 100px;
  line-height: 30px;

  color: white;
  background-color: rgba(0, 0, 0, 0.7);

  z-index: 999;
}
.toast-trans-enter,
.toast-trans-leave-to {
  opacity: 0;
}
.toast-trans-enter-active,
.toast-trans-leave-active {
  transition: all 0.2s ease;
}
</style>
