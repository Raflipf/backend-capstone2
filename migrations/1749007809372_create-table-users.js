/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("users", {
    user_id: {
      type: "SERIAL",
      primaryKey: true,
    },
    username: {
      type: "VARCHAR(100)",
      notNull: true,
      unique: true,
    },
    email: {
      type: "VARCHAR(255)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    createdAt: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updatedAt: {
      type: "TIMESTAMP",
      notNull: false,
    },
  });

  pgm.createIndex("users", "username");
  pgm.createIndex("users", "email");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("users");
};
