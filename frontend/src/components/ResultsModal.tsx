import { Dialog } from '@mui/material'
import { useEffect } from 'react'
import { useGetResultsByIdMutation } from '../features/exercisesApi'
import { Result } from '../types'
import { ResultList } from './result/ResultList'
import { Label } from './typography'

type ResultsModalProps = {
  open: boolean
  onClose: () => void
  exerciseId: number
  handleLoadResult: (r: Result) => void
}

export const ResultsModal = ({
  open,
  onClose,
  exerciseId,
  handleLoadResult,
}: ResultsModalProps) => {
  const [getResults, { data: results }] = useGetResultsByIdMutation()

  useEffect(() => {
    getResults(exerciseId)
  }, [exerciseId, getResults])

  return (
    <Dialog open={open} onClose={onClose}>
      {results && results.length > 0 ? (
        <ResultList results={results} handleLoadResult={handleLoadResult} />
      ) : (
        <Label sx={{ backgroundColor: 'transparent' }}>No data to show</Label>
      )}
    </Dialog>
  )
}
