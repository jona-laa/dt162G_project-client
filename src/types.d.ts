interface About {
  _id: string;
  heading: string;
  bio: Array<string>;
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

// interface ChatFormProps {
//     preventReload: (e: React.FormEvent<HTMLFormElement>) =>  void
//     sendMessage: () => void
// }

// type ResponseMessage = {
//     msg: string
// }
