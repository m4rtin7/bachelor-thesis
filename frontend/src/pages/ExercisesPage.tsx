import { Box } from '@mui/material'
import { ExerciseList } from '../components'
import { useGetAllExercisesQuery } from '../features/exercisesApi'

export const ExercisesPage = () => {
  const { isSuccess, data } = useGetAllExercisesQuery([], {
    pollingInterval: 30000,
  })
  return <Box>{isSuccess && <ExerciseList exercises={data} />}</Box>
}
