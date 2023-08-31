<template>
  <view class="mine-container" :style="{height: `${windowHeight}px`}">
    <!--顶部个人信息栏-->
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
        <view @click="handleToInfo" class="flex align-center" v-if="name">
          <text style="font-size:30rpx;">个人信息</text>
          <view class="iconfont icon-xiangyou1"></view>
        </view>
      </view>
    </view>

    <view class="content-section">
      <view class="mine-actions grid col-3 text-center">
        <view class="action-item" @click="handleJiaoLiuQun">
          <uni-icons type="compose" size="30" color="#51c4c7"></uni-icons>
          <text class="text">报名记录</text>
        </view>
        <view class="action-item" @click="handleBuilding">
          <uni-icons type="notification" size="30" color="#51c4c7"></uni-icons>
          <text class="text">通知</text>
        </view>
        <view class="action-item" @click="handleBuilding">
          <uni-icons type="paperplane" size="30" color="#51c4c7"></uni-icons>
          <text class="text">咨询</text>
        </view>
      </view>

      <view class="menu-list" style="font-size: 30rpx;">
        <view v-if="name" class="list-cell list-cell-arrow" @click="handleToEditInfo">
          <view class="menu-item-box">
            <view class="iconfont icon-zhanghu icon"></view>
            <view class="item_content">编辑资料</view>
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
      handleToEditInfo() {
        this.$tab.navigateTo('/pages/mine/info/edit')
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
      handleJiaoLiuQun() {
        this.$modal.showToast('QQ群：①133713780、②146013835')
      },
      handleBuilding() {
        this.$modal.showToast('模块建设中~')
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f5f6f7;
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
    }
  }
  .item_content {
    margin-left: 20rpx;
  }
</style>
