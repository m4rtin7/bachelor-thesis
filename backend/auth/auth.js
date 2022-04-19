const jwt = require('jsonwebtoken')

const varifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (token) {
    jwt.verify(token, process.env.JTW_SECRET, (err, decoded) => {
      if (err) {
        res.status(400).send({ auth: false, message: 'Unable to auth user' })
      } else {
        req.body = { ...req.body, userId: decoded.id }
        next()
      }
    })
  } else {
    res.status(400).send({ message: 'Unable to auth user' })
  }
}

const getIdFromToken = async (token) =>
  await jwt.verify(token, process.env.JTW_SECRET, (err, decoded) => {
    if (err) {
      console.log(err)
      return undefined
    } else {
      return decoded.id
    }
  })

module.exports = {
  varifyJWT,
  getIdFromToken,
}
