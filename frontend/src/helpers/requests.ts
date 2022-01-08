export const runTests = (userId: number, file: string) =>
  fetch('/test', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId,
      file,
    }),
  })
    .then((res) => res.json())
    .then(
      (result) => {
        return result
      },
      (error) => {
        return error
      }
    )
