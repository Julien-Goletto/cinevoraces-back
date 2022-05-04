require('dotenv').config();
const { HOST, PORT } = process.env;
const debug = require('debug')("App");
const app = require('./app');

app.listen(PORT, () => {
  debug(`Listening on http://${HOST}:${PORT}`)
});
