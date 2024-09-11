// quick_example.cpp
#include <emscripten/bind.h>

float add(float a, float b)
{
    return a + b;
}

float subtract(float a, float b)
{
    return a - b;
}

EMSCRIPTEN_BINDINGS(my_module)
{
    emscripten::function("add", &add);
    emscripten::function("subtract", &subtract);
}