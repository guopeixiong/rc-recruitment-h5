<template>
    <view class="container">
        <BackButton></BackButton>
        <uni-transition mode-class="zoom-in" :show="true" :duration="700">
            <view v-for="(item, index) in data">
                <uni-section v-if="item.type == 0" class="content" :title="index + 1 + '.' + item.question" titleFontSize="30rpx" subTitleFontSize="30rpx">
                    <view class="text-answer">{{item.answer ? item.answer : '未作答'}}</view>
                    <view class="edit"><text @click="handleEdit(item)">点击修改</text></view>
                </uni-section>
                <uni-section v-if="item.type == 1" class="content" :title="index + 1 + '.' + item.question" titleFontSize="30rpx" subTitleFontSize="30rpx">
                    <view v-if="item.optAnswer" class="opt-answer">
                        <radio color="#51c4c7" checked="true"/>
                        <label style="margin-left: 10rpx;">{{item.optAnswer}}</label>
                    </view>
                    <view class="empty-answer" v-if="!item.optAnswer">未作答</view>
                    <view class="edit"><text @click="handleEdit(item)">点击修改</text></view>
                </uni-section>
                <uni-section v-if="item.type == 2" class="content" :title="index + 1 + '.' + item.question + '（可多选）'" titleFontSize="30rpx" subTitleFontSize="30rpx">
                    <view v-if="item.optAnswer">
                        <view v-for="item1 in item.optAnswer" class="opt-answer">
                            <radio color="#51c4c7" checked="true"/>
                            <label style="margin-left: 10rpx;">{{item1}}</label>
                        </view>
                    </view>
                    <view class="empty-answer" v-if="!item.optAnswer">未作答</view>
                    <view class="edit"><text @click="handleEdit(item)">点击修改</text></view>
                </uni-section>
            </view>
        </uni-transition>
        <uni-popup ref="checkUpdate" type="dialog">
        	<uni-popup-dialog type="error" cancelText="取消" confirmText="确定" title="系统提示" :content="updateTimes" 
            @confirm="toUpdateQuestion"></uni-popup-dialog>
        </uni-popup>
        <uni-popup ref="updateContainer" type="center">
            <view class="updateContainer">
                <view>{{qus.content}}</view>
                <view class="text" v-if="qus.type === 0">
                    <textarea @input="handleTextInput" :value="qus.answer" class="input" placeholder="请输入您的回答" auto-height=""></textarea>
                </view>
                <view class="single" v-if="qus.type === 1">
                    <radio-group @change="optionSelected">
                        <view class="question-option" v-for="option in options">
                            <radio color="#51c4c7" :value="option.id" :checked="qus.answer !== undefined && qus.answer === option.id"/>
                            <label style="margin-left: 10rpx;">{{option.content}}</label>
                        </view>
                    </radio-group>
                </view>
                <view class="multi" v-if="qus.type === 2">
                    <checkbox-group @change="optionSelected">
                        <view class="question-option" v-for="option in options">
                            <checkbox :value="option.id" color="#51c4c7" @click="option.selected = !option.selected" :checked="option.selected"/>
                            <label style="margin-left: 10rpx;">{{option.content}}</label>
                        </view>
                    </checkbox-group>
                </view>
                <view class="opt-btn">
                    <view class="cancel" @click="cancel">取消</view>
                    <view class="submit" @click="submit">确认</view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
import { getSignUpRecordDetail, getQuestionUpdateTimes, updateQuestion, getOptions } from '@/api/signupRecord/index.js'
    export default {
        data() {
            return {
                data: [],
                updateTimes: "",
                qus: {
                    id: "",
                    answer: "",
                    type: 0,
                    content: ""
                },
                options: []
            }
        },
        methods: {
          handleEdit(item) {
            this.qus.id = item.questionId
            this.qus.type = item.type
            this.qus.content = item.question
            if (item.type === 0) {
                this.qus.answer = item.answer
            }
            getQuestionUpdateTimes(item.questionId).then(res => {
                this.updateTimes = '此问题剩余修改次数' + res.data + '次，确定要修改吗'
                this.$refs.checkUpdate.open()
            }) 
          },
          toUpdateQuestion() {
            if (this.qus.type == 0) {
                this.toUpdateTextQus()
            } else {
                this.toUpdateSelectQue()
            }
          },
          toUpdateTextQus() {
            this.$refs.updateContainer.open() 
          },
          toUpdateSelectQue() {
            getOptions(this.qus.id).then(res => {
                this.options = res.data
            })
            if (this.qus.type === 2) {
                this.options.forEach(e => {
                    this.$set(e, "selected", false)
                })
            }
            this.$refs.updateContainer.open()
          },
          cancel() {
            this.$refs.updateContainer.close()  
          },
          submit() {
            if (this.qus.type === 0 && (this.qus.answer == "" || this.qus.answer.match(/\s+/))) {
                this.$modal.msgError('请输入答案')
                return
            }
            if (this.qus.answer == "" || this.qus.length === 0) {
                this.$modal.msgError('请选择答案')
                return
            }
            // 多选题处理答案
            if (this.qus.type === 2) {
                let tempAnswer = ''
                this.qus.answer.forEach(o => {
                    tempAnswer = tempAnswer + o + ','
                })
                this.qus.answer = tempAnswer.slice(0, -1)
            }
            updateQuestion({id: this.qus.id, answer: this.qus.answer}).then(res => {
                if (res.code === 200) {
                    this.$modal.msgSuccess('修改成功')
                    this.pageInit()
                } else {
                    this.$modal.msgError('修改失败')
                }
                this.$refs.updateContainer.close()
            })
          },
          handleTextInput(e) {
            this.qus.answer = e.detail.value
          },
          optionSelected(e) {
            this.qus.answer = e.detail.value
          },
          pageInit() {
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
        },
        created() {
            this.pageInit()
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
.container {
    padding-bottom: 50rpx;
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
    .updateContainer {
        width: 600rpx;
        padding: 30rpx;
        border-radius: 30rpx;
        background-color: #fff;
        .text {
            margin-bottom: 40rpx;
            .input {
                width: 100%;
                border-radius: 25rpx;
                padding: 20rpx;
                font-size: 30rpx;
                margin-top: 10rpx;
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
        }
        .single {
            margin-top: 10rpx;
            margin-bottom: 20rpx;
            .question-option {
                margin-top: 10rpx;
            }
        }
        .multi {
            margin-top: 10rpx;
            margin-bottom: 20rpx;
            .question-option {
                margin-top: 10rpx;
            }
        }
        .opt-btn {
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
}
</style>
