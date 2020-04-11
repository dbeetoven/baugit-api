const PostCategory = require('../models/postCategory.model');

const postCategory = async (req, res) => {
  try {
    const postCategories = await PostCategory.find().exec();
    (!postCategories)return res.status(404).send({error:'Post categories not found'})
    res.status(200).json(postCategories);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  postCategory
};
