<template>
  <view class="normal-login-container">
    <BackButton :backTo="'/pages/login'"></BackButton>
    <uni-transition mode-class="zoom-in" :show="true" :duration="700">
    <view class="logo-content align-center justify-center flex">
      <image style="width: 200rpx;height: 200rpx;" :src="globalConfig.appInfo.logo" mode="widthFix">
      </image>
    </view>
    <view class="login-form-content">
      <view class="input-item flex align-center">
        <view class="iconfont icon-zhanghu icon"></view>
        <input v-model="registerForm.stuNum" class="input" type="text" placeholder="请输入学号" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-youxiang icon"></view>
        <input v-model="registerForm.email" type="text" class="input" placeholder="请输入邮箱" maxlength="20" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-mima icon"></view>
        <input v-model="registerForm.password" type="password" class="input" placeholder="请输入密码" maxlength="20" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-mima icon"></view>
        <input v-model="registerForm.confirmPassword" type="password" class="input" placeholder="请再次输入密码" maxlength="20" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-yanzhengma icon"></view>
        <input v-model="registerForm.code" type="text" class="input" placeholder="请输入邮箱验证码" maxlength="6" />
        <button @click="getCode" class="code_btn round">点击获取</button>
      </view>
      <view class="action-btn">
        <button @click="handleRegister()" class="register-btn cu-btn block bg-blue lg round">点击注册</button>
      </view>
    </view>
    </uni-transition>
  </view>
</template>

<script>
  import { register, getRegisterCode } from '@/api/login'

  export default {
    data() {
      return {
        globalConfig: getApp().globalData.config,
        registerForm: {
          stuNum: "",
          email: "",
          password: "",
          confirmPassword: "",
          code: ""
        }
      }
    },
    created() {
    },
    methods: {
      // 注册方法
      async handleRegister() {
        if (this.registerForm.stuNum === "") {
          this.$modal.msgError("请输入您的学号")
        } else if (this.registerForm.email === "") {
          this.$modal.msgError("请输入您的邮箱")
        } else if (this.registerForm.password === "") {
            this.$modal.msgError("请输入您的密码")
        } else if (this.registerForm.confirmPassword === "") {
          this.$modal.msgError("请再次输入您的密码")
        } else if (this.registerForm.password !== this.registerForm.confirmPassword) {
          this.$modal.msgError("两次输入的密码不一致")
        } else if (this.registerForm.code === "") {
          this.$modal.msgError("请输入验证码")
        } else {
          this.$modal.loading("注册中，请耐心等待...")
          this.register()
        }
      },
      // 用户注册
      async register() {
        register(this.registerForm).then(res => {
          this.$modal.closeLoading()
          uni.showModal({
          	title: "系统提示",
          	content: "账号 " + this.registerForm.stuNum + " 注册成功！",
          	success: function (res) {
          		if (res.confirm) {
                    uni.redirectTo({ url: `/pages/login` });
          		}
          	}
          })
        }).catch(() => {
         
        })
      },
      // 获取验证码
      getCode() {
        if(this.registerForm.email === "") {
            this.$modal.msgError("请输入您的邮箱")
            return
        }
        getRegisterCode(this.registerForm.email).then(res => {
            this.$modal.msgSuccess("验证码已发送");
        })
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
      text-align: center;
      padding-top: 5%;

      image {
        border-radius: 4px;
      }

      .title {
        margin-left: 10px;
      }
    }

    .login-form-content {
      text-align: center;
      margin: 20rpx auto;
      margin-top: 5%;
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

      .register-btn {
        margin-top: 40px;
        height: 45px;
        background-color: #51c4c7;
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
