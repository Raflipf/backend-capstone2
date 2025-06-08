const users = require("../models/users");

const addUserHandler = (request, h) => {
  const { username, email, password } = request.payload;

  if (!username || !email || !password) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan user. Username, email, dan password wajib diisi",
    });
    response.code(400);
    return response;
  }

  const existingUser = users.find(
    (u) => u.username === username || u.email === email
  );
  if (existingUser) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan user. Username atau email sudah terdaftar",
    });
    response.code(400);
    return response;
  }

  const user_id = users.length > 0 ? users[users.length - 1].user_id + 1 : 1;
  const createdAt = new Date().toISOString();

  const newUser = {
    user_id,
    username,
    email,
    password,
    createdAt,
  };

  users.push(newUser);

  const response = h.response({
    status: "success",
    message: "User berhasil ditambahkan",
    data: { user_id },
  });
  response.code(201);
  return response;
};

const getAllUsersHandler = (request, h) => {
  const usersWithoutPassword = users.map(({ password, ...user }) => user);

  return {
    status: "success",
    data: { users: usersWithoutPassword },
  };
};

const getUserByIdHandler = (request, h) => {
  const { userId } = request.params;

  const user = users.find((u) => u.user_id === parseInt(userId));

  if (user) {
    const { password, ...userWithoutPassword } = user;
    return {
      status: "success",
      data: { user: userWithoutPassword },
    };
  }

  const response = h.response({
    status: "fail",
    message: "User tidak ditemukan",
  });
  response.code(404);
  return response;
};

const updateUserByIdHandler = (request, h) => {
  const { userId } = request.params;
  const { username, email, password } = request.payload;

  const index = users.findIndex((u) => u.user_id === parseInt(userId));

  if (index !== -1) {
    if (
      (username && username !== users[index].username) ||
      (email && email !== users[index].email)
    ) {
      const existingUser = users.find(
        (u) =>
          u.user_id !== parseInt(userId) &&
          (u.username === username || u.email === email)
      );
      if (existingUser) {
        const response = h.response({
          status: "fail",
          message:
            "Gagal memperbarui user. Username atau email sudah terdaftar",
        });
        response.code(400);
        return response;
      }
    }

    users[index] = {
      ...users[index],
      username: username || users[index].username,
      email: email || users[index].email,
      password: password || users[index].password,
      updatedAt: new Date().toISOString(),
    };

    const response = h.response({
      status: "success",
      message: "User berhasil diperbarui",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Gagal memperbarui user. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

const deleteUserByIdHandler = (request, h) => {
  const { userId } = request.params;

  const index = users.findIndex((u) => u.user_id === parseInt(userId));

  if (index !== -1) {
    users.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "User berhasil dihapus",
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "User gagal dihapus. Id tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {
  addUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
};
