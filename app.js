// koa 启动一个服务 -> 右键运行 -> 即可在 localhost:3000 中访问到内容
const koa = require('koa');
const app = new koa();

// // 路由实现方式1:
// // 安装模块之后，引入 koa-router
// const Router = require('koa-router');
// const router = new Router();
// // 配置路由
// // ctx.body 相当于原生的 【res.writeHead()】
// router.get('/', (ctx) => {
//     ctx.body = 'hello koa2';
// }).get('/star', (ctx) => {
//     ctx.body = 'hello 千玺';
// })
// // 使用【中间件】启动路由
// app
//   .use(router.routes())
//   .use(router.allowedMethods());

// 路由实现方式2 - 简易:
const router = require('koa-router')(); // 引入并实现
router.get('/', async (ctx) => {
    ctx.body = 'hello koa2';
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

app.listen(3002);