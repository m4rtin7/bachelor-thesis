const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { pool } = require('../database')
const nodemailer = require('nodemailer')
const { randomString } = require('../../helpers/generatePassword')

const login = async (req, res) => {
  const { email, password } = req.body

  pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email],
    async (error, result) => {
      if (error) {
        res.status(401).send({
          auth: false,
          message: 'Unable to login, please try it again later',
        })
        return
      } else {
        if (result.rows.length < 1) {
          res
            .status(401)
            .send({ auth: false, message: 'Bad email or password' })
          return
        }
        const {
          password: encPassword,
          id,
          is_admin: isAdmin,
          name,
          surname,
        } = result.rows[0]

        const compare = await bcrypt.compare(password, encPassword)

        if (compare) {
          const token = jwt.sign({ id }, process.env.JTW_SECRET, {
            expiresIn: 86400000, //1 day
          })

          res.json({ auth: true, token, isAdmin, name, surname })
        } else {
          res
            .status(401)
            .send({ auth: false, message: 'Bad email or password' })
        }
      }
    }
  )
}

const registration = async (req, res) => {
  const { name, surname, email, password } = req.body
  pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email],
    async (error, result) => {
      if (error) {
        res.status(401).send({ error: 'Unable to sign up user, try it later' })
        return
      } else {
        if (result.rows.length > 0) {
          res.status(401).send({ error: 'User with same email already exist!' })
          return
        }
      }
    }
  )
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    pool.query(
      'INSERT INTO users (name, surname, email, password, is_admin) VALUES ($1, $2, $3, $4, $5)',
      [name, surname, email, hashedPassword, false],
      async (error, _result) => {
        if (error || err) {
          res
            .status(400)
            .send({ error: 'Unable to sign up user, try it later' })
        } else {
          res.status(200).send()
        }
      }
    )
  })
}

const resetPassword = async (req, res) => {
  const { email: userEmail } = req.body

  pool.query(
    'SELECT * FROM users WHERE email=$1',
    [userEmail],
    async (error, result) => {
      if (error) {
        res
          .status(400)
          .send({ error: 'Unable to reset password, try it later' })
        return
      } else {
        if (result.rows.length < 1) {
          res.status(400).send({ error: "User with this email doesn't exist!" })
          return
        }
        const newPassword = randomString(10)

        const transporter = nodemailer.createTransport({
          service: 'yahoo',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
          },
        })

        const mailOptions = {
          from: process.env.EMAIL,
          to: userEmail,
          subject: 'Password change',
          text: `Hello, \n Your new password is ${newPassword}`,
        }

        transporter.sendMail(mailOptions, function (error, _info) {
          if (error) {
            res
              .status(400)
              .send({ error: "User with this email doesn't exist!" })
            return
          }
        })

        bcrypt.hash(newPassword, 10, async (err, hashedPassword) => {
          pool.query(
            'UPDATE users SET password=$1 WHERE email = $2',
            [hashedPassword, userEmail],
            async (error, _result) => {
              if (error) {
                res
                  .status(400)
                  .send({ error: 'Unable to change password, try it later' })
              }
              res.status(200).send()
            }
          )
        })
      }
    }
  )
}

const update = async (req, res) => {
  const { name, surname, password, userId: id } = req.body

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    pool.query(
      'UPDATE users SET name=$1, surname=$2, password=$3 WHERE id=$4',
      [name, surname, hashedPassword, id],
      async (error, _result) => {
        if (error || err) {
          res
            .status(400)
            .send({ error: 'Unable to change user data, try it later' })
        } else {
          res.status(200).send()
        }
      }
    )
  })
}

const isAdmin = async (id) => {
  const res = await pool.query('SELECT is_admin FROM users WHERE id=$1', [id])
  return res ? res.rows[0]?.is_admin : false
}

module.exports = {
  login,
  registration,
  resetPassword,
  update,
  isAdmin,
}
