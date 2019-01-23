const profilCtrl = {};
const Profil = require('../models/profil.model.js');

profilCtrl.getById =(req,res)=>{

};

profilCtrl.getAll = (req, res) => {
    Profil.find().select('-__v -created_at -updated_at').exec().then((profils) => {
        res.status(200).json(profils);
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    });
};

profilCtrl.create = (req, res) => {
    console.log("Processing func -> create support.");
    const profil = new Profil(req.body);
    profil.save().then(profilSaved => {
        console.log(JSON.stringify(profilSaved));
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

profilCtrl.deleteById=(req,res)=>{

};
profilCtrl.update=(req,res)=>{
};
module.exports= profilCtrl;