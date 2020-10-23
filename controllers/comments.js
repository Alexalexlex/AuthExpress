const { Comments, Posts } = require('../models');

const getComments = (req,res) => {
    Comments.findAll()
    .then((comment) => res.status(201).send(comment))
    .catch((err) => res.status(400).send(err))
}

const postComment = (req,res) => {

    const {
        message,
        commentable_type,
        postId,
    } = req.body

    Comments.create({
        message,
        commentable_type,
        postId,
        user_id: req.user.id,
    })
    .then((comment) => res.status(201).send(comment))
    .catch((error) => res.status(400).send(error))
}

module.exports = { getComments, postComment }