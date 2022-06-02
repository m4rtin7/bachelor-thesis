export type Exercise = {
  id?: number
  title: string
  text: string
  versionleft: number
  versionright: number
  leftcode: string
  rightcode: string
  editleft: boolean
  test: string
}

export type Test = {
  id?: number
  code: string
  version: number
  test?: string
  save?: boolean
  left?: boolean
}

export type ExerciseToSave = {
  id: number
  leftcode: string
  rightcode: string
}

export type Result = {
  exerciseId: number
  leftCode: string
  rightCode: string
  rightResult: string
  leftResult: string
  passed: boolean
  savedOn: Date
}
