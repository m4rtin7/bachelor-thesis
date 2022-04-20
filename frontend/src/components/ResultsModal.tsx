import { Dialog, styled } from '@mui/material'
import { useEffect } from 'react'
import { useGetResultsByIdMutation } from '../features/exercisesApi'
import { Result } from '../types'
import { ResultList } from './result/ResultList'

type ResultsModalProps = {
  open: boolean
  onClose: () => void
  exerciseId: number
  handleLoadResult: (r: Result) => void
}

const StyledDialog = styled(Dialog)(({ theme }) => {
  console.log(theme.palette.background.default)

  return {
    '&.MuiDialog-Paper': { backgroundColor: theme.palette.background.default },
  }
})

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

  console.log('RESULTS: ', results)

  return (
    <StyledDialog open={open} onClose={onClose} sx={{ color: '#000' }}>
      <ResultList results={results} handleLoadResult={handleLoadResult} />
    </StyledDialog>
  )
}
