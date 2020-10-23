const { Posts } = require('../models');

const getPosts = (req,res) => {
    Posts.findAll()
    .then((post) => res.status(201).send(post))
    .catch((error) => res.status(400).send(error));
}

const getPostById = (req, res) => {
    Posts.findAll({
        where: {
            user_id: req.params.id,
        }
    })
    .then((post) => res.status(201).send(post))
    .catch((error) => res.status(400).send(error))
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

const delPost = (req, res) => {
    Posts.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(201).send({success: 'Post deleted'}))
    .catch((error) => res.status(400).send(error))
}

const editPost = async (req,res) => {

    const {
        title,
        description,
    } = req.body    

    Posts.findOne({
        where: {
            id: Number(req.params.id),
        }
    })
    .then((post) => {
        post.update({
            title,
            description
        })
        res.status(201).send(post)
    })
    .catch((error) => res.status(400).send(error))
    }

module.exports = { getPosts, postPost, getPostById, delPost, editPost }