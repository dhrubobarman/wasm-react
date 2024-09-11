import { useState } from "react";
import Module from "./wasm/embinding.js";
import { useWasm } from "./hooks/useWASM.js";
import wasmBinary from "./wasm/embinding.wasm?url";

const App = () => {
  const [values, setValue] = useState<[number, number]>([0, 0]);
  const [result, setResult] = useState<{ add: number; sub: number }>({
    add: 0,
    sub: 0,
  });
  const module = useWasm({ wrapper: Module, binaryLink: wasmBinary });

  const calculate = (_values: [number, number] = values) => {
    const add = module?.add(_values[0], _values[1]) || 0;
    const sub = module?.subtract(_values[0], _values[1]) || 0;
    setResult({ add, sub });
  };

  if (!module) return <div>Loading...</div>;

  return (
    <div
      style={{
        textAlign: "center",
        paddingLeft: 25,
        paddingRight: 25,
        maxWidth: 768,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h2>
        This is a simple example of a webassembly application that adds two
        numbers
      </h2>
      <input
        type="number"
        value={values[0]}
        onChange={(e) =>
          setValue((prev) => {
            const data: [number, number] = [...prev];
            data[0] = Number(e.target.value);
            calculate(data);
            return data;
          })
        }
      />
      <input
        type="number"
        value={values[1]}
        onChange={(e) =>
          setValue((prev) => {
            const data: [number, number] = [...prev];
            data[1] = Number(e.target.value);
            calculate(data);
            return data;
          })
        }
      />
      <br />
      <p>
        Result: {values[0]} + {values[1]} = {result.add}
      </p>
      <p>
        Result: {values[0]} - {values[1]} = {result.sub}
      </p>
    </div>
  );
};

export default App;
