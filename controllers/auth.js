const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users } = require('../models');

const setToken = (data) => {
  const payload = { id: data.id };
  const token = jwt.sign(payload, 'secret', {
    expiresIn: 1000 * 1000,
  });
  return token;
}

const signUp = async (req, res) => {
  try {
    const {
      email,
      password,
      first_name,
      last_name,
    } = req.body;
    const newUser = await Users.findOne({
      where: { email, },
    })
    if (newUser) {
        res.status(400).send({
        success: false,
        message: 'phel! Email has already in!',
      })
    } else {
      const hashPass = await bcrypt.hash(password, 10)
      const newbie = await Users.create({
        email,
        password: hashPass,
        first_name,
        last_name,
      })
      res.setHeader('access-token', setToken(newbie.id))
      res.status(201).send({
        success: true,
        message: newbie
      })
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

const signIn = async (req,res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const user = await Users.findOne({where:{email,},})
    if (!user) {
      res.status(400).send({
        success: false,
        message: 'pshel! First of all Sign Up!'
      })
    } else {
      const truepass = await bcrypt.compare(password, user.password)
      if (!truepass) {
         return res.status(400).send({
          success: false,
          message: 'pshel!'
        })
      } else {
        res.setHeader('access-token', setToken(user.id))
        res.status(201).send({
          success: true,
          message: user,
        })
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { signUp, signIn }