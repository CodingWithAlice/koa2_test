/*
 * @Author: Alice 
 * @Date: 2020-11-10 17:47:16 
 * @Last Modified by: ling.hao
 * @Last Modified time: 2020-11-11 11:27:14
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
    await ctx.render('index');
})

router.get('/star', async (ctx) => {
    let title = '千玺 二十岁快乐';
    let arr = ['恒温动物','my boo', '精彩才刚刚开始'];
    let html = `<h2>这是一个html数据</h2>`;
    await ctx.render('index',{
        title,
        list: arr,
        html,
        num: 15,
    });
})

router.get('/cat', async (ctx) => {
    ctx.body = 'hello 阿秋';
})

// 需求：在每个路由 render 里面都渲染一个公共数据 - ctx.state
app.use(async (ctx, next) => {
    ctx.state = {
        name: '千纸鹤',
    }
    await next();
});

// 使用【中间件】启动路由
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);