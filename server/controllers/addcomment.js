const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {openid, bookid, comment, phone, location} = ctx.request.body
    try {
        await mysql('comments').insert({openid, bookid, comment, phone, location})
        ctx.state.data = {
            msg: 'success'
        }
    } catch (e) {
        ctx.state.data = {
            code: -1,
            msg: '评论失败' + e.sqlMessage
        }
    }
}
