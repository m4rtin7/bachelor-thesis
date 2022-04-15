import {
  Theme,
  Typography,
  styled,
  useTheme,
  TypographyProps,
} from '@mui/material'

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
  ({ theme, size }: { theme: Theme; size: LabelSize }) => ({
    // color: theme.palette.text.primary,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: sizeMap[size],
  })
)
export const Label = ({ size = 'large', children, ...props }: LabelProps) => {
  const theme = useTheme()
  return (
    <StyledTypography size={size} theme={theme} {...props}>
      {children}
    </StyledTypography>
  )
}
