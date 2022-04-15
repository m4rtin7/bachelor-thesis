import { styled, Paper as MuiPaper } from '@mui/material'

export const Paper = styled(MuiPaper)(({ theme }) => ({
  backgroundColor: `${theme.palette.background.paper}30`,
  borderRadius: 0,
}))
