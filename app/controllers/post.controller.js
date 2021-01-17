const db = require('../models');
const Post = db.posts;
const Op = db.Sequelize.Op;

// create data
exports.create = (req, res) => {
    //Validate request
    if(!req.body.title){
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
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%`} } : null;
    Post.findAll({where: condition})
    .then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || "Some error occured while find post"
        });
    })
}

// Find single
exports.findOne = (req, res) => {
    const id = req.params.id;
    Post.findByPk(id)
    .then((data) => {
        res.send(data);
    }).catch((err) => {
        res.status(500).send({
            message: "Eroor retrieving post with id="+id
        })
    })
}

// Update Data
exports.update = (req, res) => {
    const id = req.params.id;

    Post.update(req.body, {
        where: { id: id }
    }).then((data) => {
        if(data == 1){
            res.send({
                message: "Post was updated succesfully"
            });
        }else{
            res.send({
                message: `Cannot update Post with id=${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Error updating post with id="+ id
        })
    })
}

//Delete data
exports.delete = (req, res) => {
    const id = req.params.id;

    Post.destroy({
        where: {id: id}
    }).then((result) => {
        if(result == 1){
            res.send({
                message: "Post was deleted successfully"
            })
        }else{
            res.send({
                message: `Cannot delete post with id=${id}`
            })
        }
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete post with id="+id
        })
    });
}

//delete all post
exports.deleteAll = (req, res) => {
    Post.destroy({
        where: {},
        truncate: false
    }).then((result) => {
        res.send({
            message: result+" All Post was deleted succesfully"
        });
    }).catch((err) => {
        res.status(500).send({
            message: "Could not delete all post"
        });
    });
}

//find all publish
exports.findAllPublished = (req, res) => {
    Post.findAll({
        where: {published : true}
    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        res.status(500).send({
            message: err.message || 'Some error occured retrieving posts'
        })
    })
}