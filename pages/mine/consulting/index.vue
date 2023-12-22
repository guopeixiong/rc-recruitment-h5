<template>
    <view>
        <uni-transition mode-class="zoom-in" :show="true" :duration="700">
        <view class="no-data" v-if="record.length <= 0">
            <image src="../../../static/data_empty.png"></image>
            <view><text>暂无数据</text></view>
        </view>
        </uni-transition>
        <uni-transition mode-class="zoom-in" :show="true" :duration="700">
        <uni-card @click="handleDetail(item)" class="card-container" :is-shadow="false" :border="false" v-for="item in record">
            <view class="detail"><text class="status">当前状态：{{item.status === 0 ? '未回复' : '已回复'}}</text><text class="show-detail">查看详情 ></text></view>
            <view class="title">我的咨询</view>
            <view class="time"><text>发起时间: {{item.createTime}}</text></view>
        </uni-card>
        </uni-transition>
        <uni-transition mode-class="zoom-in" :show="true" :duration="700">
        <uni-load-more v-if="record.length > 0" :status="dataStatus" color="#51c4c7"></uni-load-more>
        </uni-transition>
    <uni-fab ref="fab" :popMenu=false horizontal="right" :pattern="pattern" @fabClick="addConsulting"/>
   <uni-popup ref="consultingCard" type="center">
    	<view class="consultingContainer">
            <view class="title">发起咨询</view>
    	    <textarea @input="handleTextInput" :value="qus" class="input" placeholder="请输入您的问题" auto-height=""></textarea>
    	    <view class="opt-btn">
    	        <view class="cancel" @click="cancel">取消</view>
    	        <view class="submit" @click="subConsulting">确认</view>
    	    </view>
    	</view>
    </uni-popup>
    <uni-popup ref="consultDetail" type="center">
        <view class="consult_detail">
            <view class="title">咨询详情</view>
            <view class="qus_reply">我的问题：</view>
            <view class="content">{{consult.content}}</view>
            <view class="qus_reply" v-if="consult.status === 1">回复：</view>
            <view class="content" v-if="consult.status === 1">{{consult.replyContent}}</view>
            <view class="close_btn" @click="closeDetail">关闭</view>
        </view>
    </uni-popup>
    </view>
</template>
<script>
import { getConsultingRecord, submitConsulting, consultDetail } from '@/api/consulting/consulting.js'
    export default {
        data() {
            return {
                current: 0,
                pages: 0,
                pageSzie: 10,
                dataStatus: 'more',
                record: [],
                pattern: {
                    color: '#51c4c7',
               		backgroundColor: '#fff',
               		buttonColor: '#51c4c7',
               		iconColor: '#fff'
                },
                qus: '',
                consult: {
                    content: '',
                    status: 0,
                    replyContent: ''
                }
            }
        },
        methods: {
            getRecord(pageSzie, pageNum) {
               this.dataStatus = 'loading'
               getConsultingRecord(pageSzie, pageNum).then(res => {
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
            handleDetail(item) {
                consultDetail(item.id).then(res => {
                    if (res.code !== 200) {
                        this.$modal.msgError(res.msg)
                        return
                    }
                    this.consult = res.data
                    this.$refs.consultDetail.open()
                })
            },
            addConsulting(){
                this.$refs.consultingCard.open()
            },
            subConsulting() {
                if (this.qus == "" || this.qus.match(/\s+/)) {
                    this.$modal.msgError('请输入答案')
                    return
                }
                submitConsulting({content: this.qus}).then(res => {
                    if (res.code === 200) {
                        this.$modal.msgSuccess('提交成功')
                        this.record = []
                        this.getRecord(1, this.pageSzie)
                        this.$refs.consultingCard.close()
                    } else {
                        this.$modal.msgError(res.msg)
                    }
                })
            },
            cancel() {
              this.$refs.consultingCard.close()  
            },
            handleTextInput(e) {
              this.qus = e.detail.value
            },
            closeDetail() {
                this.$refs.consultDetail.close()
            }
        },
        onReachBottom() {
            if (this.current === this.pages) {
                return
            }
            this.getRecord(this.current + 1, this.pageSzie)
        },
        created() {
            this.getRecord(1, this.pageSzie)
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
    .card-container {
        border-radius: 30rpx;
        background: url('/static/images/background/background.svg');
        background-color: #ffffff;
        box-shadow: 4rpx 4rpx 4rpx 4rpx #51c4c750;
        .title {
            margin-top: 0;
            text-align: center;
            font-size:40rpx;
            color: #51c4c7;
            font-weight: bold;
        }
        .time {
            text-align: center;
            font-size: 25rpx;
            margin-top: 30rpx;
            color: #ffffff;
        }
        .detail {
            margin-top: 0;
            margin-bottom: 0;
            color: #51c4c7;
            display: flex;
            .status {
                flex: 2;
                text-align: left;
                margin-left: 0;
            }
            .show-detail {
                flex: 1;
                text-align: right;
                margin-right: 0;
            }
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
    .consultingContainer {
            width: 600rpx;
            padding: 30rpx;
            border-radius: 30rpx;
            background-color: #fff;
            .title {
                text-align: center;
                font-size: 35rpx;
                color: #51c4c7;
                font-weight: bold;
                margin-bottom: 20rpx;
            }
            .input {
                width: 100%;
                border-radius: 25rpx;
                padding: 20rpx;
                font-size: 30rpx;
                margin-top: 20rpx;
                background-color: #33333305;
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
            }
            .opt-btn {
                margin-top: 30rpx;
                display: flex;
                align-items: center;
                .cancel {
                    flex: 1;
                    text-align: center;
                    padding: 15rpx 10rpx;
                    width: 150rpx;
                    background-color: #fff;
                    color: #51c4c7;
                    margin: 0 30px;
                    border: #51c4c7 solid 2rpx;
                    border-radius: 40rpx;
                }
                .submit {
                    flex: 1;
                    text-align: center;
                    padding: 15rpx 10rpx;
                    width: 150rpx;
                    background-color: #51c4c7;
                    color: #fff;
                    margin: 0 30px;
                    border-radius: 40rpx;
                    border: #51c4c7 solid 2rpx;
                }
            }
        }
        .consult_detail {
            border-radius: 30rpx;
            background-color: #fff;
            padding: 30rpx;
            width: 600rpx;
            .title{
                text-align: center;
                font-size: 35rpx;
                color: #51c4c7;
                font-weight: bold;
            }
            .qus_reply {
                color: #51c4c7;
            }
            .content {
                width: 90%;
                margin: 20rpx auto;
                margin-bottom: 30rpx;
                border-radius: 25rpx;
                padding: 20rpx;
                animation: glow 800ms ease-out infinite alternate;
                @keyframes glow {
                    0% {
                        border: #51c4c7 solid 2rpx;
                        border-color: #51c4c710;
                        box-shadow: 0 0 1px #51c4c710, inset 0 0 1px #51c4c710, 0 1px 0 #51c4c710;
                    }
                    100% {
                        border: #51c4c7 solid 2rpx;
                        border-color: #51c4c750;
                        box-shadow: 0 0 4px #51c4c750, inset 0 0 1px #51c4c750, 0 4px 0 #51c4c750;
                    }
                }
            }
            .close_btn {    
                text-align: center;
                padding: 15rpx 10rpx;
                width: 150rpx;
                background-color: #fff;
                color: #51c4c7;
                margin: auto auto;
                border: #51c4c7 solid 2rpx;
                border-radius: 40rpx;
            }
        }
</style>