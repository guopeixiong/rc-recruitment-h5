<template>
  <view>
  <BackButton :backTo="'/pages/mine/index'"></BackButton>
  <!-- <view class="pwd-retrieve-container">
    <uni-forms ref="form" :value="user" labelWidth="80px">
      <uni-forms-item name="oldPassword" label="旧密码">
        <uni-easyinput type="password" v-model="user.oldPassword" placeholder="请输入旧密码" />
      </uni-forms-item>
      <uni-forms-item name="newPassword" label="新密码">
        <uni-easyinput type="password" v-model="user.newPassword" placeholder="请输入新密码" />
      </uni-forms-item>
      <uni-forms-item name="confirmPassword" label="确认密码">
        <uni-easyinput type="password" v-model="user.confirmPassword" placeholder="请确认新密码" />
      </uni-forms-item>
      <button type="primary" @click="submit" style="background-color: #51c4c7;">提交</button>
    </uni-forms>
  </view> -->
  <view class="login-form-content">
      <view class="input-item flex align-center">
          <view class="iconfont icon-youxiang icon"></view>
          <input v-model="user.email" class="input" type="text" placeholder="请输入邮箱" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
          <view class="iconfont icon-mima icon"></view>
          <input v-model="user.oldPassword" class="input" type="password" placeholder="请输入旧密码" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
          <view class="iconfont icon-mima icon"></view>
          <input v-model="user.newPassword" class="input" type="password" placeholder="请输入新密码" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
          <view class="iconfont icon-mima icon"></view>
          <input v-model="user.passwordAgain" class="input" type="password" placeholder="请再次输入新密码" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
          <view class="iconfont icon-yanzhengma icon"></view>
          <input v-model="user.code" type="text" class="input" placeholder="请输入验证码" maxlength="6" />
          <button @click="getCode" class="code_btn round">点击获取</button>
      </view>
      <view class="action-btn">
          <button @click="submit" class="login-btn cu-btn block bg-blue lg round">提交</button>
      </view>
  </view>
  </view>
</template>

<script>
  import { updateUserPwd, getUpdatePwdCode } from "@/api/system/user"

  export default {
    data() {
      return {
        user: {
          email: "",
          oldPassword: "",
          newPassword: "",
          passwordAgain: "",
          code: ""
        }
      }
    },
    methods: {
      submit() {
        if (this.user.email === "") {
            this.$modal.msgError("请输入您的邮箱")
        } else if (this.user.oldPassword === "") {
            this.$modal.msgError("请输入您的旧密码")
        } else if (this.user.newPassword === "") {
            this.$modal.msgError("请输入您的新密码")
        } else if (this.user.passwordAgain === "") {
            this.$modal.msgError("请再次输入您的新密码")
        } else if (this.user.passwordAgain !== this.user.passwordAgain) {
            this.$modal.msgError("两次输入的新密码不一致")
        } else {
            updateUserPwd(this.user.email, this.user.oldPassword, this.user.newPassword, this.user.code).then(res => {
                this.$modal.msgSuccess('密码修改成功')
                this.user = {}
            })
        }
      },
      getCode() {
        if (this.user.email === "") {
            this.$modal.msgError("请输入您的邮箱")
        } else {
            getUpdatePwdCode(this.user.email).then(res => {
                this.$modal.msgSuccess('验证码已发送')
            })
        }
      },
      
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
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
</style>
