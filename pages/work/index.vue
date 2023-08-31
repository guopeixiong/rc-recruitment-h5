<template>
  <view class="work-container">
    <view class="img-containeralign-center justify-center flex">
        <image style="width: 320rpx; height: 180rpx;" src="../../static/BaoMingBiao.jpg"></image>
    </view>
    <view class="content-container">
        <view class="question-container" v-for="(item, index) in items">
            <view class="question">{{index + 1}}.{{item.content}}<text v-if="item.isRequire === 1" style="color: red; font-size: 40rpx; margin-left: 10rpx;">*</text></view>
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
    </view>
    <button @click="submit" class="submit-btn cu-btn block bg-blue lg round">提交</button>
  </view>
</template>

<script>
import { getSignUpForm, submitForm } from '@/api/work/index.js'
  export default {
    data() {
      return {
        items: []
      }
    },
    methods: {
      submit() {
        for (let i = 0; i < this.items.length; ++i) {
            if (this.items[i].answer == null || this.items[i].answer.length == 0) {
                if (this.items[i].isRequire == 1) {
                    this.$modal.msgError(this.items[i].content)
                    return
                }
            }
        }
        this.items.forEach(e => {
            if (e.type == 2) {
                if (e.answer.length > 0) {
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
            this.getForm()
        })
      },
      getForm() {
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
      }
    },
    created() {
      this.getForm()
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #f5f6f7;
  }
  
  .img-container {
    width: 100%;
  }
  
  .content-container {
    margin: 20rpx;
    padding: 20rpx;
    background-color: #ffffff;
    border-radius: 30rpx;
    border: #51c4c750 solid 5rpx;
    .question-container {
      .question{
        color: #515151;
        font-size: 35rpx;
        margin-left: 10rpx;
        margin-top: 20rpx;
      } 
      .question-answer{
        width: 100%;
        border-radius: 25rpx;
        padding: 20rpx;
        font-size: 30rpx;
        margin-top: 10rpx;
        background-color: #f5f6f7;
        border: #51c4c750 solid 2rpx;
        .question-option {
            margin-top: 15rpx;
        }
      }
    }
  }
  .submit-btn {
    margin: 50rpx 20rpx;
    height: 80rpx;
    background-color: #51c4c7;
  }
</style>
