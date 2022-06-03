const { pool } = require('../database')
const camelcaseKeys = require('camelcase-keys')
const { getIdFromToken } = require('../../auth/auth')

const addResult = async (result) => {
  const {
    exerciseId,
    userId,
    leftCode,
    leftResult,
    rightCode,
    rightResult,
    passed,
  } = result
  pool.query(
    `INSERT INTO results (exercise_id, user_id, left_code, left_result, right_code, right_result, passed, saved_on) VALUES ($1, $2, $3, $4, $5, $6, $7, now())`,
    [exerciseId, userId, leftCode, leftResult, rightCode, rightResult, passed]
  )
}

const getUsersResultsByExerciseId = async (req, res) => {
  const userId = await getIdFromToken(req.headers['x-access-token'])
  const { id } = req.body

  pool.query(
    'SELECT * FROM results WHERE user_id = $1 AND exercise_id = $2',
    [userId, id],
    (err, result) => {
      if (err) {
        res.status(400).send({ error: 'Failed to fetch from DB' })
      } else {
        res.status(200).send(JSON.stringify(camelcaseKeys(result.rows)))
      }
    }
  )
}

module.exports = {
  addResult,
  getUsersResultsByExerciseId,
}
