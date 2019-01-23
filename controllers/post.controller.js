const postCtrl = {};
const Post = require('../models/post.model.js');


postCtrl.getAll = (req, res) => {
    Post.find().select('-__v -created_at -updated_at').exec().then((posts) => {
        res.status(200).json(posts);
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    });
};

postCtrl.create = (req, res) => {
    console.log("Processing func -> create support.");
    const post = new Post(req.body);
    post.save().then(postSaved => {
        console.log(JSON.stringify(postSaved));
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
module.exports= postCtrl;