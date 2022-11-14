import fastify from "fastify";

const server = fastify({logger: true});
const [PORT, HOST] = [3000, "127.0.0.1"];

server.get("/", async (request, reply) => {
    reply.send({
        success: true,
        message: "Hello World!"
    });
});

server.listen({port: PORT, host: HOST}, (err, address) => {
    if (err) {
        server.log.error(err);
        process.exit(1);
    }
    server.log.info(`server listening on ${address}`);
});