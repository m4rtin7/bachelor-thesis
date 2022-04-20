import { Container, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Paper, TextInput } from '../../components'
import { useLoginMutation } from '../../features/accountApi'
import { setLogged } from '../../features/loggedSlice'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>()

  const [isMailValid, setIsMailValid] = useState<boolean>(true)

  const [login, { data: loginData, isLoading: isLoggingIn, isError, error }] =
    useLoginMutation()

  const handleSubmit = async () => {
    console.log(email, password)
    login({ email, password })
  }

  useEffect(() => {
    if (error) {
      const errorData =
        'data' in error
          ? (error.data as { auth: boolean; message: string })
          : undefined
      setErrorMessage(errorData && errorData.message)

      return
    }
    setErrorMessage(undefined)
    if (!loginData) return
    localStorage.setItem('token', loginData.token)
    dispatch(setLogged(true))
  }, [dispatch, isError, loginData, error])

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
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            error={!isMailValid}
            helperText={!isMailValid ? 'Invalid e-mail address!' : undefined}
          />
          <TextInput
            label="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                handleSubmit()
                ev.preventDefault()
              }
            }}
          />
          <Button loading={isLoggingIn} onClick={handleSubmit}>
            Submit
          </Button>
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
        </Stack>
      </Paper>
    </Container>
  )
}
