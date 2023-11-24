/**
 * A plugin that provides encapsulated routes
 * @param {FastifyInstance} fastify encapsulated fastify instance
 * @param {Object} options plugin options
 */
async function routes(fastify, options) {
  const client = await fastify.pg.connect();

  fastify.get("/api/*", async (request, reply) => {
    
  });

  fastify.get("/first-route", async (request, reply) => {
    return { hello: "world" };
  });

  fastify.get("/check/:word", async (request, reply) => {
    try {
      const result = await client.query(
        "SELECT word FROM words WHERE word = UPPER($1)",
        [request.params.word]
      );
      if (result.rowCount === 0) {
        return "Invalid word!";
      }
      return "Valid word!";
    } catch (err) {
      reply.send(err);
    }
  });

  fastify.get("/includes/:letters", async (request, reply) => {
    try {
      const letters = request.params.letters.split("");
      const RESULT_CAP = 100;
      if (letters.length < 1)
        throw new Error("Please provide at least one letter.");
      let query = "SELECT word FROM words WHERE ";
      let conditions = [];
      for (let i = 0; i < letters.length; i++) {
        conditions.push(`word ILIKE '%${letters[i]}%'`);
      }
      query += conditions.join(" AND ");
      const result = await client.query(query);
      if (result.rowCount === 0) {
        return "No words can be formed with those letters.";
      }
      return result.rows.map((row) => row.word)
      .sort((a,b) => a.length-b.length || a.localeCompare(b))
      .slice(0,RESULT_CAP)
      .join("\n");
    } catch (err) {
      reply.send(err);
    }
  });

  // Schema for the '/check/:word' route
  const checkWordSchema = {
    params: {
      type: "object",
      properties: {
        word: { type: "string" },
      },
      required: ["word"],
    },
  };

  // Schema for the '/includes/:letters' route
  const includesLettersSchema = {
    params: {
      type: "object",
      properties: {
        letters: { type: "string" },
      },
      required: ["letters"],
    },
  };
}

export default routes;
