import React, { createContext, useState } from 'react';
export const ContentContext = createContext<ContentContextType>(null);

export const ContentProvider = props => {
  const [addItem, setAddItem] = useState(null);
  const [updateItem, setUpdateItem] = useState(null);

  return (
    <ContentContext.Provider value={{ addItem, setAddItem, updateItem, setUpdateItem }}>
      {props.children}
    </ContentContext.Provider>
  )
}