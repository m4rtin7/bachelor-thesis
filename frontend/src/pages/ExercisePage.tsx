import { Box } from '@mui/material'
import { useState } from 'react'
import { ExerciseList } from '../components'
import { useGetAllExercisesQuery } from '../features/exercisesApi'
import { AdminPage } from './admin/AdminPage'

export const ExercisePage = () => {
  const { isSuccess, data } = useGetAllExercisesQuery([])
  // console.log(exercises)

  const [id, setId] = useState<number | undefined>(undefined)

  return (
    <Box>
      {isSuccess && id === undefined ? (
        <ExerciseList exercises={data} setId={setId} />
      ) : null}
      {id !== undefined && (
        <AdminPage exercise={data[id]} onBack={() => setId(undefined)} />
      )}
    </Box>
  )
}
