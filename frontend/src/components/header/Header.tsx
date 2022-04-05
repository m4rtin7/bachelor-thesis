import { Box, Button, Stack } from '@mui/material'
import { Menu } from './Menu'

export const Header = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Box />
      <Menu />
      <Button> Log out </Button>
    </Stack>
  )
}
