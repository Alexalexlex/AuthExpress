const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

const setToken = (id) => {
  const payload = { id: id };
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

    const newUser = await User.findOne({
      where: { email, },
    })

    if (newUser) {
        res.status(400).send({
        success: false,
        message: 'Email has already in!',
      })

    } else {
      const hashPass = await bcrypt.hash(password, 10)
      const newbie = await User.create({
        email,
        password: hashPass,
        first_name,
        last_name,
      })

      const token = setToken(newbie.id)

      res.setHeader('Authorization', `Bearer ${token}`)

      res.status(201).send({
        success: true,
        token: token,
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

    const user = await User.findOne({where:{email}})

    console.log(user)

    if (!user) {
      res.status(400).send({
        success: false,
        message: 'First of all Sign Up!'
      })
    } else {
      const truepass = await bcrypt.compare(password, user.password)
      if (!truepass) {
         return res.status(400).send({
          success: false,
          message: 'Error'
        })
      } else {
        const token = setToken(user.id);
        res.setHeader('Authorization', `Bearer ${setToken(user.id)}`)
        res.status(201).send({
          success: true,
          token: token,
        })
      }
    }
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { signUp, signIn }