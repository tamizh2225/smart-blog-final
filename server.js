const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const corsMiddleware = require("./cors-middleware");

server.use(middlewares);
server.use(corsMiddleware); // use your custom CORS middleware
server.use(router);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
