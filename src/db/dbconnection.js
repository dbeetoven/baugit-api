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
  // pool.end();
});
process.on('unhandledRejection', error => {
  pool.end();
});

/**
 * Create User Table
 * CREATE TABLE test
  (id SERIAL PRIMARY KEY, 
  name VARCHAR(100) UNIQUE NOT NULL, 
  phone VARCHAR(100));
 */

const createUserTable = () => {
  const userCreateQuery = `CREATE TABLE IF NOT EXISTS users
  (id SERIAL PRIMARY KEY, 
  email VARCHAR(100) UNIQUE NOT NULL, 
  first_name VARCHAR(100),
  username VARCHAR(30),
  last_name VARCHAR(100), 
  password VARCHAR(100) NOT NULL,
  created_on DATE NOT NULL)`;

  pool
    .query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create Buses Table
 */
const createBusTable = () => {
  const busCreateQuery = `CREATE TABLE IF NOT EXISTS post
    (id SERIAL PRIMARY KEY,
    number_plate VARCHAR(100) NOT NULL,
    manufacturer VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year VARCHAR(10) NOT NULL,
    capacity integer NOT NULL,
    created_on DATE NOT NULL)`;

  pool
    .query(busCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Drop User Table
 */
const dropUserTable = () => {
  const usersDropQuery = 'DROP TABLE IF EXISTS users';
  pool
    .query(usersDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};


/**
 * Create All Tables
 */
const createAllTables = () => {
  createUserTable();
  createBusTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUserTable();
  dropBusTable();
};

module.exports = {
  createAllTables,
  dropAllTables,
};

require('make-runnable');
