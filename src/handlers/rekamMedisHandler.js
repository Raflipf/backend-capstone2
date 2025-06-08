const rekamMedis = require("../models/rekamMedis");
const pasiens = require("../models/pasiens");

const addRekamMedisHandler = (request, h) => {
  const { pasien_id, tanggal, diagnosa, resep } = request.payload;

  if (!pasien_id || !tanggal || !diagnosa) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan rekam medis. Pasien ID, tanggal, dan diagnosa wajib diisi",
    });
    response.code(400);
    return response;
  }

  const pasienExists = pasiens.find((p) => p.pasien_id === parseInt(pasien_id));
  if (!pasienExists) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan rekam medis. Pasien tidak ditemukan",
    });
    response.code(400);
    return response;
  }

  const rekamMedis_id =
    rekamMedis.length > 0
      ? rekamMedis[rekamMedis.length - 1].rekamMedis_id + 1
      : 1;
  const createdAt = new Date().toISOString();

  const newRekamMedis = {
    rekamMedis_id,
    pasien_id: parseInt(pasien_id),
    tanggal,
    diagnosa,
    resep,
    createdAt,
  };

  rekamMedis.push(newRekamMedis);

  const response = h.response({
    status: "success",
    message: "Rekam medis berhasil ditambahkan",
    data: { rekamMedis_id },
  });
  response.code(201);
  return response;
};

const getAllRekamMedisHandler = (request, h) => {
  const rekamMedisWithPasien = rekamMedis.map((rm) => {
    const pasien = pasiens.find((p) => p.pasien_id === rm.pasien_id);
    return {
      ...rm,
      nama_pasien: pasien ? pasien.nama : "Pasien tidak ditemukan",
    };
  });

  return {
    status: "success",
    data: { rekamMedis: rekamMedisWithPasien },
  };
};

const getRekamMedisByIdHandler = (request, h) => {
  const { rekamMedisId } = request.params;

  const rm = rekamMedis.find((r) => r.rekamMedis_id === parseInt(rekamMedisId));

  if (rm) {
    const pasien = pasiens.find((p) => p.pasien_id === rm.pasien_id);
    const rekamMedisWithPasien = {
      ...rm,
      nama_pasien: pasien ? pasien.nama : "Pasien tidak ditemukan",
      data_pasien: pasien || null,
    };

    return {
      status: "success",
      data: { rekamMedis: rekamMedisWithPasien },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Rekam medis tidak ditemukan",
  });
  response.code(404);
  return response;
};

const getRekamMedisByPasienIdHandler = (request, h) => {
  const { pasienId } = request.params;

  const pasienRekamMedis = rekamMedis.filter(
    (rm) => rm.pasien_id === parseInt(pasienId)
  );

  if (pasienRekamMedis.length > 0) {
    const pasien = pasiens.find((p) => p.pasien_id === parseInt(pasienId));

    return {
      status: "success",
      data: {
        pasien: pasien || null,
        rekamMedis: pasienRekamMedis,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Rekam medis untuk pasien ini tidak ditemukan",
  });
  response.code(404);
  return response;
};

const updateRekamMedisByIdHandler = (request, h) => {
  const { rekamMedisId } = request.params;
  const { pasien_id, tanggal, diagnosa, resep } = request.payload;

  const index = rekamMedis.findIndex(
    (rm) => rm.rekamMedis_id === parseInt(rekamMedisId)
  );

  if (index !== -1) {
    if (pasien_id && pasien_id !== rekamMedis[index].pasien_id) {
      const pasienExists = pasiens.find(
        (p) => p.pasien_id === parseInt(pasien_id)
      );
      if (!pasienExists) {
        const response = h.response({
          status: "fail",
          message: "Gagal memperbarui rekam medis. Pasien tidak ditemukan",
        });
        response.code(400);
        return response;
      }
    }

    rekamMedis[index] = {
      ...rekamMedis[index],
      pasien_id: pasien_id ? parseInt(pasien_id) : rekamMedis[index].pasien_id,
      tanggal: tanggal || rekamMedis[index].tanggal,
      diagnosa: diagnosa || rekamMedis[index].diagnosa,
      resep: resep || rekamMedis[index].resep,
      updatedAt: new Date().toISOString(),
    };

    const response = h.response({
      status: "success",
      message: "Rekam medis berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui rekam medis. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteRekamMedisByIdHandler = (request, h) => {
  const { rekamMedisId } = request.params;

  const index = rekamMedis.findIndex(
    (rm) => rm.rekamMedis_id === parseInt(rekamMedisId)
  );

  if (index !== -1) {
    rekamMedis.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Rekam medis berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Rekam medis gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addRekamMedisHandler,
  getAllRekamMedisHandler,
  getRekamMedisByIdHandler,
  getRekamMedisByPasienIdHandler,
  updateRekamMedisByIdHandler,
  deleteRekamMedisByIdHandler,
};
