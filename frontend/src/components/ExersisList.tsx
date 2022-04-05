import { Stack } from '@mui/material'
import { Exercise } from '../types'
import { ExerciseItem } from './ExcersiseItem'

type ExerciseListProps = {
  exercises: Exercise[]
  setId: (id: number | undefined) => void
}

export const ExerciseList = ({ exercises, setId }: ExerciseListProps) => {
  return (
    <Stack spacing={2}>
      {exercises.map((exercise, index) => {
        return (
          <ExerciseItem
            key={index}
            exercise={exercise}
            onClick={() => {
              setId(index)
            }}
          />
        )
      })}
    </Stack>
  )
}
