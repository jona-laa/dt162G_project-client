/*
  FETCH DATA TYPES
*/
interface About {
  _id: string;
  heading: string;
  bio: string;
  img_src: string;
}

interface Skill {
  _id: string;
  name: string;
  icon: string;
}

interface Work {
  _id: string;
  company: string;
  title: string;
  date_start: string;
  date_end: string;
  descr: string;
}

interface Course {
  _id: string;
  institution: string;
  title: string;
  date_start: string;
  date_end: string;
  descr: string;
}

interface Project {
  _id: string;
  title: string;
  prj_url: string;
  img_src: string;
  descr: string;
}

type ItemType = 'about' | 'skill' | 'work' | 'studies' | 'project';

interface EditItemControlsProps {
  item: About | Skill | Work | Course | Project;
  itemType: ItemType;
  color: 'black' | 'white';
}

interface AddItemButtonProps {
  itemType: ItemType;
  color: 'black' | 'white';
}

/* 
  CONTEXT TYPES 
*/
interface AuthContextType {
  authorized: boolean;
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
  authToken: string | null;
  setAuthToken: React.Dispatch<React.SetStateAction<string | null>>;
  loginFormVisible: boolean;
  setLoginFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ContentContextType {
  addItemType: string | null;
  setAddItemType: React.Dispatch<React.SetStateAction<string | null>>;
  updateItemType: string | null;
  setUpdateItemType: React.Dispatch<React.SetStateAction<string | null>>;
  updateItem: any;
  setUpdateItem: React.Dispatch<
    React.SetStateAction<About | Skill | Work | Course | Project | null>
  >;
  about: Array<About>;
  setAbout: React.Dispatch<React.SetStateAction<Array<About>>>;
  skills: Array<Skills>;
  setSkills: React.Dispatch<React.SetStateAction<Array<Skill>>>;
  work: Array<Work>;
  setWork: React.Dispatch<React.SetStateAction<Array<Work>>>;
  studies: Array<Course>;
  setStudies: React.Dispatch<React.SetStateAction<Array<Course>>>;
  projects: Array<Project>;
  setProjects: React.Dispatch<React.SetStateAction<Array<Project>>>;
}

interface InputSetState {
  headingInput: string;
  setHeadingInput: React.Dispatch<React.SetStateAction<boolean>>;
}
