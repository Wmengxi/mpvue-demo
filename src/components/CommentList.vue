<template>
  <div class="comment-list">
    <div class="page-title" v-if="comments.length">
      评论
    </div>
    <div class="comment"
         v-for="comment in comments"
         :key="comment.id"
         @click="handleClick(comment)">
         <div class="user">
           <div class="left">
             <img :src="comment.avatar"
                  class="avatar"
                  mode="aspectFill">
              {{comment.name}}
           </div>
           <div class="right">
             {{comment.location || "未知地点"}}
             <span class="text-primary">--</span>
             {{comment.phone || "未知型号"}}
           </div>
         </div>
         <div class="content">
           {{comment.comment}}
         </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['comments', 'type'],
  methods: {
    handleClick (comment) {
      if (this.type === 'user') {
        wx.navigateTo({
          url: '/pages/detail/main?id=' + comment.bookid
        })
      }
    }
  }

}
</script>

<style lang="scss">
.comment-list {
  font-size: 14px;
  background-color: #eee;
  .comment {
    background-color: white;
    padding: 10px 20px;
    margin-bottom: 10px;
    box-sizing: border-box;
    .user {
      .left {
        display: inline;
        .avatar {
          width: 20px;
          height: 20px;
          border-radius: 50%;;
          vertical-align: middle;
        }
      }
    }
    .content {
      margin: 10px 0;
    }
  }
}

</style>
