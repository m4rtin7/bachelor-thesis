import Editor from '@monaco-editor/react'

type EditorProps = {
  code: string
  setCode?(code: string): void
  theme?: 'vs-dark' | 'vs-light' | 'hc-black'
}

export const Monaco = ({ code, setCode, theme = 'vs-dark' }: EditorProps) => {
  return (
    <Editor
      height="100%"
      width="100%"
      defaultLanguage="cpp"
      theme={theme}
      value={code}
      onChange={(newValue, _) =>
        setCode ? setCode(newValue || '') : undefined
      }
      options={{ minimap: { enabled: false } }}
    />
  )
}
