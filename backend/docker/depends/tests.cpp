// Copyright 2005, Google Inc.
// All rights reserved.
#include <iostream>
#include "gtest/gtest.h"

using namespace ::testing;

// Uloha 1.
TEST(TestyPrvejUlohy, Jedna)
{
    ASSERT_EQ(startsWith("a", 'b'), false);
}
TEST(TestyPrvejUlohy, Dva)
{
    ASSERT_EQ(startsWith("a", 'a'), true);
}
TEST(TestyPrvejUlohy, Dlhy)
{
    ASSERT_EQ(startsWith("abbbbb", 'a'), true);
}
TEST(TestyPrvejUlohy, Prazdny)
{
    ASSERT_EQ(startsWith("", 'a'), false);
}
TEST(TestyPrvejUlohy, JednaNekonci)
{
    ASSERT_EQ(endsWith("a", 'b'), false);
}
TEST(TestyPrvejUlohy, DvaKonci)
{
    ASSERT_EQ(endsWith("a", 'a'), true);
}
TEST(TestyPrvejUlohy, DlhyKonci)
{
    ASSERT_EQ(endsWith("bbbbbbba", 'a'), true);
}
TEST(TestyPrvejUlohy, PrazdnyNekonci)
{
    ASSERT_EQ(endsWith("", 'a'), false);
}