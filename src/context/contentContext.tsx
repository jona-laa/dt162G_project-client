import React, { createContext, useState } from 'react';
export const ContentContext = createContext<ContentContextType>(null);

export const ContentProvider = props => {
  const [addItem, setAddItem] = useState(null);

  return (
    <ContentContext.Provider value={{ addItem, setAddItem }}>
      {props.children}
    </ContentContext.Provider>
  )
}