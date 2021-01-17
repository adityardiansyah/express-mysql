module.exports = app => {
    const post = require('../controllers/post.controller');

    let router = require('express').Router();

    // Create a new Post
    router.post("/", post.create);

    // Retrive published posts
    router.get('/published', post.findAllPublished);
    
    // Retrive all posts
    router.get("/", post.findAll);

    // Retrive find one post
    router.get("/:id", post.findOne);

    // Update a post
    router.put("/:id", post.update);

    // Delete a post
    router.delete("/:id", post.delete);

    // Delete All post
    router.delete("/", post.deleteAll);

    app.use("/api/posts", router);
}