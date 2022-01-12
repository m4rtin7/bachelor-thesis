import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

type MySnackbarProps = {
  passed: boolean
  open: boolean
  setOpen: (b: boolean) => void
}

export default function MySnackbar({ passed, open, setOpen }: MySnackbarProps) {
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        onClose={handleClose}
        severity={passed ? 'success' : 'error'}
        sx={{ width: '100%' }}
      >
        {passed ? 'Všetky testy boli úspešné!' : 'Testy neboli úspešné!'}
      </Alert>
    </Snackbar>
  )
}
