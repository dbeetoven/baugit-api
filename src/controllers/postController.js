const Post = require('../models/post.model');

const create = async (req, res) => {
  try {
    if(req.body)
    const post = await Post.create(req.body)
    res.status(200).json(post);
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
  findAll
};
