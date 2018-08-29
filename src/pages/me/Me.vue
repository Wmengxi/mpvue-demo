<template>
  <div class="container">
    <div v-if="!userInfo" class="userlogin">
      <button class="loginbtn" open-type="getUserInfo" lang="zh_CN"
        bindgetuserinfo="onGotUserInfo">登录</button>
        <p>游客模式</p>
    </div>
    <div class="userinfo" v-else>
      <img :src="userInfo.avatarUrl" alt="">
      <p>{{userInfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button v-if="userInfo" class="btn" @click="scanBook">添加图书</button>
  </div>
</template>
<script>
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import {showSuccess, post, showModal} from '@/util'
import YearProgress from '@/components/YearProgress'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    login () {
      const self = this
      // 设置登录地址
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: function (userInfo) {
          // console.log(userInfo)   也能获取到openId
          qcloud.request({
            url: config.userUrl,
            login: true,
            success (userRes) {
              showSuccess('登录成功')
              // userRes.data.data为了获取到openId
              wx.setStorageSync('userInfo', userRes.data.data)
              self.userInfo = userRes.data.data
              // console.log(userRes)
            }
          })
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      })
    },
    async addBook (isbn) {
      const res = await post('/weapp/addbook', {
        isbn,
        openId: this.userInfo.openId
      })
      showModal('添加成功', `${res.title}添加成功`)
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
            // console.log(res.result)
          }
        }
      })
    }
  },
  onGotUserInfo (event) {
    this.login()
  },
  // onShow () {
  //   let userInfo = wx.getStorageSync('userInfo')
  //   console.log(userInfo)
  //   if (userInfo) {
  //     this.userInfo = userInfo
  //   }
  // }
  created () {
    this.userInfo = wx.getStorageSync('userInfo')
  }

}
</script>
<style lang="scss">
.container {
  padding: 0 30rpx;
  .userinfo {
    margin-top: 100rpx;
    margin-bottom: 50rpx;
    text-align: center;
    img {
      width: 150rpx;
      height: 150rpx;
      margin: 20px;
      border-radius: 50%;
    }
  }
  .userlogin {
    margin-top: 100rpx;
    margin-bottom: 50rpx;
    text-align: center;
    .loginbtn {
      margin-top: 20px;
      margin-bottom: 20px;
      color: white;
      background: #EA5A49;
      border-radius: 50%;
      font-size: 16px;
      line-height: 150rpx;
      height: 150rpx;
      width: 150rpx;
    }
    .loginbtn:active {
      background: #FA5A49;
    }
  }
}


</style>
