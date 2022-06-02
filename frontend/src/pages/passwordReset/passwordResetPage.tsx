import { Container, Stack } from '@mui/material'
import { useState } from 'react'
import { Button, Paper, TextInput } from '../../components'
import { useResetPasswordMutation } from '../../features/accountApi'

export const ResetPasswordPage = () => {
  const [email, setEmail] = useState<string>('')
  const [isMailValid, setIsMailValid] = useState<boolean>(true)

  const [resetPassword, { isLoading, isError, error }] =
    useResetPasswordMutation()

  const handleSubmit = async () => {
    resetPassword({ email })
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

  console.log(isError, isLoading, error)

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
          <Button loading={isLoading} onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}
