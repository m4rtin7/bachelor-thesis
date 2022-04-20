import { Box } from '@mui/material'
import { ExerciseList } from '../components'
import { useGetAllExercisesQuery } from '../features/exercisesApi'

export const ExercisePage = () => {
  const { isSuccess, data } = useGetAllExercisesQuery([])
  return <Box>{isSuccess && <ExerciseList exercises={data} />}</Box>
}
