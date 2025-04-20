import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: './vrbl.env' }); // I
console.log('USER =', process.env.DB_USER);


const { Pool } = pg;

const pool = new Pool({
  user: String(process.env.DB_USER),
  password: String(process.env.DB_PASSWORD),
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});
(async () => {
  const client = await pool.connect();
  await client.query('SET search_path TO app_schema');
  client.release();
})();

export default pool;
