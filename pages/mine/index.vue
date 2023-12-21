<template>
  <view class="mine-container" :style="{height: `${windowHeight}px`}">
    <!--顶部个人信息栏-->
    <uni-transition mode-class="zoom-in" :show="true" :duration="700">
    <view class="header-section">
      <view class="flex padding justify-between">
        <view class="flex align-center">
          <view v-if="!avatar" class="cu-avatar xl round bg-white">
            <!-- <view class="iconfont icon-touxiang text-gray icon"></view> -->
            <image v-if="!avatar" src="../../static/images/profile.jpg"" class="cu-avatar xl round" mode="widthFix">
          </view>
          <image v-if="avatar" @click="handleToAvatar" :src="avatar" class="cu-avatar xl round" mode="widthFix">
          </image>
          <view v-if="!name" @click="handleToLogin" class="login-tip">
            登录/注册
          </view>
          <view v-if="name" @click="handleToInfo" class="user-info">
            <view class="u_title">
              {{ name }}
            </view>
          </view>
        </view>
      </view>
    </view>
    </uni-transition>
    
    <view class="content-section">
    <uni-transition mode-class="zoom-in" :show="true" :duration="700">
      <view class="mine-actions grid col-2 text-center">
        <view class="action-item" @click="handleSignUpRecord">
          <uni-icons type="compose" size="30" color="#51c4c7"></uni-icons>
          <text class="text">报名记录</text>
        </view>
        <view class="action-item" @click="handleConsulting">
          <uni-icons type="paperplane" size="30" color="#51c4c7"></uni-icons>
          <text class="text">咨询</text>
        </view>
      </view>
    </uni-transition>
    <uni-transition mode-class="zoom-in" :show="true" :duration="700">
      <view class="menu-list menu-container" style="font-size: 30rpx;">
        <view v-if="name" class="list-cell list-cell-arrow" @click="handleToInfo">
          <view class="menu-item-box">
            <view class="iconfont icon-zhanghu icon"></view>
            <view class="item_content">个人信息</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow" @click="handleHelp">
          <view class="menu-item-box">
            <view class="iconfont icon-changjianwenti icon"></view>
            <view class="item_content">常见问题</view>
          </view>
        </view>
        <view v-if="name" class="list-cell list-cell-arrow" @click="updatePwd">
          <view class="menu-item-box">
            <view class="iconfont icon-mima icon"></view>
            <view class="item_content">修改密码</view>
          </view>
        </view>
        <view v-if="name" class="list-cell list-cell-arrow" @click="handleLogout">
          <view class="menu-item-box">
            <view class="iconfont icon-tuichudenglu icon"></view>
            <view class="item_content">退出登录</view>
          </view>
        </view>
        <view class="list-cell list-cell-arrow" @click="handleAbout">
          <view class="menu-item-box">
            <view class="iconfont icon-bangzhuguanyuwomen icon"></view>
            <view class="item_content">关于我们</view>
          </view>
        </view>
      </view>
    </uni-transition>
    </view>
  </view>
</template>

<script>
  import storage from '@/utils/storage'
  
  export default {
    data() {
      return {
        name: this.$store.state.user.name,
        version: getApp().globalData.config.appInfo.version
      }
    },
    computed: {
      avatar() {
        return this.$store.state.user.avatar
      },
      windowHeight() {
        return uni.getSystemInfoSync().windowHeight - 50
      }
    },
    methods: {
      handleToInfo() {
        this.$tab.navigateTo('/pages/mine/info/index')
      },
      handleToSetting() {
        this.$tab.navigateTo('/pages/mine/setting/index')
      },
      handleToLogin() {
        this.$tab.reLaunch('/pages/login')
      },
      handleToAvatar() {
        this.$tab.navigateTo('/pages/mine/avatar/index')
      },
      updatePwd() {
        this.$tab.navigateTo('/pages/mine/pwd/index')
      },
      handleLogout() {
        this.$modal.confirm('确定退出登录吗？').then(() => {
          this.$store.dispatch('LogOut').then(() => {
            this.$tab.reLaunch('/pages/index')
          })
        })
      },
      handleHelp() {
        this.$tab.navigateTo('/pages/mine/help/index')
      },
      handleAbout() {
        this.$tab.navigateTo('/pages/mine/about/index')
      },
      handleSignUpRecord() {
        this.$tab.navigateTo('/pages/mine/signup/signUpRecord')
      },
      handleConsulting() {
        this.$tab.navigateTo('/pages/mine/consulting/index')
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

  .mine-container {
    width: 100%;
    height: 100%;

    .header-section {
      padding: 15px 15px 45px 15px;
      background-color: #51c4c7;
      color: white;

      .login-tip {
        font-size: 18px;
        margin-left: 10px;
      }

      .cu-avatar {
        border: 2px solid #eaeaea;

        .icon {
          font-size: 40px;
        }
      }

      .user-info {
        margin-left: 15px;

        .u_title {
          font-size: 18px;
          line-height: 30px;
        }
      }
    }

    .content-section {
      position: relative;
      top: -50px;

      .mine-actions {
        margin: 15px 15px;
        padding-top: 20rpx;
        padding-top: 20rpx;
        border-radius: 8px;
        background-color: white;
        box-shadow: 4rpx 4rpx 4rpx 4rpx #51c4c750;
        .action-item {
          .icon {
            font-size: 28px;
          }
          .text {
            display: block;
            font-size: 13px;
            margin: 8px 0px;
            color: #51c4c7;
          }
        }
      }
      .menu-container {
          border-radius: 30rpx;
          padding: 0 20rpx;
          box-shadow: 4rpx 4rpx 4rpx 4rpx #51c4c750;
          background-color: #fff;
      }
    }
  }
  .item_content {
    margin-left: 20rpx;
  }
</style>
