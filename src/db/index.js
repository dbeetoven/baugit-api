
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ silent: true });

const databaseConfig = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
  password: process.env.DATABASE_PASSWORD,
  port: process.env.DATABASE_PORT,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: {
    rejectUnauthorized: false,
}}


const pool = new Pool(databaseConfig);

pool.on('connect', client => {
  console.log('pool connected...')
})
pool.on('error', (err, client) => {
  console.error('Error:', err);
  process.exit(-1)
});
process.on('unhandledRejection', error => {
  pool.end();
});


module.exports = {
  query: (text, params, callback) => pool.query(text, params),
  end:()=>pool.end()
  }
