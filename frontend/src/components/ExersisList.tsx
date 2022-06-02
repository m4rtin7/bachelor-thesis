import { Stack } from '@mui/material'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Exercise } from '../types'
import { ExerciseItem } from './ExcersiseItem'

type ExerciseListProps = {
  exercises: Exercise[]
}

export const exerciseTemplate: Exercise = {
  title: 'Add new Exercise',
  text: 'Click here if you want to add new exercise',
  versionleft: 20,
  versionright: 20,
  leftcode: '',
  rightcode: '',
  editleft: true,
  test: `// Copyright 2005, Google Inc.
// All rights reserved.
#include <iostream>
#include "gtest/gtest.h"
#include "header.h"

using namespace ::testing;

//Don't change code above
//Add tests here

//example:
TEST(TestyPrvejUlohy, Jedna)
{
    ASSERT_EQ(foo(2), 3);
}`,
}

export const ExerciseList = ({ exercises }: ExerciseListProps) => {
  const isAdmin = useSelector((state: RootState) => state.logged.isAdmin)
  return (
    <Stack spacing={2}>
      {isAdmin && <ExerciseItem key={-1} exercise={exerciseTemplate} id={-1} />}
      {exercises.map((exercise, index) => {
        return <ExerciseItem key={index} exercise={exercise} id={exercise.id} />
      })}
    </Stack>
  )
}
