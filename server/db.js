import pkg from "pg";
import { config } from "dotenv";
const { Pool } = pkg;

config()



export const pool = new Pool({
  connectionString: process.env.RENDER_DATABASE_URL,
});


