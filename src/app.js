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
app.use(helmet());


// App Mildeware
const corsOptions = {
  origin: function (origin, callback) {
    if (config.whitleListDomain.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use((err, req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

  res.setHeader('Content-type', 'application/json');
  if (err instanceof SyntaxError)
    return res.status(400).send(
      JSON.stringify({
        error: 'Invalid JSON',
      }),
    );
  res.status(500).send();
});


app.use('/api/v1/common',cors(corsOptions), commonRoute);
app.use('/api/v1/auth',cors(corsOptions), authRoute);
app.use('/api/v1/profile',cors(corsOptions), profileRoute);

app.get('/', (request, response) => response.json({ info: 'Baugit Node Api.' }));

mongoose.set('debug', true);

const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`🚀 are live on ${PORT}`));
module.exports = app;
