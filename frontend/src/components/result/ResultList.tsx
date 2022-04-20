import { Stack } from '@mui/material'
import { Result } from '../../types'
import { Label } from '../typography'
import { ResultListItem } from './ResultListItem'
import { Paper } from '../Paper'

export const ResultList = ({
  results,
  handleLoadResult,
}: {
  results: Result[]
  handleLoadResult: (r: Result) => void
}) => {
  return (
    <Stack spacing={2}>
      {results && results.length > 0 ? (
        results.map((r, index) => (
          <ResultListItem
            key={index}
            result={r}
            onClick={() => handleLoadResult(r)}
          />
        ))
      ) : (
        <Paper>
          <Label>No data to show</Label>
        </Paper>
      )}
    </Stack>
  )
}
