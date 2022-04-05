var fs = require('fs')
var path = require('path')

const makeFile = (dir, name, text) => {
  fs.writeFileSync(path.join(dir, name), text)
}

module.exports = {
  makeFile,
}
