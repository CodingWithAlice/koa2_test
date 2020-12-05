// 最基础的可以直接访问的koa实现方式
const koa = require('koa');
const app = new koa();

const router = require('koa-router')(); // 引入并实现

const session = require('koa-session'); // 引入
app.keys = ['some secret hurr']; // 默认
const CONFIG = { 
  	key: 'koa:sess', //cookie key (默认)
    maxAge: 86400000, // cookie 的过期时间 ms  【需手动修改，默认 1天】
  	overwrite: true, //是否可以 overwrite (默认 default true) 
  	httpOnly: true, //cookie 是否只有服务器端可以访问 (默认 true) 
  	signed: true, //签名默认 true 
  	rolling: true, //在每次请求时强行设置 cookie，重置过期时间【需手动修改，默认 false】 
  	renew: false, //renew session when session is nearly expired, };【需手动修改，默认 false】
  };  
app.use(session(CONFIG, app)); // 声明

const views = require('koa-views');
app.use(views('views',{
    extension: 'ejs',
}))

router.get('/', async (ctx) => {
    ctx.session.idol = '易烊千玺';
    ctx.body = 'hello koa2';
    await ctx.render('basis', {
        title: 'basis',
    });
})

router.get('/star', async (ctx) => {
    console.log('idol=',ctx.session.idol);
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