const {Pool} = require('pg');
const debug = require('debug')('DB_Client');

const { DB_NAME, DB_USER, DB_HOST, DB_PORT, DB_PW } = process.env;
const clientConfig = process.env.DATABASE_URL || { database: DB_NAME,user: DB_USER,host: DB_HOST,port: DB_PORT,password: DB_PW };

const client = new Pool (clientConfig, 
  {
    connectionString: process.env.DATABASE_URL,
    ssl:{ rejectUnauthorized: false } // On accepte de se passer de SSL
  }
);

client.connect()
  .then( () => debug('DB connection is live.'))
  .catch((err) => debug('DB connection failed.', err));

module.exports = client;
