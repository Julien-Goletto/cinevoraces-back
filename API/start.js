require('dotenv').config();

const { HOST, PORT } = process.env;
const app = require('./app');

app.listen(PORT, () => {
  console.log(`Listening on http://${HOST}:${PORT}`);
});
