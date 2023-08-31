<template>
  <view class="about-container">
    <BackButton :backTo="'/pages/mine/index'"></BackButton>
    <view class="header-section text-center">
      <image style="width: 150rpx;height: 150rpx;" src="/static/logo200.png" mode="widthFix">
      </image>
      <uni-title type="h2" title="软件创新实验室" color="#51c4c7"></uni-title>
    </view>

    <view class="content-section">
      <view class="menu-list">
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

    <view class="copyright">
      <view>Copyright &copy; 2023 Software Innovation All Rights Reserved.</view>
    </view>
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
    background-color: #f8f8f8;
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
</style>
