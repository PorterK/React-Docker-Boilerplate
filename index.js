const express = require('express');
const fallback = require('express-history-api-fallback');
const api = require('./api');
const morgan = require('morgan');
const db = require('./db');

const app = express();

app.use(morgan('combined'));
app.use('/api', api);

const root = 'frontend';
app.use(express.static(root));
app.use(fallback('index.html', { root }));

app.listen(process.env.PORT, (e) => {
  if (e) {
    console.error('failed to bind', e);
    process.exit(1);
  }
  console.log('==> 🚀 we\'re off!');
});

db.authenticate().then(() => {
  console.log('Connection to the database succeeeded');
  return db.sync({ force: false });
})
.then(() => {
  console.log('Database created or already exists');
})
.catch((err) => {
  console.error(err);
});
