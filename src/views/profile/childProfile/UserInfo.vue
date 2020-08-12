<template>
  <div id="user-info">
    <a href="#" class="clear-fix">
      <slot name="user-icon">
        <img
          class="privateImage-svg left"
          src="~assets/img/profile/avatar.svg"
          alt="user"
        />
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <span>
            <img src="~assets/img/profile/phone.svg" class="icon-mobile" />
          </span>
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <img src="~assets/img/profile/arrow.svg" class="arrow-svg right" />
    </a>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
};
</script>

<style scoped>
#user-info {
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
}

#user-info .privateImage-svg {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}

.left {
  float: left;
}

#user-info .arrow-svg {
  width: 50px;
  height: 20px;
  margin-top: 18px;
}

#user-info .login-info {
  color: #fff;
  margin: 10px 0 0 10px;

  width: auto;
}

#user-info .login-info .phone {
  position: relative;

  font-size: 13px;
  margin-top: 5px;
  margin-left: 15px;
  font-weight: 300;
}

#user-info .login-info .phone .icon-mobile {
  position: absolute;
  width: 18px;
  height: 15px;
  left: -18px;
  top: 0px;
}
</style>
