import { styled, Link as MuiLink } from '@mui/material'

export const Link = styled(MuiLink)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  textDecoration: 'underline',
  '&:hover': {
    cursor: 'pointer',
    color: theme.palette.primary.light,
  },
}))
