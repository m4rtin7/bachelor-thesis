const path = require('path')
const { exec } = require('child_process')

module.exports.runTests = function runTests(folderName, folderPath) {
  const p = path.resolve(__dirname, './docker/fail.txt')
  const cmd = `cd dockers/${folderName} && docker build --rm . -t ${folderName} && docker run ${folderName} > res.txt && docker image prune -f`

  return new Promise(function (resolve, reject) {
    exec(cmd, (err, code) => {
      if (err) {
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

module.exports.removeDockerImage = function removeDockerImage(imageName) {
  exec(`docker rmi -f '${imageName}:latest'`)
}
