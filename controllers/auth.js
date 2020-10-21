const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

const { setToken, handleValidation } = require('../utils');

const signUp = async (req,res) => {
    if (handleValidation(req,res)) {
        try {
            const {
                email,
                password,
                first_name,
                last_name,
            } = req.body;

            const newbie = await Users.findOne({
                where: {
                  email,
                },
              });
              if (newbie) {
                res.status(400).send({
                  success: false,
                  message: 'Email is already registered',
                });
              } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await Users.create({
                  email,
                  first_name,
                  last_name,
                  password: hashedPassword,
                });
                const { id } = newUser;
                res.setHeader('Authorization', setToken({ id }));
                res.status(201)
                  .send({ success: true, message: 'User succesfully created' });
              }
        } catch (error) {
            console.log('err', err);
            res.status(400).send({ error: true, message: 'Something goes wrong...' });    
        }
    }
}

const signIn = async (req, res) => {
    if (handleValidation(req, res)) {
      const { email, password } = req.body;
      try {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
          console.log('usera not found');
          res.status(401).send({
            success: false,
            message: 'Authentication failed. User not found.',
          });
        } else {
          const matchPassword = await bcrypt.compare(password, user.password);
          if (!matchPassword) {
            res.status(401).send({
              success: false,
              message: 'Authentication failed. Wrong password.',
            });
          } else {
            const { id } = user;
            res.setHeader('Authorization', setToken({ id }));
            res.status(200).send({ success: true, message: 'User log in' });
          }
        }
      } catch (err) {
        console.log('err', err);
        res.status(400).send({ error: true, message: 'Something goes wrong...' });
      }
    }
  };

module.exports = { signUp, signIn };