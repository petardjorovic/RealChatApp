import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export const useLocalStorageState = (
  initialState: boolean,
  key: string
): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [value, setValue] = useState<boolean>(function () {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [key, value]
  );

  return [value, setValue];
};
