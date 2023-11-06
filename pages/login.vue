<template>
  <view class="normal-login-container">
    <BackButton :backTo="'/pages/mine/index'"></BackButton>
    <uni-transition mode-class="zoom-in" :show="true" :duration="700">
    <view class="logo-content align-center justify-center flex">
      <image style="width: 200rpx;height: 200rpx;" :src="globalConfig.appInfo.logo" mode="widthFix">
      </image>
    </view>
    <view class="logo-content align-center justify-center flex">
        <image style="width: 560rpx;height: 156rpx;" :src="globalConfig.appInfo.rc_name" mode="widthFix">
        </image>
    </view>
    <view class="login-form-content">
      <view class="input-item flex align-center">
        <view class="iconfont icon-zhanghu icon"></view>
        <input v-model="loginForm.account" class="input" type="text" placeholder="请输入学号" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-mima icon"></view>
        <input v-model="loginForm.password" type="password" class="input" placeholder="请输入密码" maxlength="20" />
      </view>
      <view class="action-btn">
        <button @click="handleLogin" class="login-btn cu-btn block bg-blue lg round">登录</button>
      </view>
      <view class="reg text-center" v-if="register">
        <text @click="handleUserRegister" class="rc-color">立即注册</text>
        <text @click="handleCodeLogin" class="rc-color" style="margin-left: 20rpx;">验证码登录</text>
        <text @click="forgetPassword" class="rc-color" style="margin-left: 20rpx;">忘记密码</text>
      </view>
      <view class="xieyi text-center">
        <text class="text-grey1">登录即代表同意</text>
        <text @click="handleUserAgrement" class="rc-color">《用户协议》</text>
        <text @click="handlePrivacy" class="rc-color">《隐私协议》</text>
      </view>
    </view>
    </uni-transition>
     
  </view>
</template>

<script>
  export default {
    data() {
      return {
        codeUrl: "",
        captchaEnabled: false,
        // 用户注册开关
        register: true,
        globalConfig: getApp().globalData.config,
        loginForm: {
          account: "",
          password: "",
        }
      }
    },
    created() {
    },
    methods: {
      // 用户注册
      handleUserRegister() {
        this.$tab.redirectTo(`/pages/register`)
      },
      // 隐私协议
      handlePrivacy() {
        let site = this.globalConfig.appInfo.agreements[0]
        this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
      },
      // 用户协议
      handleUserAgrement() {
        let site = this.globalConfig.appInfo.agreements[1]
        this.$tab.navigateTo(`/pages/common/webview/index?title=${site.title}&url=${site.url}`)
      },
      // 登录方法
      async handleLogin() {
        if (this.loginForm.username === "") {
          this.$modal.msgError("请输入您的账号")
        } else if (this.loginForm.password === "") {
          this.$modal.msgError("请输入您的密码")
        } else if (this.loginForm.code === "" && this.captchaEnabled) {
          this.$modal.msgError("请输入验证码")
        } else {
          this.$modal.loading("登录中...")
          this.pwdLogin()
        }
      },
      // 密码登录
      async pwdLogin() {
        this.$store.dispatch('Login', this.loginForm).then(() => {
          this.$modal.closeLoading()
          this.loginSuccess()
        }).catch(() => {
          if (this.captchaEnabled) {
            this.getCode()
          }
        })
      },
      // 登录成功后，处理函数
      loginSuccess(result) {
        // 设置用户信息
        this.$store.dispatch('GetInfo').then(res => {
          this.$tab.reLaunch('/pages/mine/index')
        })
      },
      // 忘记密码
      forgetPassword() {
        this.$tab.reLaunch('/pages/forgetPwd')
      },
      // 验证码登录
      handleCodeLogin() {
        this.$tab.redirectTo(`/pages/loginByCode`)
      }
    }
  }
</script>

<style lang="scss">
  page {
    background:
        radial-gradient(#51c4c750 5px, transparent 5px),
        radial-gradient(#51c4c720 5px, transparent 5px),
        linear-gradient(#f5f6f7 3px, transparent 0),
        linear-gradient(45deg, transparent 74px, transparent 75px, #51c4c730 75px, #51c4c730 76px, transparent 77px, transparent 109px),
        linear-gradient(-45deg, transparent 75px, transparent 76px, #51c4c730 76px, #51c4c730 77px, transparent 78px, transparent 109px),
        #f5f6f7;
        background-size: 109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px;
        background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
  }

  .normal-login-container {
    width: 100%;

    .logo-content {
      width: 100%;
      font-size: 21px;
      padding-top: 5%;

      image {
        border-radius: 4px;
      }

    }

    .login-form-content {
      text-align: center;
      margin: 20px auto;
      margin-top: 15%;
      width: 80%;

      .input-item {
        margin: 20px auto;
        background-color: #f5f6f7;
        height: 45px;
        border-radius: 20px;
        animation: glow 800ms ease-out infinite alternate;
        @keyframes glow {
            0% {
                border-color: #51c4c710;
                box-shadow: 0 0 1px #51c4c710, inset 0 0 1px #51c4c710, 0 1px 0 #51c4c710;
            }
            100% {
                border-color: #51c4c750;
                box-shadow: 0 0 4px #51c4c750, inset 0 0 1px #51c4c750, 0 4px 0 #51c4c750;
            }
        }
        .icon {
          font-size: 38rpx;
          margin-left: 10px;
          color: #999;
        }

        .input {
          width: 100%;
          font-size: 14px;
          line-height: 20px;
          text-align: left;
          padding-left: 15px;
          font-size: 30rpx;
        }

      }

      .login-btn {
        margin-top: 40px;
        height: 45px;
        background-color: #51c4c7;
      }
      
      .reg {
        margin-top: 15px;
        font-size: 30rpx;
      }
      
      .xieyi {
        color: #333;
        margin-top: 20px;
      }
      
      .login-code {
        height: 38px;
        float: right;
      
        .login-code-img {
          height: 38px;
          position: absolute;
          margin-left: 10px;
          width: 200rpx;
        }
      }
    }
  }

</style>
