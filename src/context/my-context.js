// MyContext.js or MyContext.tsx
import React, { useState } from 'react';

const MyContext = React.createContext('default value');

const MyContextProvider = ({ children }) => {
  // Define and manage the context's value here
  const [contextValue, setContextValue] = useState('initial value');

  return (
    <MyContext.Provider value={{ contextValue, setContextValue }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };
