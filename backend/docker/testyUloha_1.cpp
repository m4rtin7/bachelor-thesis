// Copyright 2005, Google Inc.
// All rights reserved.

#include <iostream>
#include "gtest/gtest.h"
#include "solution2.h"

using namespace ::testing;

//Uloha 1.
TEST(TestyPrvejUlohy, 1jeNeparne)
{
	ASSERT_EQ(jeParne(1), false);
}
TEST(TestyPrvejUlohy, 2jePeparne)
{
	ASSERT_EQ(jeParne(2), true);
}