// quick_example.cpp
#include <emscripten/bind.h>

int add(int a, int b)
{
    return a + b;
}

int subtract(int a, int b)
{
    return a - b;
}

EMSCRIPTEN_BINDINGS(my_module)
{
    emscripten::function("add", &add);
    emscripten::function("subtract", &subtract);
}