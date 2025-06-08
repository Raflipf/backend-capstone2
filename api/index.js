require("dotenv").config();
const Hapi = require("@hapi/hapi");
const routes = require("../src/routes/routes");
const pasienRoutes = require("../src/routes/pasienRoutes");
const userRoutes = require("../src/routes/userRoutes");
const rekamMedisRoutes = require("../src/routes/rekamMedisRoutes");

let server;

const init = async () => {
  if (!server) {
    server = Hapi.server({
      port: process.env.PORT || 3000,
      host: process.env.HOST || "0.0.0.0",
      routes: {
        cors: {
          origin: ["*"],
        },
      },
    });

    server.route(routes);
    server.route(pasienRoutes);
    server.route(userRoutes);
    server.route(rekamMedisRoutes);

    await server.initialize();
  }
  return server;
};

module.exports = async (req, res) => {
  const srv = await init();
  srv.listener.emit("request", req, res);
};
