
const express = require('express');
// const path = require('path');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const appRoutes = require('./routes');
const config = require('./config/config');
require('./db');

// App Config
const app = express();
appRoutes(app); // Routes 
app.use(require('morgan')('dev'));
app.use(express.json())

// Configure mongoose's promise to global promise


mongoose.set('debug', true);
// view engine setup
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.get('/', (request, response) => response.json({ info: 'Node.js, Express, and Postgres API' }));

// Mildeware
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError)
    return res.status(400).send(
      JSON.stringify({
        error: 'Invalid JSON',
      }),
    );
  console.error(err);
  res.status(500).send();
});

// Cors Domain
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (config.whitleListDomain.indexOf(origin) === -1) {
        return callback(new Error(config.corsError), false);
      }
      return callback(null, true);
    },
  }),
);

const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`🚀 are live on ${PORT}`));
module.exports = app;
