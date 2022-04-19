const isPassedResult = (result) => {
  if (!result) return false
  const lines = result.split('\n')
  console.log('LINES: ', lines)
  return (
    lines.length > 2 && lines[lines.length - 2].toLowerCase().includes('pass')
  )
}

module.exports = {
  isPassedResult,
}
