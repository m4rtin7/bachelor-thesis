import { Container, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Paper, TextInput } from '../../components'
import { Link } from '../../components/Link'
import { useLoginMutation } from '../../features/accountApi'
import { setLogged, setIsAdmin, setUser } from '../../features/loggedSlice'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>()

  const [isMailValid, setIsMailValid] = useState<boolean>(true)

  const [login, { data: loginData, isLoading: isLoggingIn, isError, error }] =
    useLoginMutation()

  const handleSubmit = async () => {
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
    dispatch(setIsAdmin(loginData.isAdmin))
    dispatch(setUser({ name: loginData?.name, surname: loginData?.surname }))
  }, [dispatch, isError, loginData, error])

  const handleEmailChange = (email: string) => {
    setEmail(email)
    if (email === '') {
      setIsMailValid(true)
      return
    }
    setIsMailValid(
      // eslint-disable-next-line no-useless-escape
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
            helperText={!isMailValid ? 'Invalid e-mail address!' : ''}
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
          <Stack direction="row" justifyContent="space-between">
            <Link href="/registration">No account yet? Sign up here!</Link>
            <Link href="/resetPassword">Reset password</Link>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  )
}
