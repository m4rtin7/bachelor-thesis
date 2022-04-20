import { Typography, styled, TypographyProps } from '@mui/material'

type LabelSize = 'small' | 'medium' | 'large'

type LabelProps = {
  size?: LabelSize
  children: string
} & TypographyProps

const sizeMap: { [key in LabelSize]: string } = {
  small: '1.08rem',
  medium: '1.17rem',
  large: '1.33rem',
}

const StyledTypography = styled(Typography)(
  ({ size }: { size: LabelSize }) => ({
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: sizeMap[size],
  })
)
export const Label = ({ size = 'large', children, ...props }: LabelProps) => (
  <StyledTypography size={size} {...props}>
    {children}
  </StyledTypography>
)
