import { Container, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { Button, Paper, TextInput } from '../../components'
import { Label } from '../../components/typography'
import { useRegistrationMutation } from '../../features/accountApi'

export const RegistrationPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmationPassword, setConfirmationPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')
  const [arePasswordsValid, setArePasswordsValid] = useState<boolean>(true)

  const [isMailValid, setIsMailValid] = useState<boolean>(true)

  const [registration, { data: regData, isLoading, isError, error }] =
    useRegistrationMutation()

  const handleSubmit = async () => {
    registration({ name, surname, email, password })
  }

  const handleEmailChange = (email: string) => {
    setEmail(email)
    if (email === '') {
      setIsMailValid(true)
      return
    }
    setIsMailValid(
      /^[a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-z0-9]@[a-z0-9][-\.]{0,1}([a-z][-\.]{0,1})*[a-z0-9]\.[a-z0-9]{1,}([\.\-]{0,1}[a-z]){0,}[a-z0-9]{0,}$/.test(
        email
      )
    )
  }

  useEffect(() => {
    setArePasswordsValid(password === confirmationPassword)
  }, [password, confirmationPassword])

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
            label="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="surename"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <TextInput
            label="mail"
            type="email"
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            error={!isMailValid}
            helperText={!isMailValid ? 'Invalid e-mail address!' : ''}
          />
          <TextInput
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!arePasswordsValid}
            helperText={arePasswordsValid ? '' : "Passwords doesn't match!"}
          />
          <TextInput
            label="confirmation Password"
            type="password"
            value={confirmationPassword}
            onChange={(e) => setConfirmationPassword(e.target.value)}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                handleSubmit()
                ev.preventDefault()
              }
            }}
          />
          <Button
            onClick={handleSubmit}
            disabled={!arePasswordsValid || !isMailValid || email === ''}
            loading={isLoading}
          >
            Submit
          </Button>
          {error && <Label color="error">{regData?.error}</Label>}
        </Stack>
      </Paper>
    </Container>
  )
}
