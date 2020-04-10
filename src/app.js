
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const config = require('./config/config');
require('./db');

//  APP Routes 
const authRoute = require('./routes/auth.routes');
const profileRoute = require('./routes/profil.routes');

// App Config
const app = express();
app.use(morgan('combined'));
app.use(express.json());
app.use(helmet());

app.use('/api/v1', authRoute);
app.use('/api/v1', profileRoute);

mongoose.set('debug', true);


app.get('/', (request, response) => response.json({ info: 'Node.js, Express, and Postgres API' }));

// Mildeware
app.use((err, req, res, next) => {
  res.setHeader('Content-type','application/json');
  if (err instanceof SyntaxError)
    return res.status(400).send(
      JSON.stringify({
        error: 'Invalid JSON',
      }),
    );
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

app.options('*',cors());

const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`🚀 are live on ${PORT}`));
module.exports = app;
