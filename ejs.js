/*
 * @Author: Alice 
 * @Date: 2020-11-10 17:47:16 
 * @Last Modified by: ling.hao
 * @Last Modified time: 2020-11-11 10:03:27
 * @Description: {'ejs模版的使用'} 
 */

const koa = require('koa');
const router = require('koa-router')(); // 引入并实现
const views = require('koa-views');

const app = new koa();

// 配置第三方中间件 - ejs模版引擎 - index.ejs - 推荐
app.use(views('views',{
    extension: 'ejs',
}));

// 配置第三方中间件 - ejs模版引擎 - index.html
// app.use(views('views',{map: {
//     html:'ejs',
// }}));

router.get('/', async (ctx) => {
    // ctx.body = 'hello koa2';
    await ctx.render('index');
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