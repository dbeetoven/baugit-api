const Auth = require('../models/auth.model');
const Profile = require('../models/profil.model');

const signUp = async (req, res) => {
  try {
    const user = new Auth(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findByCredentials(email, password);
    delete user['password'];
    if (!user) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    // const profile= await Profile.findById({_id:user._id}).exec();
    const token = await user.generateAuthToken();
    res.send({ user, token,profile });
  } catch (error) {
    res.status(400).json({
      error,
      message: 'User o password incorrect..',
    });
  }
};

const logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const logoutAll = async (req, res) => {
  try {
    req.user.tokens.splice(0, req.user.tokens.length);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
};

const me = async (req, res) => {
  try {
    const user= req.user;
    delete user['password'];
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
module.exports = {
  signUp,
  login,
  logout,
  logoutAll,
  me,
};
