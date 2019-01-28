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


module.exports = {
    secret: 'br:231!rqk643@_&hasd$vsad&$vwbssd74?',
    url: 'mongodb://localhost:27017/gkzdb',
    senderMail: 'noreply.brontrixtesting@gmail.com',
    senderPassword:'Brontrix2018',
    ROLES: ['USER', 'ADMIN', 'PF'],
    database: 'mongodb://dbeetoven:41Rdq0criPf29GyD@brontrix-shard-00-00-scfll.mongodb.net:27017,brontrix-shard-00-01-scfll.mongodb.net:27017,brontrix-shard-00-02-scfll.mongodb.net:27017/test?ssl=true&replicaSet=Brontrix-shard-0&authSource=admin&retryWrites=true'
};