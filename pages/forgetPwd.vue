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
                <input v-model="form.email" class="input" type="text" placeholder="请输入邮箱" maxlength="30" />
            </view>
            <view class="input-item flex align-center">
                <view class="iconfont icon-mima icon"></view>
                <input v-model="form.password" class="input" type="password" placeholder="请输入新密码" maxlength="30" />
            </view>
            <view class="input-item flex align-center">
                <view class="iconfont icon-mima icon"></view>
                <input v-model="form.passwordAgain" class="input" type="password" placeholder="请再次输入新密码" maxlength="30" />
            </view>
            <view class="input-item flex align-center">
                <view class="iconfont icon-yanzhengma icon"></view>
                <input v-model="form.code" type="text" class="input" placeholder="请输入验证码" maxlength="6" />
                <button @click="getCode" class="code_btn round">点击获取</button>
            </view>
            <view class="action-btn">
                <button @click="submit" class="login-btn cu-btn block bg-blue lg round">提交</button>
            </view>
        </view>
        </uni-transition>
    </view>
</template>

<script>
import { getRestPwdCode, resetPwd } from '@/api/login.js'
  export default {
    data() {
      return {
        globalConfig: getApp().globalData.config,
        form: {
          email: "",
          password: "",
          passwordAgain: "",
          code: "",
        }
      }
    },
    methods: {
      getCode() {
        if (this.form.email === "") {
            this.$modal.msgError("请输入您的邮箱")
        } else {
            getRestPwdCode(this.form.email).then(res => {
                this.$modal.msgSuccess('验证码已发送')
            })
        }
      },
      submit() {
        if (this.form.email === "") {
            this.$modal.msgError("请输入您的邮箱")
        } else if (this.form.password === "") {
            this.$modal.msgError("请输入您的新密码")
        } else if (this.form.passwordAgain === "") {
            this.$modal.msgError("请再次输入您的新密码")
        } else if (this.form.password !== this.form.passwordAgain) {
            this.$modal.msgError("两次输入密码不一致")
        } else if (this.form.code === "") {
            this.$modal.msgError("请输入验证码")
        } else {
            resetPwd(this.form.email, this.form.password, this.form.code).then(res => {
                this.$modal.msgSuccess('密码重置成功')
                this.form = {}
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
