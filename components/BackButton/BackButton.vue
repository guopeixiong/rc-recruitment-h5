<template>
    <view>
        <view class="back_btn_container">
            <image @click="goBack" style="width: 100rpx; height: 50rpx;" src="../../static/back.png"></image>
        </view>
    </view>
</template>
<script>
import { baseUrl } from '../../config';
    export default {
        name:"BackButton",
        props: {
          backTo: {
              type: String,
              default: ''
          }  
        },
        methods: {
            goBack() {
                if (this.backTo == '') {
                    this.$tab.navigateBack()
                } else {
                    this.$tab.reLaunch(this.backTo)
                }
            }
        }
    }
</script>

<style lang="scss">
.back_btn_container {
    margin-top: 15rpx;
    width: 100%;
    image {
        margin-left: 15rpx;
    }
}
</style>