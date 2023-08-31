<template>
  <view class="container">
    <BackButton :backTo="'/pages/mine/index'"></BackButton>
    <uni-list>
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'paperplane', color: '#8a8a8a'}" title="昵称" :rightText="user.nickName ? user.nickName : '待完善'
      " />
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'person', color: '#8a8a8a'}" title="姓名" :rightText="user.fullName ? user.fullName : '待完善'" />
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'staff', color: '#8a8a8a'}" title="性别" :rightText="user.sex" />
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'map', color: '#8a8a8a'}" title="学号" :rightText="user.stuNum" />
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'phone', color: '#8a8a8a'}" title="手机号码" :rightText="user.phone ? user.phone : '待完善'" />
      <uni-list-item showExtraIcon="true" :extraIcon="{type: 'email', color: '#8a8a8a'}" title="邮箱" :rightText="user.email" />
    </uni-list>
    <button type="primary" @click="toEdit" class="edit_btn round" style="background-color: #51c4c7;">编辑</button>
  </view>
</template>

<script>
  import { getUserProfile } from "@/api/system/user"

  export default {
    data() {
      return {
        user: {}
      }
    },
    onLoad() {
      this.getUser()
    },
    methods: {
      getUser() {
        getUserProfile().then(response => {
          this.user = response.data
          this.user.sex = this.user.sex === undefined ? "待完善" : (this.user.sex === 1 ? "男" : "女")
        })
      },
      toEdit() {
        this.$tab.reLaunch('/pages/mine/info/edit')
      }
    }
  }
</script>

<style lang="scss">
  page {
    background-color: #ffffff;
  }
  .edit_btn {
    margin: 30rpx;
  }
</style>
