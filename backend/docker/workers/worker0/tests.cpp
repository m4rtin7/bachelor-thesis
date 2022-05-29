// Copyright 2005, Google Inc.
// All rights reserved.
#include <iostream>
#include "gtest/gtest.h"
#include "code.cpp"
#include "cmath"

using namespace ::testing;

//Uloha 1.
TEST(TestyPrvejUlohy, countl_0)
{
    ASSERT_EQ(countl_0(0), 8);
    ASSERT_EQ(countl_0(1), 7);
    ASSERT_EQ(countl_0(128), 0);
    ASSERT_EQ(countl_0(20), 3);
    ASSERT_EQ(countl_0(145), 0);


}
TEST(TestyPrvejUlohy, countl_1)
{
    ASSERT_EQ(countl_1(0), 0);
    ASSERT_EQ(countl_1(1), 0);
    ASSERT_EQ(countl_1(128), 1);
    ASSERT_EQ(countl_1(20), 0);
    ASSERT_EQ(countl_1(145), 1);

}
TEST(TestyPrvejUlohy, countr_0)
{
    ASSERT_EQ(countr_0(0), 8);
    ASSERT_EQ(countr_0(1), 0);
    ASSERT_EQ(countr_0(128), 7);
    ASSERT_EQ(countr_0(20), 2);
    ASSERT_EQ(countr_0(145), 0);

}
TEST(TestyPrvejUlohy, countr_1)
{
    ASSERT_EQ(countr_1(0), 0);
    ASSERT_EQ(countr_1(1), 1);
    ASSERT_EQ(countr_1(128), 0);
    ASSERT_EQ(countr_1(20), 0);
    ASSERT_EQ(countr_1(145), 1);

}
TEST(TestyPrvejUlohy, count_1)
{
    ASSERT_EQ(count_1(0), 0);
    ASSERT_EQ(count_1(1), 1);
    ASSERT_EQ(count_1(128), 1);
    ASSERT_EQ(count_1(20), 2);
    ASSERT_EQ(count_1(145), 3);

}

