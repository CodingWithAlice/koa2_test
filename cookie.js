// 最基础的可以直接访问的koa实现方式
const koa = require('koa');
const app = new koa();

const router = require('koa-router')(); // 引入并实现

const views = require('koa-views');
app.use(views('views',{
    extension: 'ejs',
}))

router.get('/', async (ctx) => {
    ctx.cookies.set('user-info', 'Jackson', {
        maxAge: 60 * 1000 * 60, // 60分钟后过期
    });

    // cookie 设置的 值 会被校验，如果是中文会报错
    // 这里采用了 Buffer.from 转码成字符串，下文获取的时候再解码
    let name = Buffer.from('易烊千玺').toString('base64');
    ctx.cookies.set('idol', name, {
        maxAge: 60 * 1000 * 60, // 60分钟后过期
    });
    ctx.body = 'hello koa2';
    await ctx.render('basis', {
        title: 'basis',
    });
})

router.get('/star', async (ctx) => {
    ctx.body = 'hello 千玺';
    let cookie = ctx.cookies.get('user-info');
    // 这里直接获取到到是编码过后到字符串，解码才能得到对应中文
    let idol = Buffer.from(ctx.cookies.get('idol'), 'base64').toString();
    console.log('cookie=', cookie);
    console.log('idol=', idol);
})

router.get('/cat', async (ctx) => {
    ctx.body = 'hello 阿秋';
})
// 使用【中间件】启动路由
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);