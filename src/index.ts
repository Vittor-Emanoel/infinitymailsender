import { env } from "env/env";
import { fastify } from "fastify";

const app = fastify();

app.listen(
  {
    port: env.PORT,
  },
  () => {
    console.log("Server is running http://localhost:3333");
  },
);
