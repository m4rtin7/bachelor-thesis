import { Container, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { Button, Paper, TextInput } from '../../components'
import { useUpdateUserMutation } from '../../features/accountApi'

export const AccountPage = () => {
  const user = useSelector((state: RootState) => state.logged.user)

  const [name, setName] = useState<string>(user.name)
  const [surname, setSurname] = useState<string>(user.surname)
  const [newPassword, setNewPassword] = useState<string>('')
  const [confPassword, setConfPassword] = useState<string>('')

  const [isError, setIsError] = useState<boolean>(false)

  const [passwordError, setPasswordError] = useState<string>(
    "Password can't be empty string"
  )

  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const handleSubmit = async () => {
    updateUser({ name, surname, password: newPassword })
  }

  useEffect(() => {
    if (newPassword === '') {
      setPasswordError("Password can't be empty string")
      return
    }
    if (newPassword !== confPassword) {
      setPasswordError("Passwords doesn't match")
      return
    }
    setPasswordError('')
  }, [confPassword, newPassword])

  useEffect(() => {
    setIsError(name === '' || surname === '')
  }, [name, surname])

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
            error={name === ''}
            helperText={name === '' ? "Name can't be empty string" : ''}
          />
          <TextInput
            label="surname"
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            error={surname === ''}
            helperText={surname === '' ? "Surname can't be empty string" : ''}
          />
          <TextInput
            label="new password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextInput
            label="confirmation pasword"
            type="password"
            value={confPassword}
            onChange={(e) => setConfPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />
          <Button
            loading={isLoading}
            onClick={handleSubmit}
            disabled={isError || !!passwordError}
          >
            Change data
          </Button>
        </Stack>
      </Paper>
    </Container>
  )
}
