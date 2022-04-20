import { Typography, styled, TypographyProps } from '@mui/material'

type ParagraphSize = 'small' | 'medium' | 'large'

type ParagraphProps = {
  size?: ParagraphSize
  children: string
} & TypographyProps

const sizeMap: { [key in ParagraphSize]: string } = {
  small: '1.08rem',
  medium: '1.25rem',
  large: '1.5rem',
}

const StyledTypography = styled(Typography)(
  ({ size }: { size: ParagraphSize }) => ({
    fontSize: sizeMap[size],
  })
)
export const Paragraph = ({
  size = 'large',
  children,
  ...props
}: ParagraphProps) => (
  <StyledTypography size={size} {...props}>
    {children}
  </StyledTypography>
)
