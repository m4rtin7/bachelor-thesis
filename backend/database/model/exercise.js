const { pool } = require('../database')

const getAll = async (_req, res) => {
  console.log('HERE')
  await pool.query('SELECT * FROM exercises', (error, result) => {
    if (error) {
      res.status(400).send('error code:', error.code, error.message)
    } else {
      console.log(result.rows)
      res.status(200).send(result.rows)
    }
  })
}

const get = async (req, res) => {
  const { id } = req.body

  await pool.query(
    'SELECT * FROM exercises WHERE id=$1',
    [id],
    (error, result) => {
      if (error) {
        res.status(400).send('error code:', error.code, error.message)
      } else {
        res.status(200).send(result.rows)
      }
    }
  )
}

const _get = (id) => pool.query('SELECT * FROM exercises WHERE id=$1', [id])

const add = async (req, res) => {
  console.log(req.body)
  const {
    versionleft,
    versionright,
    title,
    text,
    leftcode,
    rightcode,
    editleft,
    test,
  } = req.body

  await pool.query(
    'INSERT INTO exercises(versionleft, versionright, title, text, leftcode, rightcode, editleft, test) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [
      versionleft,
      versionright,
      title,
      text,
      leftcode,
      rightcode,
      editleft,
      test,
    ],
    (error) => {
      if (error) {
        console.log(error.message)
        res.status(400).send(error.message)
      } else res.status(200).send({ message: 'Insertion was successful' })
    }
  )
}

module.exports = {
  getAll,
  add,
  get,
  _get,
}
