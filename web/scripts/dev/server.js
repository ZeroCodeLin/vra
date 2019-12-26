const webpack = require('webpack');
const kosDevMiddleware = require('koa-webpack-middleware');
const chalk = require('chalk');
const fs = require('fs');
const devConfig = require('./webpack.config.dev');
const compile = webpack(devConfig)
const Koa = require('koa');
const open = require('open')
const app = new Koa();


const devM = kosDevMiddleware.devMiddleware(compile, {
    logTime: true,
    hot: true,
    stats: {
        colors: true
    }
});

app.use(devM);
app.use(kosDevMiddleware.hotMiddleware(compile));

//本地mock
app.use(async (ctx, next) => {
    const reg = new RegExp(`api`);
    if (!reg.test(ctx.path)) {
        await next();
    } else {
        const apiPath = ctx.path.replace(`api/`, '');
        const mockPath = `mock${apiPath}`;
        if (fs.existsSync(mockPath)) {
            ctx.set('Content-Type', 'application/json; charset=UTF-8');
            ctx.body = fs.readFileSync(mockPath, 'utf-8');
        } else {
            await next();
        }
    }
});

app.listen(3000, () => {
    devM.waitUntilValid(() => {
        console.log('\n');
        console.log(chalk.green('The service runs on：'), chalk.blue('http://localhost:3000'));
        open('http://localhost:3000');
    })
});