const {
  addUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserByIdHandler,
  deleteUserByIdHandler,
} = require("../handlers/userHandler");

const userRoutes = [
  {
    method: "POST",
    path: "/users",
    handler: addUserHandler,
  },
  {
    method: "GET",
    path: "/users",
    handler: getAllUsersHandler,
  },
  {
    method: "GET",
    path: "/users/{userId}",
    handler: getUserByIdHandler,
  },
  {
    method: "PUT",
    path: "/users/{userId}",
    handler: updateUserByIdHandler,
  },
  {
    method: "DELETE",
    path: "/users/{userId}",
    handler: deleteUserByIdHandler,
  },
];

module.exports = userRoutes;
