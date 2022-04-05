import { Paper, Stack } from '@mui/material'
import { Exercise } from '../types'
import { Heading, Paragraph } from './typography'

export const ExerciseItem = ({
  exercise,
  onClick,
}: {
  exercise: Exercise
  onClick: (v: void) => void
}) => {
  const { title, text, deadline } = exercise
  return (
    <Paper
      onClick={() => onClick()}
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
  )
}
