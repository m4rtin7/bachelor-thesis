const fs = require('fs-extra')
const path = require('path')
const { runTests, removeDockerImage } = require('../../helpers/runTests')
const { existsSync, rmSync } = require('fs')
const { removeFirstLine } = require('../../helpers/removeFirstLine')
const { validOutputFile } = require('../../helpers/validOutputFile')

const test = async (req, res) => {
  console.log(req.body)
  const body = req.body
  const dependsPath = path.resolve(__dirname, `./dockers/depends`)
  const folderName = body.userId.toString() + Date.now()
  const newFolderPath = path.resolve(__dirname, `./dockers/${folderName}`)

  try {
    const exist = fs.existsSync(folderName)
    if (exist) fs.rmSync(folderName, { recursive: true, force: true })

    await fs
      .copy(dependsPath, newFolderPath)
      .then(() => {
        fs.writeFileSync(`${newFolderPath}/code.cpp`, body.file)
      })
      .catch((err) => {
        throw err
      })
    const result = await runTests(folderName, newFolderPath)
    const resFile = fs.readFile(`${newFolderPath}/res.txt`)

    res.send({
      passed: result,
      file: JSON.stringify((await resFile).toString('utf-8')),
    })
  } catch (err) {
    errorMessage = removeFirstLine(err.message)

    if (errorMessage) {
      console.log('ERROR')
      res.send({
        passed: false,
        file: JSON.stringify(errorMessage),
      })
      return
    }
    if (existsSync(`${newFolderPath}/res.txt`)) {
      const resFile = fs.readFile(`${newFolderPath}/res.txt`)
      res.send({
        passed: false,
        file: JSON.stringify(
          validOutputFile((await resFile).toString('utf-8'))
        ),
      })
    } else {
      res.send(
        JSON.stringify({
          passed: false,
          file: 'Nepodarilo sa vykonať testy.',
        })
      )
    }
  } finally {
    if (fs.existsSync(newFolderPath)) {
      fs.rm(newFolderPath, { recursive: true, force: true })
      removeDockerImage(folderName)
    }
  }
}

module.exports = {
  test,
}
