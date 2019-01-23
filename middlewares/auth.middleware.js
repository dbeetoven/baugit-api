var verifyJWT_MW= function (req, res, next) {
    // var token = (req.method === 'POST') ? req.body.token : req.query.token
    const bearerHeader = req.heagers['authorization'];
    if (typeof bearerHeader !== undefined) {

    } else {
        res.status(403).json({
            status: 403,
            message: "Sorry! You can't see that."
        });
    }

    // verifyJWTToken(token)
    //     .then((decodedToken) => {
    //         req.user = decodedToken.data
    //         next()
    //     })
    //     .catch((err) => {
    //         res.status(400)
    //             .json({
    //                 message: "Invalid auth token provided."
    //             })
    //     })
};

module.exports = verifyJWT_MW;

// exports.validJWTNeeded = (req, res, next) => {
//     if (req.headers['authorization']) {
//         try {
//             let authorization = req.headers['authorization'].split(' ');
//             if (authorization[0] !== 'Bearer') {
//                 return res.status(401).send();
//             } else {
//                 req.jwt = jwt.verify(authorization[1], secret);
//                 return next();
//             }

//         } catch (err) {
//             return res.status(403).send();
//         }
//     } else {
//         return res.status(401).send();
//     }
// };