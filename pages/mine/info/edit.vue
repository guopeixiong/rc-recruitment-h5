<template>
  <view class="container">
    <BackButton :back-to="'/pages/mine/index'"></BackButton>
    <!-- <view class="example">
      <uni-forms ref="form" :model="user" labelWidth="80px">
        <uni-forms-item label="用户昵称" name="nickName">
          <uni-easyinput v-model="user.nickName" placeholder="请输入昵称" />
        </uni-forms-item>
        <uni-forms-item label="手机号码" name="phonenumber">
          <uni-easyinput v-model="user.phonenumber" placeholder="请输入手机号码" />
        </uni-forms-item>
        <uni-forms-item label="邮箱" name="email">
          <uni-easyinput v-model="user.email" placeholder="请输入邮箱" />
        </uni-forms-item>
        <uni-forms-item label="性别" name="sex" required>
          <uni-data-checkbox v-model="user.sex" :localdata="sexs" />
        </uni-forms-item>
      </uni-forms>
      <button type="primary" @click="submit" class="round" style="background-color: #51c4c7;">保存</button>
    </view> -->
    <view class="form-content">
      <view class="input-item flex align-center">
        <view class="iconfont icon-nicheng icon"></view>
        <input v-model="user.nickName" class="input" type="text" placeholder="请输入昵称" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-zhanghu icon"></view>
        <input v-model="user.fullName" type="text" class="input" placeholder="请输入姓名" maxlength="20" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-yanzhengma icon"></view>
        <input v-model="user.stuNum" class="input" type="text" placeholder="请输入学号" maxlength="30" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-shoujihaoma icon"></view>
        <input v-model="user.phone" type="text" class="input" placeholder="请输入手机号" maxlength="20" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-youxiang icon"></view>
        <input v-model="user.email" type="text" class="input" placeholder="请输入邮箱" maxlength="20" />
      </view>
      <view class="input-item flex align-center">
        <view class="iconfont icon-xingbie icon"></view>
        <radio-group @change="changeSex">
            <label class="radio_item">男</label>
            <radio color="#51c4c7" class="radio_item" value=1 :checked="user.sex === 1" />
            <label class="radio_item">女</label>
            <radio color="#51c4c7" class="radio_item" value=0 :checked="user.sex === 0"/>
        </radio-group>
      </view>
      <view class="action-btn">
        <button @click="submit" class="login-btn cu-btn block bg-blue lg round">保存</button>
      </view>
    </view>
  </view>
</template>

<script>
  import { getUserProfile } from "@/api/system/user"
  import { updateUserProfile } from "@/api/system/user"
import user from "../../../store/modules/user"

  export default {
    data() {
      return {
        user: {
          nickName: "",
          fullName: "",
          stuNum: "",
          phone: "",
          email: "",
          sex: 1
        },
        sexs: [{
          text: '男',
          value: 1
        }, {
          text: '女',
          value: 0
        }]
      }
    },
    onLoad() {
      this.getUser()
    },
    onReady() {
    },
    methods: {
      getUser() {
        getUserProfile().then(response => {
          this.user = response.data
          this.user.sex = this.user.sex ? this.user.sex : 1
          this.user.phone = this.user.phone ? this.user.phone : ""
          this.user.nickName = this.user.nickName ? this.user.nickName : ""
          this.user.fullName = this.user.fullName ? this.user.fullName : ""
        })
      },
      submit() {
        if (this.user.stuNum === "") {
            this.$modal.msgError("请输入学号")
        } else if (this.user.email === "") {
            this.$modal.msgError("请输入邮箱")
        } else if (this.user.phone === "") {
            this.$modal.msgError("请输入手机号")
        } else if (this.user.fullName === "") {
            this.$modal.msgError("请输入姓名")
        } else if (this.user.nickName === "") {
            this.$modal.msgError("请输入昵称")
        } else {
            updateUserProfile(this.user).then(response => {
                this.$store.dispatch('GetInfo')
                this.$modal.msgSuccess("修改成功")
          })
        }
      },
      changeSex(e) {
          user.sex = e.detail.value
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }
  
  .form-content {
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
    
  }
  
  .radio_item {
      font-size: 30rpx;
      margin-left: 20rpx;
  }
</style>
