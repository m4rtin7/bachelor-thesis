import {
  Theme,
  Typography,
  styled,
  useTheme,
  TypographyProps,
} from '@mui/material'

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
  ({ theme, size }: { theme: Theme; size: ParagraphSize }) => ({
    color: theme.palette.text.primary,
    fontSize: sizeMap[size],
  })
)
export const Paragraph = ({
  size = 'large',
  children,
  ...props
}: ParagraphProps) => {
  const theme = useTheme()
  return (
    <StyledTypography size={size} theme={theme} {...props}>
      {children}
    </StyledTypography>
  )
}
