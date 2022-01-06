cmake_minimum_required(VERSION 3.6.2)
project(cvicenie2)

set(CMAKE_CXX_STANDARD 14)
set(CTEST_TEST_TIMEOUT 30)

find_package(Threads REQUIRED)

set(SOURCE_FILES
        1_characterType.cpp
       
        testyUloha_1.cpp

        GoogleTest/gtest-death-test.cc
        GoogleTest/gtest-filepath.cc
        GoogleTest/gtest-port.cc
        GoogleTest/gtest-printers.cc
        GoogleTest/gtest-test-part.cc
        GoogleTest/gtest-typed-test.cc
        GoogleTest/gtest.cc
        GoogleTest/gtest_main.cc)

include_directories(GoogleTest)
add_executable(cvicenie2 ${SOURCE_FILES})
target_link_libraries(cvicenie2 ${CMAKE_THREAD_LIBS_INIT} pthread)
