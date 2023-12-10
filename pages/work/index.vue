<template>
  <view class="work-container">
    <scroll-view :scroll-y="true">
      <view class="no-data" v-if="items.length <= 0">
        <image src="../../static/data_empty.png"></image>
        <view><text>暂无报名表数据</text></view>
      </view>
    <view class="img-containeralign-center justify-center flex" v-if="items.length > 0">
        <uni-transition mode-class="zoom-in" :show="true" :duration="700">
        <image style="width: 270rpx; height: 140rpx;" src="../../static/BaoMingBiao.png"></image>
        </uni-transition>
    </view>
    <view class="content-container" v-if="items.length > 0">
    <uni-transition mode-class="zoom-in" :show="true" :duration="700">
        <view class="question-container" v-for="(item, index) in items">
            <view class="question">{{index + 1}}.{{item.content}}<text v-if="item.isRequire === 1" style="color: red; font-size: 40rpx; margin-left: 10rpx;">*</text>{{item.type === 2 ? '（可多选）' : ''}}</view>
            <view v-if="item.type === 0">
                <textarea @input="handleTextInput($event, index)" class="question-answer" placeholder="请输入您的回答" auto-height=""></textarea>
            </view>
            <view v-if="item.type === 1" class="question-answer">
                <radio-group @change="optionSelected($event, index)">
                    <view class="question-option" v-for="option in item.options">
                        <radio color="#51c4c7" :value="option.id" :checked="item.answer !== undefined && item.answer === option.id"/>
                        <label style="margin-left: 10rpx;">{{option.content}}</label>
                    </view>
                </radio-group>
            </view>
            <view v-if="item.type === 2" class="question-answer">
                <checkbox-group @change="optionSelected($event, index)">
                    <view class="question-option" v-for="option in item.options">
                        <checkbox :value="option.id" color="#51c4c7" @click="option.selected = !option.selected" :checked="option.selected"/>
                        <label style="margin-left: 10rpx;">{{option.content}}</label>
                    </view>
                </checkbox-group>
            </view>
        </view>
    </uni-transition>
    </view>
    <uni-transition mode-class="zoom-in" :show="true" :duration="700">
    <button @click="submit" class="submit-btn cu-btn block bg-blue lg round" v-if="items.length > 0">提交</button>
    </uni-transition>
    </scroll-view>
  </view>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getSignUpForm, submitForm } from '@/api/work/index.js'
import { showConfirm } from '@/utils/common'
  export default {
    data() {
      return {
        items: []
      }
    },
    methods: {
      submit() {
        if (!getToken()) {
            console.log('')
            showConfirm('当前状态未登录，请登录后再报名').then(res => {
                if (res.confirm) {
                    uni.setStorageSync("form-cache", this.items)
                    uni.navigateTo({ url: '/pages/login' })
                }
            })
        }
        for (let i = 0; i < this.items.length; ++i) {
            if (this.items[i].answer == null || (Array.isArray(this.items[i].answer) && this.items[i].answer.length == 0)) {
                if (this.items[i].isRequire === 1) {
                    this.$modal.msgError(this.items[i].content)
                    return
                }
            }
        }
        this.items.forEach(e => {
            if (e.type == 2) {
                if (Array.isArray(e.answer) && e.answer.length > 0) {
                    let tempAnswer = ''
                    e.answer.forEach(o => {
                        tempAnswer = tempAnswer + o + ','
                    })
                    e.answer = tempAnswer.slice(0, -1)
                } else {
                    e.answer = null
                }
            }
        })
        const data = this.items.map(o => ({
            id: o.id,
            templateId: o.templateId,
            type: o.type,
            isRequire: o.isRequire,
            answer: o.answer
        }))
        submitForm(data).then(res => {
            this.$modal.msgSuccess('报名成功, 可前往个人中心查看记录')
        })
        if (uni.getStorageSync("form-cache")) {
            uni.removeStorageSync("form-cache")
        }
      },
      getForm() {
        if (uni.getStorageSync("form-cache")) {
            this.items = uni.getStorageSync("form-cache")
            return
        }
        getSignUpForm().then(res => {
            this.items = res.data
            this.items.forEach(e => {
                if (e.type === 2) {
                    this.$set(e,"answer", [])
                    e.options.forEach(o => {
                        this.$set(o, "selected", false)
                    })
                } else { 
                    this.$set(e,"answer", null)
                }
            })
        })
      },
      optionSelected(e, index) {
        this.items[index].answer = e.detail.value
      },
      handleTextInput(e, index) {
        if (e.detail.value.match(/\s+/)) {
            this.items[index].answer = null
            return
        }
        this.items[index].answer = e.detail.value
      },
      checkboxSelected(e, index) {
        this.items[index].answer = e.detail.value
      },
      reset() {
        getSignUpForm().then(res => {
            this.items = res.data
            this.items.forEach(e => {
                if (e.type === 2) {
                    this.$set(e,"answer", [])
                    e.options.forEach(o => {
                        this.$set(o, "selected", false)
                    })
                } else { 
                    this.$set(e,"answer", null)
                }
            })
        })  
      }
    },
    created() {
      this.getForm()
    },
    onShow() {
        if (!getToken()) {
            console.log('')
            showConfirm('当前状态未登录，请登录后再报名').then(res => {
                if (res.confirm) {
                    uni.navigateTo({ url: '/pages/login' })
                }
            })
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
  
  .img-container {
    width: 100%;
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
  .content-container {
    margin: 30rpx;
    margin-top: 0;
    padding: 40rpx;
    padding-top: 0;
    background-color: #ffffff;
    border-radius: 30rpx;
    border: #51c4c750 solid 4rpx;
    .question-container {
      .question{
        color: #515151;
        font-size: 35rpx;
        margin-left: 10rpx;
        margin-top: 40rpx;
      } 
      .question-answer{
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
        .question-option {
            margin-top: 15rpx;
        }
      }
    }
  }
  .submit-btn {
    margin: 0 30rpx;
    margin-top: 50rpx;
    margin-bottom: 180rpx;
    height: 80rpx;
    background-color: #51c4c7;
  }
</style>
