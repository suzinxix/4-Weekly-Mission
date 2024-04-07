//import { useEffect, useState } from "react";

// const useLocalStorage = (key: string, defaultState: string | null) => {
//   const [value, setValue] = useState(localStorage.getItem(key) || defaultState);

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(value));
//   }, [value]);

//   return [value, setValue];
// };

const useLocalStorage = (key: string, defaultState: string) => {
  localStorage.setItem(key, JSON.stringify(defaultState));
};

export default useLocalStorage;
