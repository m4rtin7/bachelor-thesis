const e = require('express')

module.exports.validOutputFile = function validOutputFile(s) {
  const lines = s.split('\n')
  if (
    lines[lines.length - 2].includes('FAIL') ||
    lines[lines.length - 2].includes('PASS')
  )
    return s
  else return s + 'PREKROCIL SI CASOVY LIMIT NA TESTY\n'
}