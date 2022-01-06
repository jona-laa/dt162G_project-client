import React, { createContext, useState } from 'react';
export const ContentContext = createContext<ContentContextType>(null);

export const ContentProvider = props => {
  // Content categories
  const [about, setAbout] = useState<Array<About>>([])
  const [skills, setSkills] = useState<Array<Skill>>([])
  const [work, setWork] = useState<Array<Work>>([])
  const [studies, setStudies] = useState<Array<Course>>([])
  const [projects, setProjects] = useState<Array<Project>>([])


  // Used to determine functionality of forms
  const [addItemType, setAddItemType] = useState(null);
  const [updateItemType, setUpdateItemType] = useState(null);
  const [updateItem, setUpdateItem] = useState(null)

  return (
    <ContentContext.Provider
      value={{
        addItemType,
        setAddItemType,
        updateItemType,
        setUpdateItemType,
        updateItem,
        setUpdateItem,
        about,
        setAbout,
        skills,
        setSkills,
        work,
        setWork,
        studies,
        setStudies,
        projects,
        setProjects
      }}
    >
      {props.children}
    </ContentContext.Provider>
  )
}