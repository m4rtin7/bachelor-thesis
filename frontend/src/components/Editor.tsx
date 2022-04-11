import Editor from '@monaco-editor/react'
import { useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

type EditorProps = {
  code: string
  setCode?(code: string): void
}

export const Monaco = ({ code, setCode }: EditorProps) => {
  const mode = useSelector((state: RootState) => state.design.mode)

  console.log(mode)

  return (
    <Editor
      height="100%"
      width="100%"
      defaultLanguage="cpp"
      theme={`vs-${mode}`}
      value={code}
      onChange={(newValue, _) =>
        setCode ? setCode(newValue || '') : undefined
      }
      options={{ minimap: { enabled: false } }}
    />
  )
}
