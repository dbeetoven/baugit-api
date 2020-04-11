const jwt = require('jsonwebtoken');
const Auth = require('../models/auth.model');

const verifyAuth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const data = jwt.verify(token, process.env.JWT_KEY);
    const user = await Auth.findOne({ _id: data._id, 'tokens.token': token }).exec();
    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Not authorized to access this resource' });
  }
};

module.exports = verifyAuth;
