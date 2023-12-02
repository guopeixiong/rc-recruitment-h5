<template>
  <view class="container">
    <uni-transition mode-class="zoom-in" :show="true" :duration="700">
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
            <radio color="#51c4c770" class="radio_item" value=1 :checked="user.sex === 1" />
            <label class="radio_item">女</label>
            <radio color="#51c4c770" class="radio_item" value=0 :checked="user.sex === 0"/>
        </radio-group>
      </view>
      <view class="action-btn">
        <button @click="submit" class="login-btn cu-btn block bg-blue lg round">保存</button>
      </view>
    </view>
    </uni-transition>
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
                this.$tab.reLaunch('/pages/mine/info/index')
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
    background:
        radial-gradient(#51c4c720 5px, transparent 5px),
        radial-gradient(#51c4c720 5px, transparent 5px),
        linear-gradient(#f5f6f7 3px, transparent 0),
        linear-gradient(45deg, transparent 74px, transparent 75px, #51c4c730 75px, #51c4c730 76px, transparent 77px, transparent 109px),
        linear-gradient(-45deg, transparent 75px, transparent 76px, #51c4c730 76px, #51c4c730 77px, transparent 78px, transparent 109px),
        #f5f6f7;
        background-size: 109px 109px, 109px 109px,100% 6px, 109px 109px, 109px 109px;
        background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
  }
  
  .form-content {
    text-align: center;
    margin: 20px auto;
    margin-top: 15%;
    width: 80%;
  
    .input-item {
      margin: 20px auto;
      background-color: #fff;
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
