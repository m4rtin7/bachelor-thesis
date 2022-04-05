require('dotenv').config()
const express = require('express')
const cors = require('cors')
const workers = require('./helpers/workers')
const database = require('./database/queries.js')

const app = express()
const bodyParser = require('body-parser')

app.use(cors())

const jsonParser = bodyParser.json()

app.post('/test', jsonParser, workers.passTaskToWorker)

app.get('/exercises', database.exercise.getAll)

app.post('/exercise', jsonParser, database.exercise.add)
app.get('/exercise', jsonParser, database.exercise.get)

const port = process.env.PORT || 3001
app.listen(port, () => {
  workers.makeWorkers(2)
  console.log(workers.workers)
  console.log(`Listening on port ${port}...`)
})
