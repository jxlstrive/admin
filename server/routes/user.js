const router = require('koa-router')()
const { register, checkName, getIpInfo, login, getUsers } = require('../controller/user')

router.prefix('/user')

function handleRes(ctx, next, res) {
  if (res.status === 0) {
    ctx.body = res
  } else {
    ctx.status = res.httpCode
    ctx.body = res
    // ctx.message = res.message   //本来想直接设置fetch的statusText，但是加了这句话请求就出错
  }
}

router.post('/register', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const res = await register(username, password)
  handleRes(ctx, next, res)
})

router.post('/login', async function (ctx, next) {
  const { username, password } = ctx.request.body
  const res = await login(username, password)
  handleRes(ctx, next, res)
})

router.get('/checkName', async function (ctx, next) {
  const { username } = ctx.query
  const res = await checkName(username)
  handleRes(ctx, next, res)
})

router.get('/getIpInfo', async function (ctx, next) {
  const res = await getIpInfo()
  handleRes(ctx, next, res)
})

router.get('/getUsers', async function (ctx, next) {
  const res = await getUsers(ctx.query)
  handleRes(ctx, next, res)
})

module.exports = router
