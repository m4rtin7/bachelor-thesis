// Copyright 2005, Google Inc.
// All rights reserved.
#include <iostream>
#include "gtest/gtest.h"
#include "code.cpp"
#include "cmath"
#include "tuple"

using namespace ::testing;

//Uloha 1.
TEST(TestyPrvejUlohy, 1)
{
    ASSERT_EQ(foo(1,0), std::make_tuple(1,0,0,0));
}
TEST(TestyPrvejUlohy, 2)
{
    ASSERT_EQ(foo(0,1), std::make_tuple(0,1,0,0));
}
TEST(TestyPrvejUlohy, 3)
{
    ASSERT_EQ(foo(0,0), std::make_tuple(0,0,1,0));
}
TEST(TestyPrvejUlohy, 4)
{
    ASSERT_EQ(foo(sqrt(-1), 1), std::make_tuple(0,0,0,1));
}
TEST(TestyPrvejUlohy, 5)
{
    ASSERT_EQ(foo(1, sqrt(-1)), std::make_tuple(0,0,0,1));
}
TEST(TestyPrvejUlohy, 6)
{
    ASSERT_EQ(foo(sqrt(-1), sqrt(-1)), std::make_tuple(0,0,0,1));
}
