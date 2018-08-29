<script>
// import {get} from './util'
export default {
  async created () {
    // const res = await get('/weapp/demo')
    // console.log(123, res)
    // wx.request({
    //   url: config.host + '/weapp/demo',
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })
    console.log('小程序启动了')
  }
}
</script>

<style>
.text-footer {
  text-align: center;
  font-size: 12px;
  margin-bottom: 5px;
}
.text-primary {
  color: #EA5A49;
}
.page-title {
  padding-left: 20px;
  line-height: 40px;
  font-size: 14px;
  background-color: #eee;
}
.right {
  float: right;
}
.btn {
  color: white;
  background: #EA5A49;
  margin-bottom: 10px;
  padding-left: 15px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 40px;
  height: 40px;
  width: 100%;
}
.btn:active {
  background: #FA5A49;
}

</style>
