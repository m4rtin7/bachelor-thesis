import { Stack } from '@mui/material'
import { Exercise } from '../types'
import { ExerciseItem } from './ExcersiseItem'

type ExerciseListProps = {
  exercises: Exercise[]
}

export const ExerciseList = ({ exercises }: ExerciseListProps) => {
  return (
    <Stack spacing={2}>
      {exercises.map((exercise, index) => {
        return <ExerciseItem key={index} exercise={exercise} id={exercise.id} />
      })}
    </Stack>
  )
}
