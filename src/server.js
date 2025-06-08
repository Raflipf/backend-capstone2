require("dotenv").config();
const Hapi = require("@hapi/hapi");
const routes = require("./routes/routes");
const pasienRoutes = require("./routes/pasienRoutes");
const userRoutes = require("./routes/userRoutes");
const rekamMedisRoutes = require("./routes/rekamMedisRoutes");

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
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

  await server.start();
  console.log(`MediFace | Server berjalan di ${server.info.uri}`);
};

init();
