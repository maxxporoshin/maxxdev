const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const fs = require('fs');
const path = require('path');

const app = new Koa();
app.use(koaBody());

const router = new Router();

const port = process.env.PORT || 8080;

const filename = 'data';

router.get('/', async (ctx, next) => {
  ctx.body = JSON.stringify(readData());
});

router.post('/log', async (ctx, next) => {
  const body = JSON.parse(ctx.request.body);
  console.log(body);
  const data = readData();
  const logs = data[body.deviceId] || [];
  logs.push(body.location);
  data[body.deviceId] = logs;
  writeData(data);
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

function readData() {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(path.resolve(filename), 'utf8'));
  } catch (e) {
    fs.writeFileSync(path.resolve(filename), '', 'utf8');
    data = {};
  }
  return data;
}

function writeData(data) {
  fs.writeFileSync(path.resolve(filename), JSON.stringify(data), 'utf8');
}
