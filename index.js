const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const port = process.env.PORT || 8080;


router.get('/', async (ctx, next) => {
  ctx.body = {
    status: 200,
    body: `I'm fine`,
    error: null
  };
  console.log(`here I am at ${new Date()}`);
});


app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
