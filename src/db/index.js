
const mongoose = require('mongoose')

mongoose.promise = global.Promise;
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
}).then(()=>console.log('Db connected...'))
