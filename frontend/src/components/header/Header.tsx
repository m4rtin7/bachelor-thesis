import { Stack, Switch } from '@mui/material'
import { useDispatch } from 'react-redux'
import { setLogged } from '../../features/loggedSlice'
import { Button } from '../Button'
import { Label } from '../typography'
import { Menu } from './Menu'
import { useNavigate } from 'react-router-dom'

export const Header = ({
  handleModeColor,
}: {
  handleModeColor: () => void
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row">
        <Label size="small">Light</Label>
        <Switch onClick={handleModeColor} defaultChecked />
        <Label size="small">Dark</Label>
      </Stack>
      <Menu />
      <Button
        onClick={() => {
          dispatch(setLogged(false))
          navigate('/')
        }}
      >
        Log out
      </Button>
    </Stack>
  )
}
