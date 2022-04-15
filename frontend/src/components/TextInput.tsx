import { Stack, styled, TextField, TextFieldProps } from '@mui/material'
import { Label } from './typography'

const StyledField = styled(TextField)(({ theme }) => ({}))

type TextInputProps = {
  label?: string
} & TextFieldProps

export const TextInput = ({ label, ...props }: TextInputProps) => {
  if (label) {
    return (
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="stretch"
      >
        <Label sx={{ verticalAlign: 'middle', display: 'table-cell' }}>
          {label}
        </Label>
        <StyledField {...props}></StyledField>
      </Stack>
    )
  }
  return <StyledField {...props}></StyledField>
}
