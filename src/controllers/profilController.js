const Profile = require('../models/profil.model');

const create = async (req, res) => {
  try {
    const user = await Profile.findByIdAndUpdate(
      { _id: req.body.uid },
      { $set: req.body },
      { upsert: true },
    ).exec();
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    const users = await Profile.find()
      .sort(('-created_date'))
      .exec();
    console.log(users);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  create,
  findAll
};
