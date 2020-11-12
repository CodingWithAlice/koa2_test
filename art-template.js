// 最基础的可以直接访问的koa实现方式
const koa = require('koa');
const app = new koa();

const router = require('koa-router')(); // 引入并实现

// 引入 art-template
const render = require('koa-art-template');
const path = require('path');
render(app, {
    root: path.join(__dirname, 'views'), // 视图的位置
    extname: '.html', // 后缀名
    debug: process.env.NODE_ENV !== 'production'  // 是否开启调试模式
  });

router.get('/', async (ctx) => {
    // ctx.body = 'hello koa2';
    await ctx.render('index')
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