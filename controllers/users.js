const Users = require('../models');

module.exports = {
    list(req,res) {
        return Users
        .findAll()
        .then((users) => res.status(200).send(users))
        .catch((err) => { res.status(400).send(err); });
    },

    add(req, res) {
        return Users
          .create({
            email: req.body.email,
            password: req.body.password,
          })
          .then((user) => res.status(201).send(user))
          .catch((error) => res.status(400).send(error));
      },
}