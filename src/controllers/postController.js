const Post = require('../models/post.model');

const create = async (req, res) => {
  try {
    const post = Post(req.body);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(400).send(error);
  }
};
const update = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate({ id: req.body._id }, { $set: req.body }, { upsert: true });
    if(!post) res.send(404).json({error:"post Not Foud"})
    res.status(200).json(post);
  } catch (error) {
    res.status(400).send(error);
  }
};

const remove = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete({ id: req.body._id });
    if(!post) res.send(404).json({error:"post Not Foud"})
    res.status(200).json({message:"post deleted"});
  } catch (error) {
    res.status(400).send(error);
  }
};
const findAll = async (req, res) => {
  try {
    const users = await Post.find()
      .sort(('created_date': -1))
      .exec();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  create,
  findAll,
  update,
  delete
};
