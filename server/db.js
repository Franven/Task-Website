import pkg from "pg";
import { config } from "dotenv";
const { Pool } = pkg;

config()

const config = {
  user: process.env.RENDER_USERNAME,
  host: process.env.RENDER_HOSTNAME,
  port: process.env.RENDER_PORT,
  password: process.env.RENDER_PASSWORD,
  database: process.env.RENDER_DATABASE,
};

export const pool = new Pool(config);


