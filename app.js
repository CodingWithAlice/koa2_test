// koa 启动一个服务 -> 右键运行 -> 即可在 localhost:3000 中访问到内容
const koa = require('koa');
const app = new koa();

app.use(async (ctx) => {
    ctx.body = 'hello koa2';
});

app.listen(3000);