import { Stack, styled } from '@mui/material'
import { Result } from '../../types'
import { Paragraph } from '../typography'

export const ResultListItem = ({
  result,
  onClick,
}: {
  result: Result
  onClick: () => void
}) => {
  console.log(new Date(result.savedOn).toDateString())

  const StyledStack = styled(Stack)(({ theme }) => ({
    cursor: 'pointer',
    '&:hover': { opacity: 0.8 },
    borderRadius: 0,
    py: 2,
    px: 4,
    background: theme.palette.background.default,
  }))

  return (
    <StyledStack onClick={onClick}>
      <StyledStack>
        <StyledStack direction="row" justifyContent="space-between" spacing={4}>
          <Paragraph noWrap>
            {new Date(result.savedOn).toDateString()}
          </Paragraph>
          <Paragraph
            minWidth="fit-content"
            color={result.passed ? '#4caf50' : 'error'}
          >
            {result.passed ? 'PASSED' : 'FAILED'}
          </Paragraph>
        </StyledStack>
      </StyledStack>
    </StyledStack>
  )
}
