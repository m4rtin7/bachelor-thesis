import { Container, Stack } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Paper, TextInput } from '../../components'
import { setLogged } from '../../features/loggedSlice'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const [mail, setMail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [isMailValid, setIsMailValid] = useState<boolean>(true)

  const handleSubmit = () => {
    console.log(mail, password)
    dispatch(setLogged(true))
  }

  const handleEmailChange = (mail: string) => {
    setMail(mail)
    if (mail === '') {
      setIsMailValid(true)
      return
    }
    setIsMailValid(
      /^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/.test(
        mail
      )
    )
  }

  return (
    <Container maxWidth="sm">
      <Paper>
        <Stack
          spacing={4}
          sx={{
            px: 4,
            py: 4,
          }}
        >
          <TextInput
            label="mail"
            type="email"
            value={mail}
            onChange={(e) => handleEmailChange(e.target.value)}
            error={!isMailValid}
            helperText={!isMailValid ? 'Invalid e-mail address!' : undefined}
          />
          <TextInput
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </Stack>
      </Paper>
    </Container>
  )
}
