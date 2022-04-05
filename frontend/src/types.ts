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
  deadline: Date
}

export type Test = {
  id?: number
  code: string
  version: number
  test?: string
}
