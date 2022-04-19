const fs = require('fs')
const path = require('path')
const { exec } = require('child_process')
const { makeFile } = require('./fileSystem')
const { exercise } = require('../database/queries')
const { getIdFromToken } = require('../auth/auth')
const { isPassedResult } = require('./passedResult')
const { addResult } = require('../database/model/result')

let workers = []
let queue = []
let savedResults = []

const makeWorkers = (numberOfWorkers) => {
  for (i = 0; i < numberOfWorkers; i++) {
    const worker = `worker${i}`

    const workersDirPath = path.join(__dirname, `../docker/workers`)
    const workerDir = path.join(workersDirPath, worker)
    if (!fs.existsSync(workerDir)) {
      fs.mkdirSync(workerDir)
      //   fs.mkdirSync(path.join(workerDir, 'build'))
    }

    const cmd = `(docker stop ${worker} || true && docker rm ${worker} || true ) && docker run --name ${worker} -d -v ${workerDir}:/test worker`

    exec(cmd, (err, code) => {
      if (err) {
        console.log(err.message)
      } else {
        console.log(worker, ' made')
        workers.push(worker)
      }
    })
  }
}

const passTaskToWorker = async (req, res) => {
  const taskData = {
    ...req.body,
    userId: await getIdFromToken(req.headers['x-access-token']),
  }

  const worker = workers.pop()

  if (worker) {
    runTests(worker, taskData, res)
  } else {
    queue.push([taskData, res])
  }
}

const runTests = async (worker, taskData, res) => {
  const r = await executeTests(worker, taskData)
  console.log(taskData)
  fs.readFile(
    path.join(__dirname, `../docker/workers/${worker}/result.txt`),
    'utf8',
    function (err, result) {
      const resp =
        result ===
          'Command failed: docker exec worker1 bash -c "cd test && cmake -S . -B build && cmake --build build && ./build/solution> result.txt"\n"' ||
        result === undefined
          ? r
          : result

      // console.log('RESPONSE: ', resp)
      // console.log('ERROR: ', err)

      if (taskData.save) saveResult({ ...taskData, result })

      res.send(JSON.stringify(resp))
    }
  )

  const nextTask = queue.shift()

  if (nextTask) {
    runTests(worker, nextTask[0], nextTask[1])
  } else {
    workers.push(worker)
  }
}

const executeTests = async (worker, taskData) => {
  makeFile(
    path.join(__dirname, `../docker/workers/${worker}`),
    'code.cpp',
    taskData.code
  )

  const exerciseById = (await exercise._get(taskData.id)).rows[0]
  console.log(taskData.id, exerciseById)
  const test = taskData.test || exerciseById.test
  makeFile(
    path.join(__dirname, `../docker/workers/${worker}`),
    'tests.cpp',
    test
  )

  const cmakePath = path.join(
    __dirname,
    `../docker/depends/CMakeLists/${taskData.version}/CMakeLists.txt`
  )
  const destPath = path.join(
    __dirname,
    `../docker/workers/${worker}/CMakeLists.txt`
  )

  console.log(worker)

  fs.copyFileSync(cmakePath, destPath)

  const cmd = `docker exec ${worker} bash -c "cd test ; rm result.txt ; cmake -S . -B build && cmake --build build && timeout 30 ./build/solution > result.txt"`

  return new Promise(function (resolve, reject) {
    exec(cmd, (err, code) => {
      if (err) {
        // console.log(err)
        resolve(err.message)
      } else {
        resolve('')
      }
    })
  }).catch((err) => {
    return err.message
  })
}

const saveResult = async (taskData) => {
  console.log(savedResults, 'HERE')
  const otherResultIndex = savedResults.findIndex(
    (r) =>
      r.id === taskData.id &&
      r.userId === taskData.userId &&
      r.left !== taskData.left
  )

  if (otherResultIndex === -1) {
    savedResults.push(taskData)
    return
  }

  const otherResult = savedResults.splice(otherResultIndex, 1)[0]

  console.log(
    'PASSED: ',
    isPassedResult(taskData.result),
    isPassedResult(otherResult.result)
  )

  const result = {
    exerciseId: taskData.id,
    userId: taskData.userId,
    leftCode: taskData.left ? taskData.code : otherResult.code,
    leftResult: taskData.left ? taskData.result : otherResult.result,
    rightCode: taskData.left ? otherResult.code : taskData.code,
    rightResult: taskData.left ? otherResult.result : taskData.result,
    passed:
      isPassedResult(taskData.result) && isPassedResult(otherResult.result),
  }

  console.log('DLZKA: ', savedResults.length)

  addResult(result)
}
module.exports = {
  makeWorkers,
  workers,
  passTaskToWorker,
}
