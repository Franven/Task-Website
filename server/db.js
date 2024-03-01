import { Pool } from "pg";

export const pool = new Pool({
  user: "root",
  host: "localhost",
  database: "tasksbd",
  password: "123456",
  port: 5432,
});
