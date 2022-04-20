import { Stack, Typography, TextField, Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Split from 'react-split'
import { Button, Monaco } from '../../components'
import { Dropdown } from '../../components/Dropdown'
import { ResultsModal } from '../../components/ResultsModal'
import { VERSIONS } from '../../consts'
import {
  useAddExerciseMutation,
  useGetAllExercisesQuery,
  useGetSavedExerciseMutation,
  useSaveExerciseMutation,
  useTestMutation,
} from '../../features/exercisesApi'
import { Exercise, ExerciseToSave, Result } from '../../types'

export const AdminPage = () => {
  const id = parseInt(useParams().id || '-1')
  const { data: exercisesData } = useGetAllExercisesQuery([])
  const [exercise, setExercise] = useState<Exercise | undefined>(undefined)

  const [title, setTitle] = useState<string>(exercise?.title || '')
  const [description, setDescription] = useState<string>(exercise?.text || '')

  const [getSavedExercise, { data: savedExerciseData }] =
    useGetSavedExerciseMutation()

  const [leftCode, setLeftCode] = useState<string>(exercise?.leftcode || '')
  const [leftVersion, setLeftVersion] = useState<number>(
    exercise?.versionleft || 20
  )

  const [rightCode, setRightCode] = useState<string>(exercise?.rightcode || '')
  const [rightVersion, setRightVersion] = useState<number>(
    exercise?.versionright || 20
  )

  const [leftRes, setLeftRes] = useState<string>('')
  const [rightRes, setRightRes] = useState<string>('')

  const [test, setTest] = useState<string>(exercise?.test || '')

  const [addExercise] = useAddExerciseMutation()
  const [saveExercise] = useSaveExerciseMutation()
  const [testLeftCode, { data: leftResData, isLoading: isLoadingLeft }] =
    useTestMutation()
  const [testRightCode, { data: rightResData, isLoading: isLoadingRight }] =
    useTestMutation()

  const [isResultModalOpen, setIsResultModalOpen] = useState<boolean>(false)

  useEffect(() => {
    console.log(exercisesData, id)
    const exx = exercisesData?.find((ex: Exercise) => ex.id === id)
    console.log('exx: ', exx)
    setExercise(exx)

    setTitle(exercise?.title || '')
    setDescription(exercise?.text || '')
    setLeftCode(savedExerciseData?.left_code || exercise?.leftcode || '')
    setRightCode(savedExerciseData?.right_code || exercise?.rightcode || '')
    setTest(exercise?.test || '')
  }, [
    exercise?.leftcode,
    exercise?.rightcode,
    exercise?.test,
    exercise?.text,
    exercise?.title,
    exercisesData,
    id,
    savedExerciseData?.left_code,
    savedExerciseData?.right_code,
  ])

  useEffect(() => {
    setLeftRes(leftResData || '')
  }, [leftResData])

  useEffect(() => {
    setRightRes(rightResData || '')
  }, [rightResData])

  useEffect(() => {
    console.log(savedExerciseData)

    if (savedExerciseData) {
      setLeftCode(savedExerciseData.left_code)
      setRightCode(savedExerciseData.right_code)
    }
  }, [savedExerciseData])

  useEffect(() => {
    if (exercise?.id) getSavedExercise(exercise.id)
  }, [exercise?.id, getSavedExercise])

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

  const handleSave = () => {
    if (!exercise?.id) return
    const save: ExerciseToSave = {
      id: exercise?.id,
      leftcode: leftCode,
      rightcode: rightCode,
    }
    saveExercise(save)
  }

  const onTestLeft = async (save?: boolean) => {
    testLeftCode({
      code: leftCode,
      id: exercise?.id,
      version: leftVersion,
      test,
      save,
      left: true,
    })
  }

  const onTestRight = async (save?: boolean) => {
    testRightCode({
      code: rightCode,
      id: exercise?.id,
      version: rightVersion,
      test,
      save,
    })
  }

  const handleLoadResult = (result: Result) => {
    setLeftCode(result.leftCode)
    setRightCode(result.rightCode)
    setLeftRes(result.leftResult)
    setRightRes(result.rightResult)
    setIsResultModalOpen(false)
  }

  return (
    <>
      <Stack sx={{ width: '100hw', height: '100vh' }}>
        <Stack direction="row">
          <TextField
            value={title || exercise?.title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            sx={{ flexGrow: 1 }}
            disabled={true}
          />
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleSave}>Save</Button>
          <Button
            disabled={isLoadingLeft || isLoadingRight}
            onClick={() => {
              onTestLeft(true)
              onTestRight(true)
            }}
          >
            Test
          </Button>
          <Button
            disabled={isLoadingLeft || isLoadingRight}
            onClick={() => setIsResultModalOpen(true)}
          >
            Show results
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
                <Button onClick={() => onTestLeft()} disabled={isLoadingLeft}>
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
                <Button onClick={() => onTestRight()} disabled={isLoadingRight}>
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
      <ResultsModal
        open={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
        exerciseId={exercise?.id || 0}
        handleLoadResult={handleLoadResult}
      />
    </>
  )
}
