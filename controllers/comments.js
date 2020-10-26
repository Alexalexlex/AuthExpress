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

const getCommentsById = (req,res) => {
    Comments.findAll({
        where: {
            postId: req.params.id,
        }
    })
    .then((comment) => res.status(201).send(comment))
    .catch((error) => res.status(400).send(error))
}

const delComment = (req, res) => {
    Comments.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(() => res.status(201).send({success: 'Comment deleted'}))
    .catch((error) => res.status(400).send(error))
}

const editComment = (req, res) => {

    const {
        message,
        commentable_type,
        postId,
    } = req.body

    Comments.findOne({
        where: {
            id: Number(req.params.id)
        }
    })
    .then((comment) => {
        comment.update({
            message,
            commentable_type,
            user_id: req.user.id,
            postId,
        })
        res.status(201).send(comment)
    })
    .catch((error) => res.status(400).send(error))
}

module.exports = { getComments, postComment, getCommentsById, delComment, editComment }