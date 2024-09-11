emcc -lembind ^
  src/wasm/embinding.cpp ^
  -O2 ^
  -s MODULARIZE=1 ^
  -o src/wasm/embinding.js ^
  -sENVIRONMENT="web" ^
  -I ..\eigen\ ^
  -I ..\spatial\src\ ^
  -I ..\boost_1_78_0\ ^
  -std=c++14 ^
  -sNO_DISABLE_EXCEPTION_CATCHING ^
  -Wno-enum-constexpr-conversion ^
  --no-entry --emit-tsd embinding.d.ts