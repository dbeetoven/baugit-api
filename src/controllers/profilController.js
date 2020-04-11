const Profile = require('../models/profil.model');

const create = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      { _id: req.body.uid },
      { $set: req.body },
      { upsert: true },
    ).exec();
    if (!profile) {
      return res.status(400).send({ error: 'User not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).send(error);
  }
};

const findAll = async (req, res) => {
  try {
    const foundProfile = await Profile.find()
      .sort(('-created_date'))
      .exec();
      if (!foundProfile) {
        return res.status(401).send({ error: 'An error was ...' });
      }
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getById=async(req,res)=>{
  try {
    const profile= await Profile.findById({_id:req.body.id}).exec();
    if (!profile) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send({error: 'user not found.'});
  }
}

const update=async(req,res)=>{
  try {
    const profile= await Profile.findByIdAndUpdate({_id:req.body.id},{ $set: req.body },
      { upsert: true }).exec();
    if (!profile) {
      return res.status(401).send({ error: 'Login failed! Check authentication credentials' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send({error: 'user not found.'});
  }
}
const remove=async(req,res)=>{
  try {
    const user= await Profile.findById({_id:req.body.id}).exec();
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send({error: 'user not found.'});
  }
}
module.exports = {
  create,
  findAll,
  getById,
  update,
  remove
};
