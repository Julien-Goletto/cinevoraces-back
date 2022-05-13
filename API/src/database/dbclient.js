/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
const { Pool } = require('pg');

const {
  DB_NAME, DB_USER, DB_HOST, DB_PORT, DB_PW,
} = process.env;
const PG_URL = process.env.DATABASE_URL;

let clientConfig = {};
if (PG_URL) {
  clientConfig = { connectionString: PG_URL, ssl: { rejectUnauthorized: false } };
} else {
  clientConfig = {
    database: DB_NAME, user: DB_USER, host: DB_HOST, port: DB_PORT, password: DB_PW,
  }, { ssl: { rejectUnauthorized: false } };
}

const client = new Pool(clientConfig);

client.connect()
  .then(() => console.log('DB connection is live.'))
  .catch((err) => console.log('DB connection failed.', err));

module.exports = client;
