import { FormControl, Select, MenuItem } from '@mui/material'

type DropdownProps = {
  value: any
  onChange: (value: any) => void
  label?: string
  items: {
    value: any
    label?: string
  }[]
}

export const Dropdown = ({ value, onChange, items, label }: DropdownProps) => {
  return (
    <FormControl fullWidth>
      <Select
        sx={{ background: '#000' }}
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
