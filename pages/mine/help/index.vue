<template>
    <view>
        <view class="icon"><image src="../../../static/qa.png"></image></view>
        <view class="no-data" v-if="data.length <= 0">
            <image src="../../../static/data_empty.png"></image>
            <view><text>暂无数据</text></view>
        </view>
        <view v-for="(item, index) in data" class="item-box">
            <view class="title">{{'Q：' + item.question}}</view>
            <view class="hr"></view>
            <view class="answer">{{'A：' + item.answer}}</view>
        </view>
    </view>
</template>

<script>
    import {
        getCommonQa
    } from '@/api/common.js'
    export default {
        data() {
            return {
                data: []
            }
        },
        created() {
            getCommonQa().then(res => {
                this.data = res.data
            })
        }
    }
</script>

<style lang="scss" scoped>
    page {
        background:
            radial-gradient(#51c4c750 5px, transparent 5px),
            radial-gradient(#51c4c720 5px, transparent 5px),
            linear-gradient(#f5f6f7 3px, transparent 0),
            linear-gradient(45deg, transparent 74px, transparent 75px, #51c4c730 75px, #51c4c730 76px, transparent 77px, transparent 109px),
            linear-gradient(-45deg, transparent 75px, transparent 76px, #51c4c730 76px, #51c4c730 77px, transparent 78px, transparent 109px),
            #f5f6f7;
        background-size: 109px 109px, 109px 109px, 100% 6px, 109px 109px, 109px 109px;
        background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
    }
    .icon {
        width: 150rpx;
        height: 150rpx;
        image{
            width: 150rpx;
            height: 150rpx;
        }
        margin: 20rpx auto;
    }
    .no-data {
      text-align: center;
      color: #33333350;
      font-size: 30rpx;
      margin: auto;
      margin-top: 300rpx;
      image {
        width: 400rpx;
        height: 400rpx;
      }
    }
    .item-box {
        font-size: 30rpx;
        margin: 0 20rpx;
        margin-bottom: 40rpx;
        padding: 20rpx;
        background-color: #f5f6f7;
        border-radius: 20rpx;
        box-shadow: 4rpx 4rpx 4rpx 4rpx #51c4c750;
        border: #51c4c780 solid 2rpx;
        .title {
            
        }
        .hr {
            height: 4rpx;
            width: 100%;
            margin: 20rpx auto;
            background-color: #33333310;
        }
        .answer {
        }
    }
</style>
