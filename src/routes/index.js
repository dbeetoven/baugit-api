const authRoute = require('./auth.routes');

module.exports = app => {
    app.use('/api/v1', authRoute)
    // app.use('/photos', photos)
}
