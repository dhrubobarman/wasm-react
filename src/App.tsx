import { useState } from "react";
import Module from "./wasm/embinding.js";
import { useWasm } from "./hooks/useWASM.js";
import wasmBinary from "./wasm/embinding.wasm?url";

const App = () => {
  const [values, setValue] = useState<[number, number]>([0, 0]);
  const [result, setResult] = useState<number>(0);
  const module = useWasm({ wrapper: Module, binaryLink: wasmBinary });

  const handleClick = () => {
    const result = module?.add(values[0], values[1]);
    setResult(result || 0);
  };

  if (!module) return <div>Loading...</div>;

  return (
    <div>
      <input
        type="number"
        value={values[0]}
        onChange={(e) =>
          setValue((prev) => {
            const data: [number, number] = [...prev];
            data[0] = Number(e.target.value);
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
            return data;
          })
        }
      />
      <br />
      <p>
        Result: {values[0]} + {values[1]} = {result}
      </p>
      <button onClick={handleClick}>Calculate</button>
      <p>
        This is a simple example of a webassembly application that adds two
        numbers
      </p>
    </div>
  );
};

export default App;
