
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config/config');
require('./db');

//  APP Routes 
const commonRoute = require('./routes/common.routes');
const authRoute = require('./routes/auth.routes');
const profileRoute = require('./routes/profil.routes');

// App Config
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: function (origin, callback) {
    if (config.whitleListDomain.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));

app.use(helmet());

app.use('/api/v1/common', commonRoute);
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/profile', profileRoute);

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


const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`🚀 are live on ${PORT}`));
module.exports = app;
