<template>
  <view class="container">
    <BackButton :backTo="'/pages/mine/index'"></BackButton>
    <uni-transition mode-class="zoom-in" :show="true" :duration="700">
    <view class="menu-list" style="font-size: 30rpx;">
      <view class="list-cell">
        <view class="menu-item-box">
          <uni-icons type="paperplane" color="#8a8a8a" size="22"></uni-icons>
          <view style="margin-left: 20rpx;">昵称</view>
          <view class="text-right">{{user.nickName ? user.nickName : '待完善'}}</view>
        </view>
      </view>
      <view class="list-cell">
        <view class="menu-item-box">
          <uni-icons type="person" color="#8a8a8a" size="22"></uni-icons>
          <view style="margin-left: 20rpx;">姓名</view>
          <view class="text-right">{{user.fullName ? user.fullName : '待完善'}}</view>
        </view>
      </view>
      <view class="list-cell">
        <view class="menu-item-box">
          <uni-icons type="staff" color="#8a8a8a" size="22"></uni-icons>
          <view style="margin-left: 20rpx;">性别</view>
          <view class="text-right">{{user.sex}}</view>
        </view>
      </view>
      <view class="list-cell">
        <view class="menu-item-box">
          <uni-icons type="map" color="#8a8a8a" size="22"></uni-icons>
          <view style="margin-left: 20rpx;">学号</view>
          <view class="text-right">{{user.stuNum}}</view>
        </view>
      </view>
      <view class="list-cell">
        <view class="menu-item-box">
          <uni-icons type="phone" color="#8a8a8a" size="22"></uni-icons>
          <view style="margin-left: 20rpx;">手机号码</view>
          <view class="text-right">{{user.phone ? user.phone : '待完善'}}</view>
        </view>
      </view>
      <view class="list-cell">
        <view class="menu-item-box">
          <uni-icons type="email" color="#8a8a8a" size="22"></uni-icons>
          <view style="margin-left: 20rpx;">邮箱</view>
          <view class="text-right">{{user.email}}</view>
        </view>
      </view>
    </view>
    </uni-transition>
    <uni-transition mode-class="zoom-in" :show="true" :duration="700">
    <button type="primary" @click="toEdit" class="edit_btn round" style="background-color: #51c4c7;">编辑</button>
    </uni-transition>
  </view>
</template>

<script>
  import { getUserProfile } from "@/api/system/user"

  export default {
    data() {
      return {
        user: {}
      }
    },
    onLoad() {
      this.getUser()
    },
    methods: {
      getUser() {
        getUserProfile().then(response => {
          this.user = response.data
          this.user.sex = this.user.sex === undefined ? "待完善" : (this.user.sex === 1 ? "男" : "女")
        })
      },
      toEdit() {
        this.$tab.reLaunch('/pages/mine/info/edit')
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
  .edit_btn {
    margin: 30rpx;
  }
  
.container {
    .menu-list {
        border-radius: 20rpx;
        border: #51c4c7 solid 5rpx;
        padding: 0 10rpx;
        background-color: #ffffff;
    }
}
</style>
