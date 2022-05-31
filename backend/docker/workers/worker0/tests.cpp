// Copyright 2005, Google Inc.
// All rights reserved.

#include <iostream>
#include "gtest/gtest.h"

#include "code.cpp"

using namespace std;
using namespace ::testing;

// Uloha 1.
TEST(TestPrvejUlohy, styri)
{
  ASSERT_EQ(10, sum(1, 2, 3, 4));
}

TEST(TestPrvejUlohy, jedno)
{
  ASSERT_EQ(1, sum(1));
}

TEST(TestPrvejUlohy, zaporne)
{
  ASSERT_EQ(-4, sum(1, -5));
}