const supportCtrl = {};
const Support = require('../models/support.model.js');


supportCtrl.getAll = (req, res) => {
    Support.find().select('-__v -created_at -updated_at').exec().then((supports) => {
        res.status(200).json(supports);
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    });
};

supportCtrl.create = (req, res) => {
    console.log("Processing func -> create support.");
    const support = new Support(req.body);
    support.save().then(supportSaved => {
        console.log(JSON.stringify(supportSaved));
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

module.exports = supportCtrl;
