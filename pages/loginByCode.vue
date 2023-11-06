<template>
  <view class="normal-login-container">
    <BackButton :backTo="'/pages/login'"></BackButton>
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
        <view class="iconfont icon-youxiang icon"></view>
        <input v-model="loginForm.email" class="input" type="text" placeholder="请输入邮箱" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-yanzhengma icon"></view>
        <input v-model="loginForm.code" type="text" class="input" placeholder="请输入验证码" maxlength="6" />
        <button @click="getLoginCode" class="code_btn round">点击获取</button>
      </view>
      <view class="action-btn">
        <button @click="handleLogin" class="login-btn cu-btn block bg-blue lg round">登录</button>
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
import { getLoginCode } from '@/api/login.js'
  export default {
    data() {
      return {
        globalConfig: getApp().globalData.config,
        loginForm: {
          email: "",
          code: "",
        }
      }
    },
    created() {
    },
    methods: {
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
        if (this.loginForm.email === "") {
          this.$modal.msgError("请输入您的邮箱")
        } else if (this.loginForm.code === "") {
          this.$modal.msgError("请输入您的验证码")
        } else {
          this.$modal.loading("登录中，请耐心等待...")
          this.login()
        }
      },
      login() {
        this.$modal.loading()
        this.$store.dispatch('LoginByCode', this.loginForm).then(() => {
          this.$modal.closeLoading()
          this.loginSuccess()
        }).catch(() => {})
      },
      loginSuccess() {
        // 设置用户信息
        this.$store.dispatch('GetInfo').then(res => {
          this.$tab.reLaunch('/pages/mine/index')
        })
      },
      getLoginCode() {
        if (this.loginForm.email === "") {
          this.$modal.msgError("请输入您的邮箱")
        } else {
            getLoginCode(this.loginForm.email).then(res => {
                this.$modal.msgSuccess('验证码已发送')
            })
        }
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
        
        .code_btn {
          width: 300rpx;
          height: 60rpx;
          line-height: 60rpx;
          background-color: #51c4c7;
          font-size: 30rpx;
          margin-right: 10px;
          color: #ffffff;
        }

        .input {
          width: 100%;
          font-size: 30rpx;
          line-height: 20px;
          text-align: left;
          padding-left: 15px;
        }

      }

      .login-btn {
        margin-top: 40px;
        height: 45px;
        background-color: #51c4c7;
      }
      
      .reg {
        margin-top: 15px;
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
