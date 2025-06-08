const {
  addPasienHandler,
  getAllPasienHandler,
  getPasienByIdHandler,
  updatePasienByIdHandler,
  deletePasienByIdHandler,
} = require("../handlers/pasienHandler");

const pasienRoutes = [
  {
    method: "POST",
    path: "/pasiens",
    handler: addPasienHandler,
  },
  {
    method: "GET",
    path: "/pasiens",
    handler: getAllPasienHandler,
  },
  {
    method: "GET",
    path: "/pasiens/{pasienId}",
    handler: getPasienByIdHandler,
  },
  {
    method: "PUT",
    path: "/pasiens/{pasienId}",
    handler: updatePasienByIdHandler,
  },
  {
    method: "DELETE",
    path: "/pasiens/{pasienId}",
    handler: deletePasienByIdHandler,
  },
];

module.exports = pasienRoutes;
