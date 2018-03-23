const fastify = require('fastify')();
const path = require('path');
const fs = require('fs');

if (process.env.NODE_ENV === "development") {
    const path = require("path");
    require("ts-node").register({
        project: path.join(__dirname, "../../tsconfig.json"),
        compilerOptions: {
            "module": "commonjs",
        },
    });
}

// 批量注册内部plugins
const plugins = path.join(__dirname, "plugins");

fs.readdirSync(plugins).forEach(fileName => {
    fastify.register(require(path.join(plugins, `${fileName}`)).default)
});

// 注册外部plugins

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '../../static'),
    prefix: '/static/', // optional: default '/'
});

fastify.get('/main', function (request, reply) {
    reply.send({ hello: 'world48484848' })
});

fastify.decorate('conf', {
    db: 'aaa',
    port: 3000
});

console.log(fastify.conf.port);


// Run the server!
fastify.listen(3005, function (err) {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    }
});
