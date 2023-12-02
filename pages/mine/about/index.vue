<template>
  <view class="about-container">
    <uni-transition mode-class="zoom-in" :show="true" :duration="700">
    <view class="header-section text-center">
      <image style="width: 200rpx;height: 200rpx;" src="/static/logo.png" mode="widthFix">
      </image>
      <uni-title type="h1" title="软件创新实验室" color="#51c4c7"></uni-title>
    </view>
    </uni-transition>
    <uni-transition mode-class="zoom-in" :show="true" :duration="700">
    <view class="content-section">
      <view class="menu-list" style="font-size: 30rpx;">
        <view class="list-cell">
          <view class="menu-item-box">
            <view>版本信息</view>
            <view class="text-right">v {{version}}</view>
          </view>
        </view>
        <view class="list-cell">
          <view class="menu-item-box">
            <view>官方邮箱</view>
            <view class="text-right">softinlab@163.com</view>
          </view>
        </view>
        <view class="list-cell">
          <view class="menu-item-box">
            <view>网站</view>
            <view class="text-right">{{siteUrl}}</view>
          </view>
        </view>
      </view>
    </view>
    </uni-transition>

    <uni-transition mode-class="zoom-in" :show="true" :duration="700">
    <view class="copyright">
      <view>Copyright &copy; 2023 Software Innovation All Rights Reserved.</view>
    </view>
    </uni-transition>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        url: getApp().globalData.config.appInfo.site_url,
        version: getApp().globalData.config.appInfo.version,
        siteUrl: getApp().globalData.config.appInfo.site_url
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

  .copyright {
    margin-top: 50rpx;
    text-align: center;
    line-height: 60rpx;
    color: #999;
  }

  .header-section {
    display: flex;
    padding: 30rpx 0 0;
    flex-direction: column;
    align-items: center;
  }
  .menu-list {
      border-radius: 20rpx;
      border: #51c4c7 solid 5rpx;
      padding: 0 10rpx;
      background-color: #ffffff;
  }
</style>
