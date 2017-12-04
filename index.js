const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');

const app = new Koa();
app.use(koaBody());

const router = new Router();

const port = process.env.PORT || 8080;

let lastLog = null;

router.get('/', async (ctx, next) => {
  ctx.body = JSON.stringify(lastLog);
});

router.post('/log', async (ctx, next) => {
  lastLog = ctx.request.body;
  console.log(ctx.request.body);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
