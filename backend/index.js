require('dotenv').config()
const express = require('express')
const cors = require('cors')
const workers = require('./helpers/workers')
const database = require('./database/queries.js')

const app = express()
const bodyParser = require('body-parser')
const { varifyJWT } = require('./auth/auth')

app.use(cors())

const jsonParser = bodyParser.json()

app.post('/test', jsonParser, varifyJWT, workers.passTaskToWorker)
app.post('/submitTest', jsonParser, varifyJWT, workers.passTaskToWorker)

app.get('/exercises', varifyJWT, database.exercise.getAll)

app.post('/exercise', varifyJWT, jsonParser, database.exercise.add)
app.get('/exercise', varifyJWT, jsonParser, database.exercise.get)
app.put('/saveExercise', varifyJWT, jsonParser, database.exercise.save)
app.post('/savedExercise', jsonParser, varifyJWT, database.exercise.getSaved)
app.post(
  '/results',
  varifyJWT,
  jsonParser,
  database.result.getUsersResultsByExerciseId
)
app.delete('/exercise', jsonParser, varifyJWT, database.exercise.deleteExercise)
app.post('/editExercise', jsonParser, varifyJWT, database.exercise.edit)

app.post('/login', jsonParser, database.user.login)
app.post('/registration', jsonParser, database.user.registration)
app.post('/resetPassword', jsonParser, database.user.resetPassword)
app.post('/updateUser', jsonParser, varifyJWT, database.user.update)

const port = process.env.PORT || 3001
app.listen(port, () => {
  workers.makeWorkers(2)
  console.log(workers.workers)
  console.log(`Listening on port ${port}...`)
})
