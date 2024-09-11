import { useEffect, useState } from "react";

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
