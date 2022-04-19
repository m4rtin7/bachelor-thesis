const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { pool } = require('../database')

const login = async (req, res) => {
  const { email, password } = req.body

  console.log(process.env.JTW_SECRET)

  await pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email],
    async (error, result) => {
      if (error) {
        res.status(401).send({
          auth: false,
          message: 'Unable to login, please try it again later',
        })
      } else {
        const { password: encPassword, id, is_admin: isAdmin } = result.rows[0]
        console.log('PASSWORDS: ', password, encPassword)

        const compare = await bcrypt.compare(password, encPassword)
        console.log(password, compare)

        if (compare) {
          console.log('PASSED')
          const token = jwt.sign({ id }, process.env.JTW_SECRET, {
            expiresIn: 86400000, //1 day
          })

          res.json({ auth: true, token, isAdmin })
        } else {
          res
            .status(401)
            .send({ auth: false, message: 'Bad email or password' })
        }
      }
    }
  )
}

module.exports = {
  login,
}
