// 最基础的可以直接访问的koa实现方式
const koa = require('koa');
const app = new koa();

const router = require('koa-router')(); // 引入并实现

// 引入 nodejs 原生获取 POST 参数的方法
const common = require('./modules/common');

// 使用 ejs 模版
const views  = require('koa-views');
app.use(views('views',{
    extension: 'ejs',
}));

router.get('/', async (ctx) => {

    await ctx.render('post');
})
// 接收 post 提交的数据
router.post('/toAdd', async (ctx) => {
    let data = await common.getPostData(ctx);
    console.log('data=', data);
    ctx.body = data;
});

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