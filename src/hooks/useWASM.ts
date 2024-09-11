import { useEffect, useState } from "react";

export interface BaseWASMModule {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  _malloc: Function;
  HEAPU8: Uint8Array;
}

const useWASM = <T>(
  helperOutput: (
    Module?: unknown,
    ...args: unknown[]
  ) => Promise<BaseWASMModule & T>
) => {
  const [methods, setMethods] = useState<(BaseWASMModule & T) | null>(null);

  helperOutput().then((m) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !methods && setMethods(m);
  });

  return methods;
};

export const useWasm = <T>({
  wrapper,
  binaryLink,
}: {
  wrapper: (options: { locateFile: () => string }) => Promise<T>;
  binaryLink: string;
}) => {
  const [methods, setMethods] = useState<T | null>(null);

  useEffect(() => {
    const loadWasm = async () => {
      const wasmModuleInstance = await wrapper({
        locateFile: () => binaryLink,
      });
      setMethods(wasmModuleInstance);
    };

    loadWasm();
  }, [wrapper, binaryLink]);

  return methods;
};

export default useWASM;
