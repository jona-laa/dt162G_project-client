import React, { createContext, useState } from 'react';
export const ContentContext = createContext<ContentContextType>(null);

export const ContentProvider = props => {
  const [addItemType, setAddItemType] = useState(null);
  const [updateItemType, setUpdateItemType] = useState(null);
  const [updateItem, setUpdateItem] = useState(null)

  return (
    <ContentContext.Provider value={{ addItemType, setAddItemType, updateItemType, setUpdateItemType, updateItem, setUpdateItem }}>
      {props.children}
    </ContentContext.Provider>
  )
}