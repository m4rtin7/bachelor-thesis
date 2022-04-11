import { Stack, Typography, TextField, Button, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import Split from 'react-split'
import { Monaco } from '../../components'
import { Dropdown } from '../../components/Dropdown'
import { VERSIONS } from '../../consts'
import {
  useAddExerciseMutation,
  useTestMutation,
} from '../../features/exercisesApi'
import { Exercise } from '../../types'

export const AdminPage = ({
  exercise,
  onBack,
}: {
  exercise?: Exercise
  onBack: (v: any) => void
}) => {
  console.log(exercise)

  const [title, setTitle] = useState<string>(exercise?.title || '')
  const [description, setDescription] = useState<string>(exercise?.text || '')

  const [leftCode, setLeftCode] = useState<string>(exercise?.leftcode || '')
  const [leftVersion, setLeftVersion] = useState<number>(
    exercise?.versionleft || 20
  )

  const [rightCode, setRightCode] = useState<string>(exercise?.rightcode || '')
  const [rightVersion, setRightVersion] = useState<number>(
    exercise?.versionright || 20
  )

  const [test, setTest] = useState<string>(exercise?.test || '')
  const [testsVersion, setTestVersion] = useState<number>(20)

  const [resultRight, setResultRight] = useState<string>('')
  const [resultLeft, setResultLeft] = useState<string>('')

  const [addExercise] = useAddExerciseMutation()
  const [testLeftCode, { data: leftRes, isLoading: isLoadingLeft }] =
    useTestMutation()
  const [testRightCode, { data: rightRes, isLoading: isLoadingRight }] =
    useTestMutation()

  useEffect(() => {
    setTestVersion(Math.max(rightVersion, leftVersion))
  }, [rightVersion, leftVersion])

  const handleSubmit = () => {
    const x: Exercise = {
      title,
      text: description,
      leftcode: leftCode,
      versionleft: leftVersion,
      rightcode: rightCode,
      versionright: rightVersion,
      test,
      editleft: true,
      deadline: new Date(),
    }
    addExercise(x)
    console.log(JSON.stringify(x))
  }

  const onTestLeft = async () => {
    testLeftCode({
      code: leftCode,
      id: exercise?.id,
      version: leftVersion,
      test,
    })
  }

  const onTestRight = async () => {
    testRightCode({
      code: rightCode,
      id: exercise?.id,
      version: rightVersion,
      test,
    })
  }

  return (
    <Stack sx={{ width: '100hw', height: '100vh' }}>
      <Stack direction="row">
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          sx={{ flexGrow: 1 }}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
        <Button variant="contained" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="contained"
          disabled={isLoadingLeft || isLoadingRight}
          onClick={() => {
            onTestLeft()
            onTestRight()
          }}
        >
          Test
        </Button>
      </Stack>
      <TextField
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Split
        sizes={[34, 34, 32]}
        expandToMin={false}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        style={{ height: '100%', display: 'flex' }}
      >
        <Split
          sizes={[60, 40]}
          expandToMin={false}
          gutterSize={100}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="vertical"
          cursor="col-resize"
          style={{ height: '100%' }}
        >
          <Box height={'100%'}>
            <Typography>Code</Typography>
            <Stack direction="row">
              <Dropdown
                value={leftVersion}
                items={VERSIONS}
                onChange={setLeftVersion}
              />
              <Button
                variant="contained"
                onClick={onTestLeft}
                disabled={isLoadingLeft}
              >
                Test
              </Button>
            </Stack>
            <Monaco code={leftCode} setCode={setLeftCode} />
          </Box>
          <Monaco code={leftRes} />
        </Split>
        <Split
          sizes={[60, 40]}
          expandToMin={false}
          gutterSize={100}
          gutterAlign="center"
          snapOffset={30}
          dragInterval={1}
          direction="vertical"
          cursor="col-resize"
          style={{ height: '100%' }}
        >
          <Box>
            <Typography>Code</Typography>
            <Stack direction="row">
              <Dropdown
                value={rightVersion}
                items={VERSIONS}
                onChange={setRightVersion}
              />
              <Button
                variant="contained"
                onClick={onTestRight}
                disabled={isLoadingRight}
              >
                Test
              </Button>
            </Stack>
            <Monaco code={rightCode} setCode={setRightCode} />
          </Box>
          <Box height="100%">
            <Monaco code={rightRes} />
          </Box>
        </Split>
        <Box>
          <Typography>Tests</Typography>
          {/* <Dropdown
            value={testsVersion}
            items={VERSIONS}
            onChange={setTestVersion}
          /> */}

          <Monaco code={test} setCode={setTest} />
        </Box>
      </Split>
    </Stack>
  )
}
