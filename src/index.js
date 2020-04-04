const createError = require('http-errors');
const express = require('express');
const expressJwt = require('express-jwt');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const config = require('./config/config'); // get our config file

var passport = require('passport');
var session = require('express-session');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Routes Path
const indexRouter = require('./routes/index');
const profilRouter = require('./routes/profil.routes');
const postRouter = require('./routes/post.routes');
const supportRouter = require('./routes/support.routes');
const professionRouter = require('./routes/profession.routes');
const authRouter=require('./routes/auth.routes');

// Express
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// settings 
const corsOptions = {
	origin: 'http://localhost:3000',
	optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
	res.header('Access-Control-Expose-Headers', 'Content-Length');
	res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
	if (req.method === 'OPTIONS') {
		return res.send(200);
	} else {
		return next();
	}
});
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));
app.use(cookieParser());
// app.use(express.static('publica'));
// app.use(expressJwt({
// 	secret: config.secret
// }).unless({
// 	path: ["/auth/*",
// 		"/api/auth/signup",
// 		"/api/auth/forgot",
// 		"/api/auth/reset"
// 	]
// }));

app.use(session({
	secret: config.secret,
	resave: true,
	saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  
// MIDDLEWARES
app.use(logger('dev'));

// ROUTES
app.use('/', indexRouter);
app.use('/api/post', postRouter);
app.use('/api/profilRouter', profilRouter);
app.use('/api/profession', professionRouter);
app.use('/api/supportRouter', supportRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

// // Mongoose
mongoose.connect(config.database, {
	useNewUrlParser: true,
	useFindAndModify: false
}).then(() => {
	console.log("Successfully connected to MongoDB.");
}).catch(err => {
	console.log('Could not connect to MongoDB.');
	process.exit();
}); // connect to database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
module.exports = app;
