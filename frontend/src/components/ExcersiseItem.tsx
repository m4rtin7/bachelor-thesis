import { Box, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import { Exercise } from '../types'
import { Paper } from './Paper'
import { Heading, Paragraph } from './typography'

export const ExerciseItem = ({
  exercise,
  id,
}: {
  exercise: Exercise
  id: number | undefined
}) => {
  const { title, text, deadline } = exercise
  return (
    <Box
      component={Link}
      to={`/exercises/${id}`}
      sx={{ textDecoration: 'none' }}
    >
      <Paper
        sx={{
          cursor: 'pointer',
          '&:hover': { opacity: 0.8 },
          borderRadius: 0,
          py: 2,
          px: 4,
        }}
      >
        <Stack>
          <Heading>{title}</Heading>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Paragraph noWrap>{text}</Paragraph>
            <Paragraph minWidth="fit-content">
              {deadline
                ? deadline.toTimeString()
                : new Date('August 19, 1975 23:15:30').toDateString()}
            </Paragraph>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}
