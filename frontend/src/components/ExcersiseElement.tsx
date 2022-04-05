import { Box, Button } from '@mui/material'
import { Exercise } from '../types'
import { CodePaper } from './CodePaper'

type ExcersiseElementProps = {
  exercise: Exercise
  back: (v: void) => void
}

export const ExcersiseElement = ({ exercise, back }: ExcersiseElementProps) => {
  return (
    <Box>
      <Button variant="contained" onClick={() => back()}>
        Back
      </Button>
      <Box display="flex" flexDirection="row">
        <CodePaper code={exercise.leftcode} tests={exercise.test} />
        <CodePaper code={exercise.rightcode} tests={exercise.test} />
      </Box>
    </Box>
  )
}
