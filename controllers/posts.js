const { Posts } = require('../models')

const getPosts = (req,res) => {
    Posts.findAll()
    .then((user) => res.status(201).send(user))
    .catch((error) => res.status(400).send(error));
}

const postPost = (req,res) => {

    const {
        title,
        description
    } = req.body;

    Posts.create({
        title,
        description,
        user_id: req.user.id
    })
    .then((post) => res.status(201).send(post))
    .catch((error) => res.status(400).send(error))
}

module.exports = { getPosts, postPost }