import { FormControl, Select, MenuItem } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

type DropdownProps = {
  value: any
  onChange: (value: any) => void
  label?: string
  disabled?: boolean
  items: {
    value: any
    label?: string
  }[]
}

export const Dropdown = ({
  value,
  onChange,
  items,
  label,
  disabled = false,
}: DropdownProps) => {
  const mode = useSelector((state: RootState) => state.design.mode)
  return (
    <FormControl fullWidth>
      <Select
        MenuProps={{
          sx: {
            '.MuiPopover-paper': {
              backgroundColor: mode === 'dark' ? 'black' : 'white',
            },
          },
        }}
        disabled={disabled}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value)}
      >
        {items.map(({ value, label }, index) => (
          <MenuItem key={index} value={value}>
            {label || value.toString()}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
