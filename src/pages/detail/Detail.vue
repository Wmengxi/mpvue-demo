<template>
  <div>
    <BookInfo :info="info"></BookInfo>
    <CommentList :comments="commentList"></CommentList>
    <div class="comment" v-if="showAdd">
      <textarea class="textarea"
                v-model="comment"
                :maxlength="100"
                placeholder="请输入图书短评">
      </textarea>
      <div class="location">
        地理位置：
        <switch color="#EA5A49" :checked="location" @change="getGeo"></switch>
        <span class="text-primary">{{location}}</span>
      </div>
      <div class="phone">
        手机型号：
        <switch color="#EA5A49" :checked="phone" @change="getPhone"></switch>
        <span class="text-primary">{{phone}}</span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div class="text-footer" v-else>
      未登录或者已经评论过啦
    </div>
    <div class="share-btn">
      <button open-type="share" class="btn">
        转发给好友
      </button>
    </div>
  </div>
</template>

<script>
import {get, post, showModal} from '@/util'
import BookInfo from '@/components/BookInfo'
import CommentList from '@/components/CommentList'

export default {
  components: {BookInfo, CommentList},
  data () {
    return {
      userinfo: {},
      bookid: '',
      info: {},
      comment: '',
      commentList: [],
      location: '',
      phone: ''
    }
  },
  methods: {
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      wx.showShareMenu({
        withShareTicket: true
      })
      this.info = info
    },
    async getComments () {
      const comments = await get('/weapp/commentlist', {bookid: this.bookid})
      this.commentList = comments.list
    },
    getGeo (e) {
      if (e.target.value) {
        const ak = 'RLnN690DvLpOuLilBFeyCbHzezKfPUIz'
        let url = 'http://api.map.baidu.com/geocoder/v2/'
        wx.getLocation({
          success: geo => {
            wx.request({
              url,
              data: {
                ak,
                location: `${geo.latitude}, ${geo.longitude}`,
                output: 'json'
              },
              success: res => {
                if (res.data.status === 0) {
                  this.location = res.data.result.addressComponent.city
                } else {
                  this.location = '未知位置'
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        this.phone = phoneInfo.model
      } else {
        this.phone = ''
      }
    },
    async addComment () {
      if (!this.comment) {
        return
      }
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phone,
        location: this.location
      }
      try {
        await post('/weapp/addcomment', data)
        this.comment = ''
        this.getComments()
      } catch (e) {
        showModal('评论失败', e.msg)
      }
    }
  },
  computed: {
    showAdd () {
      // 未登录
      if (!this.userinfo.openId) {
        return false
      }
      // 评论列表中有自己的openid
      if (this.commentList.filter(v => v.openid === this.userinfo.openId).length) {
        return false
      }
      return true
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.userinfo = userInfo
    }
    this.getDetail()
    this.getComments()
  }
}
</script>

<style lang="scss">
.comment {
  font-size: 14px;
  padding: 0 5px;
  .textarea {
    width: 100%;
    height: 220rpx;
    background-color: #eee;
    padding: 20rpx;
    box-sizing: border-box;
  }
  .location {
    margin-top: 10px;
  }
  .phone {
    margin: 10px 0;
  }
}
.share-btn {
  padding: 0 5px;
}
</style>
