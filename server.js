import Fastify from "fastify";
import wordsRoute from './words';
import dbConnector from './db-connector';

const fastify = Fastify({
  logger: true,
});

fastify.register(wordsRoute);
fastify.register(dbConnector);

// run the server
try {
  await fastify.listen({ port: 3000 });
  // server is now listening on ${address}
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
