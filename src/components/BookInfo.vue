<template>
  <div class="bookinfo">
    <div class="thumb">
      <img class="back" :src="info.image" mode="aspectFill">
      <img class="img" :src="info.image" mode="aspectFit">
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
      </div>
    </div>
    <div class="detail">
      <img :src="userinfo.avatar" class="avatar" mode="aspectFit">
      {{userinfo.nickName}}
      <div class="right text-primary">
        {{info.rate}}分
        <rate :value="info.rate"></rate>
      </div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">
        {{info.price}}
      </div>
    </div>
    <div class="tags">
      <div class="badge" v-for="(tag, index) in info.tags" :key="index">
        {{tag}}
      </div>
    </div>
    <div class="summary">
      <p v-for="(sum, index) in info.summary" :key="index">
        {{sum}}
      </p>
    </div>
  </div>
</template>

<script>
import Rate from '@/components/Rate'
export default {
  props: ['info'],
  components: {Rate},
  computed: {
    userinfo () {
      return this.info.user_info || {}
    }
  }

}
</script>

<style lang="scss">
.bookinfo {
  font-size: 14px;
  .thumb {
    width: 750rpx;
    height: 480rpx;
    overflow: hidden;
    position: relative;
    margin-bottom: 5px;
    .back {
      width: 100%;
      filter: blur(15px);
    }
    .img {
      width: 100%;
      position: absolute;
      height: 300rpx;
      left: 0;
      top: 40rpx;
    }
    .info {
      color: white;
      position: absolute;
      width: 100%;
      left: 0;
      top: 345rpx;
      text-align: center;
      .title {
        font-size: 20px;
      }
      .author {
        font-size: 14px;
      }
    }
  }
  .detail {
    padding: 5px 10px;
    .right {
      float: right;
    }
    .avatar {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .badge {
    display: inline-block;
    margin: 5px;
    border: 1px solid #EA5A49;
    border-radius: 10px;
    color: #EA5A49;
    padding: 5px;
  }
  .summary {
    margin: 10px 0;
    padding: 0 15px;
    p {
      text-indent: 2em;
      font-size: 12px;
    }
  }
}
</style>
