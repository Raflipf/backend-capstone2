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
  pgm.createTable("pasiens", {
    pasien_id: {
      type: "SERIAL",
      primaryKey: true,
    },
    nama: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    nik: {
      type: "VARCHAR(16)",
      notNull: true,
      unique: true,
    },
    tanggal_lahir: {
      type: "DATE",
      notNull: true,
    },
    jenis_kelamin: {
      type: "VARCHAR(10)",
      notNull: true,
    },
    alamat: {
      type: "TEXT",
      notNull: true,
    },
    no_telp: {
      type: "VARCHAR(20)",
      notNull: true,
    },
    email: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    foto: {
      type: "TEXT",
      notNull: false,
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updated_at: {
      type: "TIMESTAMP",
      notNull: false,
    },
  });

  pgm.createIndex("pasiens", "nik", { unique: true });
  pgm.createIndex("pasiens", "nama");
  pgm.createIndex("pasiens", "email");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("pasiens");
};
