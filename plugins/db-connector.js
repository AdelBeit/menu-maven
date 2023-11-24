import fastifyPlugin from "fastify-plugin";
import fastifyPostgres from "@fastify/postgres";
import dotenv from "dotenv";
dotenv.config();

/**
 * @param {FastifyInstance} fastify
 * @param {Object} options
 */
async function dbConnector(fastify, options) {
  fastify.register(fastifyPostgres, {
    connectionString: "hi" || process.env.POSTGRES_URL
  });
}

export default fastifyPlugin(dbConnector);