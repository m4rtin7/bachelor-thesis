const { pool } = require('../database')
const { getIdFromToken } = require('../../auth/auth')
const { isAdmin } = require('./user')

const getAll = async (_req, res) => {
  pool.query('SELECT * FROM exercises', (error, result) => {
    if (error) {
      res.status(400).send('error code:', error.code, error.message)
    } else {
      res.status(200).send(result.rows)
    }
  })
}

const get = async (req, res) => {
  const { id } = req.body

  pool.query('SELECT * FROM exercises WHERE id=$1', [id], (error, result) => {
    if (error) {
      res.status(400).send('error code:', error.code, error.message)
    } else {
      res.status(200).send(result.rows)
    }
  })
}

const _get = (id) => pool.query('SELECT * FROM exercises WHERE id=$1', [id])

const add = async (req, res) => {
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

  pool.query(
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
        res.status(400).send(error.message)
      } else res.status(200).send({ message: 'Insertion was successful' })
    }
  )
}

const save = async (req, res) => {
  const { id: exerciseId, leftcode: leftCode, rightcode: rightCode } = req.body
  const userId = await getIdFromToken(req.headers['x-access-token'])

  pool.query(
    `INSERT INTO saved_exercises (exercise_id, user_id, left_code, right_code) VALUES ($1, $2, $3, $4) 
    ON CONFLICT ON CONSTRAINT exercise_user_unique 
    DO UPDATE SET left_code = $3, right_code = $4 
    `,
    [exerciseId, userId, leftCode, rightCode],
    (error) => {
      if (error) res.status(400).send(error.message)
      else res.status(200).send({ message: 'Insertion was successful' })
    }
  )
}

const getSaved = async (req, res) => {
  const { id: exerciseId } = req.body
  const userId = await getIdFromToken(req.headers['x-access-token'])

  pool.query(
    `SELECT * FROM saved_exercises WHERE exercise_id = $1 AND user_id = $2`,
    [exerciseId, userId],
    (error, result) => {
      if (error) res.status(400).send(error.message)
      else res.send(result.rows[0])
    }
  )
}

const deleteExercise = async (req, res) => {
  const { id: exerciseId, userId } = req.body
  if (await isAdmin(userId))
    pool.query(`DELETE FROM exercises WHERE id=$1`, [exerciseId])
}

const edit = async (req, res) => {
  const {
    id,
    versionleft,
    versionright,
    title,
    text,
    leftcode,
    rightcode,
    editleft,
    test,
  } = req.body

  pool.query(
    'UPDATE exercises SET versionleft=$1, versionright=$2, title=$3, text=$4, leftcode=$5, rightcode=$6, editleft=$7, test=$8 WHERE id =$9',
    [
      versionleft,
      versionright,
      title,
      text,
      leftcode,
      rightcode,
      editleft,
      test,
      id,
    ],
    (error) => {
      if (error) {
        res.status(400).send(error.message)
      } else res.status(200).send({ message: 'Update was successful' })
    }
  )
}

module.exports = {
  getAll,
  add,
  get,
  edit,
  _get,
  save,
  getSaved,
  deleteExercise,
}
