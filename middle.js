/*
 * @Author: Alice 
 * @Date: 2020-11-10 16:21:44 
 * @Last Modified by: ling.hao
 * @Last Modified time: 2020-11-10 17:22:36
 * @Description: {'理解中间件'} 
 */

const koa = require('koa');
const app = new koa();

const router = require('koa-router')(); // 引入并实现

// 匹配路由之前打印日期 - 应用级中间件实例
app.use(async(ctx,next) => { // 只传函数，默认匹配任意路由
    console.log('日期:',new Date());
    await next(); // 继续往下匹配路由
});

router.get('/', async (ctx) => {
    ctx.body = 'hello koa2';
})

// 有多个重名路由时，继续往下匹配 - 路由级中间件实例
router.get('/star', async (ctx, next) => {
    console.log('千玺 你好呀');
    await next(); // 继续往下匹配路由
})
router.get('/star', async (ctx) => {
    ctx.body = 'hello 千玺';
})

router.get('/cat', async (ctx) => {
    console.log('这是cat页面');
    ctx.body = 'hello 阿秋';
})
app.use(async(ctx,next) => {
    console.log('这是一个中间件01');
    await next();

    // 错误处理中间件
    if(ctx.status === 404) {
        ctx.status = 404;
        ctx.bofy = '这是一个404页面';
    }
});

// 使用【中间件】启动路由
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);