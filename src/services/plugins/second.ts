export default async function (fastify) {

    fastify.get('/szh0101', async (request, reply) => {
        return { hello: 'szh111223' }
    });

    fastify.get('/szh0102', async (request, reply) => {
        return { hello: 'qwer' }
    })
}
