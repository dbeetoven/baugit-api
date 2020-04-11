const Nationality = require('../models/nationality.model');

const nationality = async (req, res) => {
  try {
    const nationalities = await Nationality.find().exec();
    res.status(200).json(nationalities);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  nationality
};
