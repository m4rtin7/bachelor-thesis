import { Tabs, Tab } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { RootState } from '../../app/store'

export const Menu = () => {
  const location = useLocation()

  const [value, setValue] = useState<string>('/')

  const isLogged = useSelector((state: RootState) => state.logged.logged)

  useEffect(() => {
    setValue(`/${location.pathname.split('/')[1]}`)
  }, [location.pathname])

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
