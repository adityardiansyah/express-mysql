const db = require('../models');
const Post = db.posts;
const Op = db.Sequelize.Op;

// create data
exports.create = (req, res) => {
    //Validate request
    if(!res.body.title){
        res.status(400).send({
            message: "Content can not be empty"
        });
        return;
    }
    
    const post = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false 
    }

    Post.create(post)
    .then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error"
        })
    })
}

// Find All data
exports.findAll = (req, res) => {

}

// Find single
exports.findOne = (req, res) => {

}

// Update Data
exports.update = (req, res) => {

}

//Delete data
exports.delete = (req, res) => {

}

//delete all post
exports.deleteAll = (req, res) => {

}

//find all publish
exports.findAllPublished = (req, res) => {

}