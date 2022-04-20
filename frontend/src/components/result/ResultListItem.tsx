import { Box, Stack } from '@mui/material'
import { Result } from '../../types'
import { Paper } from '../Paper'
import { Paragraph } from '../typography'

export const ResultListItem = ({
  result,
  onClick,
}: {
  result: Result
  onClick: () => void
}) => {
  console.log(new Date(result.savedOn).toDateString())

  return (
    <Box onClick={onClick}>
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
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Paragraph noWrap>
              {new Date(result.savedOn).toDateString()}
            </Paragraph>
            <Paragraph
              minWidth="fit-content"
              color={result.passed ? '#4caf50' : 'error'}
            >
              {result.passed ? 'PASSED' : 'FAILED'}
            </Paragraph>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}
