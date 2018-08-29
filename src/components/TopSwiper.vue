<template>
  <div class="swiper">
    <swiper
      :indicator-dots="true"
      indicator-color="#EA5A49"
      :autoplay="true"
      :interval="6000"
      :duration="1000"
      :circular="true"
    >
      <div v-for="(top, index) in imgUrls" :key="index">
        <swiper-item>
          <img
            class="slide-image"
            mode="aspectFit"
            v-for="(img, id) in top"
            :key="id"
            :src="img.image"
            @click="bookDetail(img)"
          >
        </swiper-item>
      </div>

    </swiper>
  </div>
</template>

<script>
export default {
  props: ['tops'],
  methods: {
    bookDetail (item) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + item.id
      })
    }
  },
  computed: {
    imgUrls () {
      let res = this.tops
      return [res.slice(0, 3), res.slice(3, 6), res.slice(6)]
    }
  }

}
</script>

<style lang="scss">
.swiper {
  margin-top: 5px;
  .slide-image {
    width: 33%;
    height: 250rpx;;
  }
}

</style>
