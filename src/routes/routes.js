const routes = [
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return h
        .response("Halo, API Identifikasi Pasien & Rekam Medis")
        .code(200);
    },
  },

  {
    method: "GET",
    path: "/{any*}",
    handler: (request, h) => {
      return h.response("Halaman tidak ditemukan").code(404);
    },
  },
];

module.exports = routes;
