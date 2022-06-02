import { Tabs, Tab } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { RootState } from '../../app/store'

export const Menu = () => {
  const [value, setValue] = useState<string>(
    `/${window.location.pathname.split('/')?.[1] || ''}`
  )

  const isLogged = useSelector((state: RootState) => state.logged.logged)

  return (
    <Tabs value={value} onChange={(e, v) => setValue(v)}>
      <Tab value="/" label="Home" component={Link} to="/" />
      <Tab
        value="/exercises"
        label="Úlohy"
        component={Link}
        to="/exercises"
        disabled={!isLogged}
      />
      <Tab
        value="/account"
        label="Správa účtu"
        component={Link}
        to={'/account'}
        disabled={!isLogged}
      />
    </Tabs>
  )
}
