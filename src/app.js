const createError = require('http-errors');
const express = require('express');
const expressJwt = require('express-jwt');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const db = require('./db/index')
const {createAllTables}= require('./db/dbconnection');
// const mongoose = require('mongoose');
const config = require('./config/config');

// //Configure mongoose's promise to global promise
// mongoose.promise = global.Promise;

// Routes Path
const authRoute = require('./routes/auth.routes');
// const profilRouter = require('./routes/profil.routes');
// const postRouter = require('./routes/post.routes');
// const supportRouter = require('./routes/support.routes');
// const professionRouter = require('./routes/profession.routes');
// const authRouter = require('./routes/auth.routes');

// App Config
const app = express();
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.json());

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//  Cors Domain
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

// ROUTES
app.get('/', (request, response) => response.json({ info: 'Node.js, Express, and Postgres API' }));
app.use('/api/v1', authRoute);
// app.use('/api/post', postRouter);
// app.use('/api/profilRouter', profilRouter);
// app.use('/api/profession', professionRouter);
// app.use('/api/supportRouter', supportRouter);
// app.use('/auth', authRouter);

app.use((err, req, res, next) => {
      if (err instanceof SyntaxError) return res.status(400).send(JSON.stringify({
          error: "Invalid JSON"
      }))
      console.error(err);
      res.status(500).send();
    });


// Configure Mongoose
// mongoose.connect(config.database, { useNewUrlParser: true, useFindAndModify: false });

// mongoose.set('debug', true);
createAllTables(db);

const PORT = config.port || 3000;
app.listen(PORT, () => console.log(`🚀 are live on ${PORT}`));
module.exports = app;
