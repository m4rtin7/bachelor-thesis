import { Tab, Tabs, Stack, Button } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor'
import { Paper } from './Paper'

type CodePaperProps = {
  code: string
  tests: string | null
}

export const CodePaper = ({ code, tests }: CodePaperProps) => {
  console.log(tests)

  const [card, setCard] = useState<string>('code')
  return (
    <Box sx={{ width: '50%' }}>
      <Box sx={{ background: '#303030' }}>
        <Tabs value={card} onChange={(event, card) => setCard(card)}>
          <Tab value="code" label="Kod" />
          <Tab value="testFile" label="Testy" disabled={tests === null} />
          <Tab
            value="testOutputs"
            label="Vysledky testov"
            disabled={tests === null}
          />
        </Tabs>
      </Box>
      {card === 'testOutputs' ? (
        <Stack spacing={1}>
          <Paper>Vysledok testu 1</Paper>
          <Paper>Vysledok testu 2</Paper>
          <Paper>Vysledok testu 3</Paper>
        </Stack>
      ) : (
        <CodeEditor
          value={card === 'code' ? code : tests || ''}
          language="cpp"
          padding={15}
          disabled={tests === null || card === 'testFile'}
          style={{
            fontSize: 16,
            backgroundColor: '#f5f5f5',
            fontFamily:
              'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          }}
        />
      )}
      <Button variant="contained">Submit</Button>
    </Box>
  )
}
