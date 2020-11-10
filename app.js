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

// 路由实现方式2 - 简易且推荐:
const router = require('koa-router')(); // 引入并实现
router.get('/', async (ctx) => {
    // 路由跳转方式1:get传值：在链接中直接传参数，可以通过 ctx.query【推荐】/ctx.querystring
    console.log('ctx==', ctx.querystring);
    ctx.body = 'hello koa2';
})

router.get('/star/:id', async (ctx) => {
    //  路由跳转方式2:动态路由：在链接里面匹配到类 /star/212 即会跳转当前路由
    ctx.body = 'hello 千玺';
})

router.get('/cat/:sex/:age', async (ctx) => {
    //  路由跳转方式2:动态路由：可以配置多个动态路由
    ctx.body = 'hello 阿秋';
})
// 使用【中间件】启动路由
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3002);