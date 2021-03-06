import { styled, Typography } from '@mui/material'

type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4'

type HeadingProps = {
  size?: HeadingSize
  children: string
}

const sizeMap: { [key in HeadingSize]: string } = {
  h1: '3rem',
  h2: '2.33rem',
  h3: '2rem',
  h4: '1.6rem',
}
const StyledTypography = styled(Typography)(
  ({ size }: { size: HeadingSize }) => ({
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: sizeMap[size],
  })
)
export const Heading = ({ size = 'h3', children }: HeadingProps) => (
  <StyledTypography size={size}>{children}</StyledTypography>
)
