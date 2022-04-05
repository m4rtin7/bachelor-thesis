import { Tabs, Tab } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export const Menu = () => {
  const [value, setValue] = useState<string>(
    `/${window.location.pathname.split('/')?.[1] || ''}`
  )
  return (
    <Tabs value={value} onChange={(e, v) => setValue(v)}>
      <Tab value="/" label="Home" component={Link} to="/" />
      <Tab value="/exercises" label="Úlohy" component={Link} to="/exercises" />
      <Tab
        value="/account"
        label="Správa účtu"
        component={Link}
        to={'/account'}
      />
    </Tabs>
  )
}
