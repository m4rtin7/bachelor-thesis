import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  styled,
} from '@mui/material'

const StyleButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: 0,
  backgroundColor: 'transparent',
  border: `solid 1px ${theme.palette.primary.main}`,
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}))

type ButtonProps = { children: string } & MuiButtonProps

export const Button = ({
  children,
  variant = 'contained',
  ...props
}: ButtonProps) => {
  return <StyleButton {...props}>{children}</StyleButton>
}
