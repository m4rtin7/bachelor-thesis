const { pool } = require('../database')

const addResult = async (result) => {
  console.log('IAM HERE!')
  const {
    exerciseId,
    userId,
    leftCode,
    leftResult,
    rightCode,
    rightResult,
    passed,
  } = result
  await pool.query(
    `INSERT INTO results (exercise_id, user_id, left_code, left_result, right_code, right_result, passed, saved_on) VALUES ($1, $2, $3, $4, $5, $6, $7, now())`,
    [exerciseId, userId, leftCode, leftResult, rightCode, rightResult, passed],
    (err) => {
      console.log(err)
    }
  )
}

module.exports = {
  addResult,
}
