import { Stack, Switch } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setLogged } from '../../features/loggedSlice'
import { Button } from '../Button'
import { Label } from '../typography'
import { Menu } from './Menu'

export const Header = ({
  handleModeColor,
}: {
  handleModeColor: () => void
}) => {
  const dispatch = useDispatch()

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row">
        <Label size="small">Light</Label>
        <Switch onClick={handleModeColor} defaultChecked />
        <Label size="small">Dark</Label>
      </Stack>
      <Menu />
      <Button onClick={() => dispatch(setLogged(false))}>Log out</Button>
    </Stack>
  )
}
