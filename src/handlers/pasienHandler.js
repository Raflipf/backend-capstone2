const Patient = require("../models/patient");

const addPasienHandler = async (request, h) => {
  const {
    name,
    nik,
    birthDate,
    gender,
    bloodType,
    phone,
    email,
    address,
    emergencyContact,
    photos,
    embeddings,
    registrationDate,
    status,
  } = request.payload;

  if (!name || !nik) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan pasien. Nama dan NIK wajib diisi",
    });
    response.code(400);
    return response;
  }

  try {
    const existingPasien = await Patient.findOne({ nik });
    if (existingPasien) {
      const response = h.response({
        status: "fail",
        message: "Gagal menambahkan pasien. NIK sudah terdaftar",
      });
      response.code(400);
      return response;
    }

    const newPasien = new Patient({
      name,
      nik,
      birthDate,
      gender,
      bloodType,
      phone,
      email,
      address,
      emergencyContact,
      photos,
      embeddings,
      registrationDate,
      status,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const savedPasien = await newPasien.save();

    const response = h.response({
      status: "success",
      message: "Pasien berhasil ditambahkan",
      data: { pasien_id: savedPasien._id },
    });
    response.code(201);
    return response;
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Terjadi kesalahan saat menambahkan pasien",
      error: error.message,
    });
    response.code(500);
    return response;
  }
};

const getAllPasienHandler = async (request, h) => {
  try {
    const pasiens = await Patient.find();
    return {
      status: "success",
      data: { pasiens },
    };
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Terjadi kesalahan saat mengambil data pasien",
      error: error.message,
    });
    response.code(500);
    return response;
  }
};

const getPasienByIdHandler = async (request, h) => {
  const { pasienId } = request.params;

  try {
    const pasien = await Patient.findById(pasienId);
    if (pasien) {
      return {
        status: "success",
        data: { pasien },
      };
    } else {
      const response = h.response({
        status: "fail",
        message: "Pasien tidak ditemukan",
      });
      response.code(404);
      return response;
    }
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Terjadi kesalahan saat mengambil data pasien",
      error: error.message,
    });
    response.code(500);
    return response;
  }
};

const updatePasienByIdHandler = async (request, h) => {
  const { pasienId } = request.params;
  const updateData = request.payload;

  try {
    if (updateData.nik) {
      const existingPasien = await Patient.findOne({ nik: updateData.nik });
      if (existingPasien && existingPasien._id.toString() !== pasienId) {
        const response = h.response({
          status: "fail",
          message: "Gagal memperbarui pasien. NIK sudah terdaftar",
        });
        response.code(400);
        return response;
      }
    }

    const updatedPasien = await Patient.findByIdAndUpdate(
      pasienId,
      { ...updateData, updated_at: new Date() },
      { new: true }
    );

    if (updatedPasien) {
      const response = h.response({
        status: "success",
        message: "Pasien berhasil diperbarui",
        data: { pasien: updatedPasien },
      });
      response.code(200);
      return response;
    } else {
      const response = h.response({
        status: "fail",
        message: "Gagal memperbarui pasien. Id tidak ditemukan",
      });
      response.code(404);
      return response;
    }
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Terjadi kesalahan saat memperbarui pasien",
      error: error.message,
    });
    response.code(500);
    return response;
  }
};

const deletePasienByIdHandler = async (request, h) => {
  const { pasienId } = request.params;

  try {
    const deletedPasien = await Patient.findByIdAndDelete(pasienId);
    if (deletedPasien) {
      const response = h.response({
        status: "success",
        message: "Pasien berhasil dihapus",
      });
      response.code(200);
      return response;
    } else {
      const response = h.response({
        status: "fail",
        message: "Pasien gagal dihapus. Id tidak ditemukan",
      });
      response.code(404);
      return response;
    }
  } catch (error) {
    const response = h.response({
      status: "error",
      message: "Terjadi kesalahan saat menghapus pasien",
      error: error.message,
    });
    response.code(500);
    return response;
  }
};

module.exports = {
  addPasienHandler,
  getAllPasienHandler,
  getPasienByIdHandler,
  updatePasienByIdHandler,
  deletePasienByIdHandler,
};
