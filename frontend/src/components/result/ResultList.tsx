import { Stack } from '@mui/material'
import { Result } from '../../types'
import { ResultListItem } from './ResultListItem'

export const ResultList = ({
  results,
  handleLoadResult,
}: {
  results: Result[]
  handleLoadResult: (r: Result) => void
}) => {
  return (
    <Stack spacing={2} sx={{ backgroundColor: 'transparent' }}>
      {results.map((r, index) => (
        <ResultListItem
          key={index}
          result={r}
          onClick={() => handleLoadResult(r)}
        />
      ))}
    </Stack>
  )
}
