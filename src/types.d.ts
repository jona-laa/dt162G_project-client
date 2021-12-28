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
  itemId: string;
  itemType: ItemType;
}

/* 
  CONTEXT TYPES 
*/
interface AuthContextType {
  authorized: boolean;
  setAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
  loginFormVisible: boolean;
  setLoginFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
