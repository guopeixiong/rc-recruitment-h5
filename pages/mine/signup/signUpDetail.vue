<template>
    <view>
        <BackButton :back-to="'/pages/mine/signup/signUpRecord'"></BackButton>
        <uni-transition mode-class="zoom-in" :show="true" :duration="700">
            <view v-for="(item, index) in data">
                <uni-section v-if="item.type == 0" class="content" :title="index + 1 + '.' + item.question" titleFontSize="30rpx" subTitleFontSize="30rpx">        
                    <view class="text-answer">{{item.answer ? item.answer : '未作答'}}</view>
                    <view class="edit"><text>点击修改</text></view>
                </uni-section>
                <uni-section v-if="item.type == 1" class="content" :title="index + 1 + '.' + item.question" titleFontSize="30rpx" subTitleFontSize="30rpx">
                    <view v-if="item.optAnswer" class="opt-answer">
                        <radio color="#51c4c7" checked="true"/>
                        <label style="margin-left: 10rpx;">{{item.optAnswer}}</label>
                    </view>
                    <view class="empty-answer" v-if="!item.optAnswer">未作答</view>
                    <view class="edit"><text>点击修改</text></view>
                </uni-section>
                <uni-section v-if="item.type == 2" class="content" :title="index + 1 + '.' + item.question" titleFontSize="30rpx" subTitleFontSize="30rpx">
                    <view v-if="item.optAnswer">
                        <view v-for="item1 in item.optAnswer" class="opt-answer">
                            <radio color="#51c4c7" checked="true"/>
                            <label style="margin-left: 10rpx;">{{item1}}</label>
                        </view>
                    </view>
                    <view class="empty-answer" v-if="!item.optAnswer">未作答</view>
                    <view class="edit"><text>点击修改</text></view>
                </uni-section>
            </view>
        </uni-transition>
    </view>
</template>

<script>
import { getSignUpRecordDetail } from '@/api/signupRecord/index.js'
    export default {
        data() {
            return {
                data: []
            }
        },
        methods: {
            
        },
        created() {
            const id = this.$route.query.id
            getSignUpRecordDetail(id).then(res => {
                this.data = res.data
                this.data.forEach(record => {
                    if (record.type == 2 && record.optAnswer) {
                        record.optAnswer = record.optAnswer.split(',')
                    }
                })
            })
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
.content {
    margin: 40rpx 20rpx;
    border-radius: 30rpx;
    box-shadow: 4rpx 4rpx 4rpx 4rpx #51c4c750;
    .edit {
        color: #51c4c7;
        text-align: right;
        margin-top: 15rpx;
        padding-right: 20rpx;
        padding-bottom: 10rpx;
    }
    .text-answer{
        margin: auto auto;
        width: 90%;
        border: #51c4c780 solid 3rpx;
        border-radius: 15rpx;
        padding: 15rpx;
        font-size: 30rpx;
        
    }
    .opt-answer{
        margin-left: 35rpx;
        margin-top: 10rpx;
        margin-bottom: 10rpx;
    }
    .empty-answer{
        margin: auto auto;
        width: 90%;
        font-size: 30rpx;
        color: #33333370
    }
}
</style>
