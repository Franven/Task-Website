import pkg from "pg";
const { Pool } = pkg;

const config = {
  user: "postgres",
  host: "localhost",
  port: 5433,
  password: "123456",
  database: "tasksbd",
};

export const pool = new Pool(config);

// 123456 postgres
