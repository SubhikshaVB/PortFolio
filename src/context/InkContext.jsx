import { createContext, useState } from "react";

const InkContext = createContext();

export function InkProvider({ children }) {

  const [chapter, setChapter] = useState(0);

  const nextChapter = () => {
    setChapter((prev) => prev + 1);
  };

  return (
    <InkContext.Provider
      value={{
        chapter,
        nextChapter
      }}
    >
      {children}
    </InkContext.Provider>
  );
}

