const pasiens = require("../models/pasiens");

const addPasienHandler = (request, h) => {
  const {
    nama,
    nik,
    tanggal_lahir,
    jenis_kelamin,
    alamat,
    no_telp,
    email,
    foto,
  } = request.payload;

  if (!nama || !nik) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan pasien. Nama dan NIK wajib diisi",
    });
    response.code(400);
    return response;
  }

  const existingPasien = pasiens.find((p) => p.nik === nik);
  if (existingPasien) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan pasien. NIK sudah terdaftar",
    });
    response.code(400);
    return response;
  }

  const pasien_id =
    pasiens.length > 0 ? pasiens[pasiens.length - 1].pasien_id + 1 : 1;
  const createdAt = new Date().toISOString();

  const newPasien = {
    pasien_id,
    nama,
    nik,
    tanggal_lahir,
    jenis_kelamin,
    alamat,
    no_telp,
    email,
    foto,
    createdAt,
  };

  pasiens.push(newPasien);

  const response = h.response({
    status: "success",
    message: "Pasien berhasil ditambahkan",
    data: { pasien_id },
  });
  response.code(201);
  return response;
};

const getAllPasienHandler = (request, h) => {
  return {
    status: "success",
    data: { pasiens },
  };
};

const getPasienByIdHandler = (request, h) => {
  const { pasienId } = request.params;

  const pasien = pasiens.find((p) => p.pasien_id === parseInt(pasienId));

  if (pasien) {
    return {
      status: "success",
      data: { pasien },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Pasien tidak ditemukan",
  });
  response.code(404);
  return response;
};

const updatePasienByIdHandler = (request, h) => {
  const { pasienId } = request.params;
  const {
    nama,
    nik,
    tanggal_lahir,
    jenis_kelamin,
    alamat,
    no_telp,
    email,
    foto,
  } = request.payload;

  const index = pasiens.findIndex((p) => p.pasien_id === parseInt(pasienId));

  if (index !== -1) {
    if (nik && nik !== pasiens[index].nik) {
      const existingPasien = pasiens.find((p) => p.nik === nik);
      if (existingPasien) {
        const response = h.response({
          status: "fail",
          message: "Gagal memperbarui pasien. NIK sudah terdaftar",
        });
        response.code(400);
        return response;
      }
    }

    pasiens[index] = {
      ...pasiens[index],
      nama: nama || pasiens[index].nama,
      nik: nik || pasiens[index].nik,
      tanggal_lahir: tanggal_lahir || pasiens[index].tanggal_lahir,
      jenis_kelamin: jenis_kelamin || pasiens[index].jenis_kelamin,
      alamat: alamat || pasiens[index].alamat,
      no_telp: no_telp || pasiens[index].no_telp,
      email: email || pasiens[index].email,
      foto: foto || pasiens[index].foto,
      updatedAt: new Date().toISOString(),
    };

    const response = h.response({
      status: "success",
      message: "Pasien berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui pasien. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deletePasienByIdHandler = (request, h) => {
  const { pasienId } = request.params;

  const index = pasiens.findIndex((p) => p.pasien_id === parseInt(pasienId));

  if (index !== -1) {
    pasiens.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Pasien berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Pasien gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addPasienHandler,
  getAllPasienHandler,
  getPasienByIdHandler,
  updatePasienByIdHandler,
  deletePasienByIdHandler,
};
