const professionCtrl = {};
const Profession = require('../models/profession.model.js');


professionCtrl.getAll = (req, res) => {
    Profession.find().select('-__v -created_at -updated_at').exec().then((supports) => {
        res.status(200).json(supports);
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    });
};

professionCtrl.create = (req, res) => {
    console.log("Processing func -> create support.");
    const Profession = new Support(req.body);
    Profession.save().then(professionSaved => {
        console.log(JSON.stringify(professionSaved));
        res.status(200)
            .json({
                message: "Message registered successfully!"
            });
    }).catch(err => {
        res.status(500)
            .json({
                message: err || "Validation failed. Given email and password aren't matching."
            });
    });
};

module.exports = professionCtrl;