<template>
    <view>
        <BackButton></BackButton>
        <uni-transition mode-class="zoom-in" :show="true" :duration="700">
        <view class="no-data" v-if="record.length <= 0">
            <image src="../../../static/data_empty.png"></image>
            <view><text>暂无数据</text></view>
        </view>
        </uni-transition>
        <uni-transition mode-class="zoom-in" :show="true" :duration="700">
        <uni-card @click="handleDetail(item.id)" class="card-container" :is-shadow="false" :border="false" v-for="item in record">
            <view class="detail"><text>查看详情 ></text></view>
            <view class="title">报名表</view>
            <view class="time"><text>报名时间: {{item.createTime}}</text></view>
        </uni-card>
        </uni-transition>
        <uni-transition mode-class="zoom-in" :show="true" :duration="700">
        <uni-load-more v-if="record.length > 0" :status="dataStatus" color="#51c4c7"></uni-load-more>
        </uni-transition>
    </view>
</template>

<script>
import { getSignUpRecord } from '@/api/signupRecord/index.js'
    export default {
        data() {
            return {
                current: 0,
                pages: 0,
                pageSzie: 10,
                dataStatus: 'more',
                record: []
            }
        },
        methods: {
            getRecord() {
                this.dataStatus = 'loading'
                getSignUpRecord(this.current + 1, this.pageSzie).then(res => {
                    this.record.push(...res.data.records)
                    this.current = Number(res.data.current)
                    this.pages = Number(res.data.pages)
                    if (this.current === this.pages) {
                        this.dataStatus = 'no-more'
                    } else {
                        this.dataStatus = 'more'
                    }
                })
            },
            handleDetail(id) {
                this.$tab.navigateTo('/pages/mine/signup/signUpDetail?id=' + id)
            }
        },
        onReachBottom() {
            if (this.current === this.pages) {
                return
            }
            this.getRecord()
        },
        created() {
            this.getRecord()
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
        background-size: 109px 109px, 109px 109px, 100% 6px, 109px 109px, 109px 109px;
        background-position: 54px 55px, 0px 0px, 0px 0px, 0px 0px, 0px 0px;
    }

    .card-container {
        border-radius: 30rpx;
        background: url('/static/images/background/background.svg');
        background-color: #ffffff;
        box-shadow: 4rpx 4rpx 4rpx 4rpx #51c4c750;
        .title {
            margin-top: 0;
            text-align: center;
            font-size:40rpx;
            color: #51c4c799;
            font-weight: bold;
        }
        .time {
            text-align: center;
            font-size: 25rpx;
            margin-top: 30rpx;
            color: #ffffff;
        }
        .detail {
            text-align: right;
            margin-top: 0;
            margin-bottom: 0;
            color: #51c4c799;
        }
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
</style>
