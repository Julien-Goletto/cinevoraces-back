const {Pool} = require('pg');

const { DB_NAME, DB_USER, DB_HOST, DB_PORT, DB_PW } = process.env;
const clientConfig = process.env.DATABASE_URL || { database: DB_NAME,user: DB_USER,host: DB_HOST,port: DB_PORT,password: DB_PW };

const client = new Pool (
  {
    connectionString: clientConfig, 
    ssl:{ rejectUnauthorized: false }
  }
);

client.connect()
  .then( () => console.log('DB connection is live.'))
  .catch((err) => console.log('DB connection failed.', err));

module.exports = client;
