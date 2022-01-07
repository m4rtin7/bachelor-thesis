// Copyright 2005, Google Inc.
// All rights reserved.
#include <iostream>
#include "gtest/gtest.h"
#include "header.h"

using namespace ::testing;

//Uloha 1.
TEST(TestyPrvejUlohy, Jedna)
{
    ASSERT_EQ(jeParny(1), false);
}
TEST(TestyPrvejUlohy, Dva)
{
    ASSERT_EQ(jeParny(2), true);
}