// 最基础的可以直接访问的koa实现方式
const koa = require('koa');
const app = new koa();

const router = require('koa-router')(); // 引入并实现

var bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const views = require('koa-views');
app.use(views('views',{
    extension: 'ejs',
}))

router.get('/', async (ctx) => {
    ctx.body = 'hello koa2';
    await ctx.render('post')
})
// 接收 post 中提交的数据
router.post('/toAdd', (ctx) => {
    ctx.body = ctx.request.body;
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