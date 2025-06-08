const {
  addRekamMedisHandler,
  getAllRekamMedisHandler,
  getRekamMedisByIdHandler,
  getRekamMedisByPasienIdHandler,
  updateRekamMedisByIdHandler,
  deleteRekamMedisByIdHandler,
} = require("../handlers/rekamMedisHandler");

const rekamMedisRoutes = [
  {
    method: "POST",
    path: "/rekammedis",
    handler: addRekamMedisHandler,
  },
  {
    method: "GET",
    path: "/rekammedis",
    handler: getAllRekamMedisHandler,
  },
  {
    method: "GET",
    path: "/rekammedis/{rekamMedisId}",
    handler: getRekamMedisByIdHandler,
  },
  {
    method: "GET",
    path: "/rekammedis/pasien/{pasienId}",
    handler: getRekamMedisByPasienIdHandler,
  },
  {
    method: "PUT",
    path: "/rekammedis/{rekamMedisId}",
    handler: updateRekamMedisByIdHandler,
  },
  {
    method: "DELETE",
    path: "/rekammedis/{rekamMedisId}",
    handler: deleteRekamMedisByIdHandler,
  },
];

module.exports = rekamMedisRoutes;
