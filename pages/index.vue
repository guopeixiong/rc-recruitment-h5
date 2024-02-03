<template>
  <view>
    <swiper class="swipe_container" autoplay="true" interval="3000" circular="true">
        <swiper-item v-for="item in images">
        	<image :src="url + item"></image>
        </swiper-item>
    </swiper>
    <view class="consult_join">
        <view class="consult" @click="toConsult">
            <image src="../static/consulting.png" mode=""></image>
            <view class="consult_text">咨询</view>
        </view>
        <view class="join" @click="toJoin">
            <image src="../static/join_us.png"></image>
            <view class="join_text">报名</view>
        </view>
    </view>
    <view class="introduction">
        <rich-text :nodes="data"></rich-text>
    </view>
    <view class="last">软件创新实验室</view>
  </view>
</template>

<script>
import { getIndexIamge, getIndexText } from "@/api/common"
import config from '@/config'
  export default {
    data() {
        return {
            images: [],
            data: '',
            url: config.baseUrl + '/resources'
        }
    },
    methods: {
        toConsult() {
            this.$tab.navigateTo('/pages/mine/consulting/index')
        },
        toJoin() {
            this.$tab.navigateTo('/pages/work/index')
        }
    },
    onLoad: function() {
        getIndexIamge().then(res => {
            this.images = res.data
        })
        getIndexText().then(res => {
            this.data = res.data
        })
    }
  }
</script>

<style lang="scss">
.swipe_container {
    width: 750rpx;
    height: 375rpx;
    image {
        width: 750rpx;
        height: 375rpx;
    }
}
.consult_join {
    display: flex;
    .consult {
        margin: 20rpx 0rpx;
        margin-left: 30rpx;
        margin-right: 20rpx;
        border-radius: 30rpx;
        padding: 20rpx 0rpx;
        box-shadow: 4rpx 4rpx 4rpx 4rpx #33333330;
        padding: auto;
        text-align: center;
        background-color: #51c4c7;
        flex: 1;
        image {
            width: 100rpx;
            height: 100rpx;
        }
        .consult_text {
            color: #fff;
        }
    }
    .join {
        margin: 20rpx 0rpx;
        margin-right: 30rpx;
        margin-left: 20rpx;
        padding: 20rpx 0rpx;
        border-radius: 30rpx;
        box-shadow: 4rpx 4rpx 4rpx 4rpx #33333330;
        padding: auto;
        text-align: center;
        background-color: #51c4c7;
        flex: 1;
        image {
            width: 100rpx;
            height: 100rpx;
        }
        .join_text {
            color: #fff;
        }
    }
}
.introduction {
    width: 690rpx;
    margin: 0 auto;
    padding: 20rpx;
    border: #51c4c7 solid 5rpx;
    border-radius: 30rpx;
    box-shadow: 4rpx 4rpx 4rpx 4rpx #33333330;
}
.last{
    width: 100%;
    height: 200rpx;
    text-align: center;
    margin-top: 100rpx;
}
</style>
