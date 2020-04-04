// module.exports = {
//     "port": 3600,
//     "jwt_secret": "myS33!!creeeT",
//     "jwt_expiration_in_seconds": 36000,
//     "environment": "dev",
//     "permissionLevels": {
//         "USER": 1,
//         "PROFESIONAL": 4,
//         "ADMIN": 2048
//     },
//     'secret': 'br:231!rqk643@_&hasd$vsad&$vwbssd74?',
//     'database': 'mongodb://dbeetoven:41Rdq0criPf29GyD@brontrix-shard-00-00-scfll.mongodb.net:27017,brontrix-shard-00-01-scfll.mongodb.net:27017,brontrix-shard-00-02-scfll.mongodb.net:27017/test?ssl=true&replicaSet=Brontrix-shard-0&authSource=admin&retryWrites=true'

// };

const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    secret: process.env.API_SECRET,
    url: process.env.MONGO_LOCAL,
    senderMail: process.env.SENDER_MAIL,
    senderPassword:process.env.SENDER_PASSWORD,
    ROLES:process.env.ROLES,
    database:process.env.MONGO_URL
}
