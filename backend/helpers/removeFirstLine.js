module.exports.removeFirstLine = function removeFirstLine(string) {
  return string.split('\n').slice(1).join('\n')
}
