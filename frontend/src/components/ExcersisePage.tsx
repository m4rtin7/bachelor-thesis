import { Button, Grid, Typography } from '@mui/material'
import CodeEditor from '@uiw/react-textarea-code-editor'
import { useState } from 'react'
import { runTests } from '../helpers/requests'
import MySnackbar from './Snackbar'

type ExcersisePageProps = {
  name: string
  excersiseText: string
  code: string
  editableCode?: string
}

export const ExcersisePage = ({
  name,
  excersiseText,
  code,
  editableCode,
}: ExcersisePageProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [output, setOutput] = useState<string>('')
  const [editedCode, setEditedCode] = useState<string>(editableCode || '')
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [passed, setPassed] = useState<boolean>(false)

  const handleSubmit = async () => {
    setLoading(true)
    console.log(editedCode)

    const resp = await runTests(1, editedCode)
    setPassed(resp.passed)
    setOutput(resp.file)
    setOpenSnackbar(true)
    setLoading(false)
    console.log(output)
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3">{name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography>{excersiseText}</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <CodeEditor
            value={code}
            language="cpp"
            padding={15}
            disabled={true}
            style={{
              fontSize: 16,
              backgroundColor: '#f5f5f5',
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CodeEditor
            value={editedCode}
            language="cpp"
            placeholder="Zadaj svoje riesenie"
            onChange={(evn) => setEditedCode(evn.target.value)}
            padding={15}
            style={{
              fontSize: 16,
              backgroundColor: '#f5f5f5',
              fontFamily:
                'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
            }}
          />
        </Grid>
        <Grid item xl={12}>
          <Button
            variant="contained"
            disabled={loading || editedCode === ''}
            onClick={handleSubmit}
          >
            {loading ? 'Loading...' : 'Submit'}
          </Button>
        </Grid>
      </Grid>
      <MySnackbar
        open={openSnackbar}
        passed={passed}
        setOpen={setOpenSnackbar}
      />
    </>
  )
}
