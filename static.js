// 最基础的可以直接访问的koa实现方式
const koa = require('koa');
const app = new koa();

const router = require('koa-router')(); // 引入并实现

const views = require('koa-views');
app.use(views('views',{
    extension: 'ejs',
}))

// 引入中间件
const static = require('koa-static');
app.use(static('static'));

router.get('/', async (ctx) => {
    ctx.body = 'hello koa2';
    await ctx.render('static')
})

router.get('/star', async (ctx) => {
    ctx.body = 'hello 千玺';
})

router.get('/cat', async (ctx) => {
    ctx.body = 'hello 阿秋';
})
// 使用【中间件】启动路由
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);