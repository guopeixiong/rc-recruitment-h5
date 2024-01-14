<template>
  <view>
    <swiper class="swipe_container" autoplay="true" interval="3000" circular="true">
        <swiper-item v-for="item in images">
        	<image :src="item.path"></image>
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
  export default {
    data() {
        return {
            images: [
                {
                    path: "https://img95.699pic.com/photo/60080/3985.jpg_wh300.jpg!/fh/300/quality/90"
                },{
                    path: "https://img95.699pic.com/photo/60080/3985.jpg_wh300.jpg!/fh/300/quality/90"
                },{
                    path: "https://img95.699pic.com/photo/60080/3985.jpg_wh300.jpg!/fh/300/quality/90"
                },{
                    path: "https://img95.699pic.com/photo/60080/3985.jpg_wh300.jpg!/fh/300/quality/90"
                }
            ],
            data: `<h2><strong>你好</strong>!<br />欢迎你加入多益网络，实习入职指引请在附件下载，请仔细查阅并及时填写以下回执信息一、报到时间、地点<br />1、报到时间:<br /><strong>@入住手续办理时间: 2023年12月25日 9:00-19:00(工作日)，如需周末入住，请务必提前告知HR!入住地点: 待HR短信通知</strong><br />(2入职手续办理时间: 2023年12月26日 9:30<br /><span style="text-decoration: underline;"><em>2、地 点: 广州市黄埔区伴河路 90 号多益网络</em></span><br />温馨提示:请按照约定的日期准时入职!<br />3&nbsp;<br /><span style="background-color: #e67e23;">实习入职携带物品</span><br />1、身份证原件及学生证原件 (如已毕业者则携带毕业证、学位证原件) ;备注: 如已毕业但未下发毕业证，请携带学校开具的毕业证明 (加盖学校章)</h2>
<p>你好!<br />欢迎你加入多益网络，实习入职指引请在附件下载，请仔细查阅并及时填写以下回执信息一、报到时间、地点<br /><span style="text-decoration: line-through;">1、报到时间:</span><br />@入住手续办理时间: 2023年12月25日 9:00-19:00(工作日)，如需周末入住，请务必提前告知HR!入住地点: 待HR短信通知<br /><span style="background-color: #ced4d9;">(2入职手续办理时间: 2023年12月26日 9:30</span><br /><span style="background-color: #ced4d9;">2、地 点: 广州市黄埔区伴河路 90 号多益网络</span><br />温馨提示:请按照约定的日期准时入职!<br />3&nbsp;<br />实习入职携带物品<br />1、身份证原件及学生证原件 (如已毕业者则携带毕业证、学位证原件) ;备注: 如已毕业但未下发毕业证，请携带学校开具的毕业证明 (加盖学校章)</p>
<h6>你好!<br /><em><strong>欢迎你加入多益网络，实习入职指引请在附件下载，请仔细查阅并及时填写以下回执信息一、报到时间、地点</strong></em><br />1、报到时间:<br /><span style="color: #e67e23;">@入住手续办理时间: 2023年12月25日 9:00-19:00(工作日)，如需周末入住，请务必提前告知HR!入住地点: 待HR短信通知</span><br />(2入职手续办理时间: 2023年12月26日 9:30<br />2、地 点: 广州市黄埔区伴河路 90 号多益网络<br />温馨提示:请按照约定的日期准时入职!<br />3&nbsp;<br />实习入职携带物品<br />1、身份证原件及学生证原件 (如已毕业者则携带毕业证、学位证原件) ;备注: 如已毕业但未下发毕业证，请携带学校开具的毕业证明 (加盖学校章)</h6>
<p>你好!<br />欢迎你加入多益网络，实习入职指引请在附件下载，请仔细查阅并及时填写以下回执信息一、报到时间、地点<br />1、报到时间:<br />@入住手续办理时间: 2023年12月25日 9:00-19:00(工作日)，如需周末入住，请务必提前告知HR!入住地点: 待HR短信通知<br />(2入职手续办理时间: 2023年12月26日 9:30<br />2、地 点: 广州市黄埔区伴河路 90 号多益网络<br />温馨提示:请按照约定的日期准时入职!<br />3&nbsp;<br />实习入职携带物品<br />1、身份证原件及学生证原件 (如已毕业者则携带毕业证、学位证原件) ;备注: 如已毕业但未下发毕业证，请携带学校开具的毕业证明 (加盖学校章)</p>
<p>你好!<br />欢迎你加入多益网络，实习入职指引请在附件下载，请仔细查阅并及时填写以下回执信息一、报到时间、地点<br />1、报到时间:<br />@入住手续办理时间: 2023年12月25日 9:00-19:00(工作日)，如需周末入住，请务必提前告知HR!入住地点: 待HR短信通知<br />(2入职手续办理时间: 2023年12月26日 9:30<br />2、地 点: 广州市黄埔区伴河路 90 号多益网络<br />温馨提示:请按照约定的日期准时入职!<br />3&nbsp;<br />实习入职携带物品<br />1、身份证原件及学生证原件 (如已毕业者则携带毕业证、学位证原件) ;备注: 如已毕业但未下发毕业证，请携带学校开具的毕业证明 (加盖学校章)</p>
<p>你好!<br />欢迎你加入多益网络，实习入职指引请在附件下载，请仔细查阅并及时填写以下回执信息一、报到时间、地点<br />1、报到时间:<br />@入住手续办理时间: 2023年12月25日 9:00-19:00(工作日)，如需周末入住，请务必提前告知HR!入住地点: 待HR短信通知<br />(2入职手续办理时间: 2023年12月26日 9:30<br />2、地 点: 广州市黄埔区伴河路 90 号多益网络<br />温馨提示:请按照约定的日期准时入职!<br />3&nbsp;<br />实习入职携带物品<br />1、身份证原件及学生证原件 (如已毕业者则携带毕业证、学位证原件) ;备注: 如已毕业但未下发毕业证，请携带学校开具的毕业证明 (加盖学校章)</p>`
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
