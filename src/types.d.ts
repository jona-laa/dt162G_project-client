// type RootState = {
//   login: boolean
// }

interface About {
  heading: string;
  bio: string;
  img_src: string;
  hej: string;
}

interface Skill {
  _id: string;
  name: string;
  icon: string;
}

interface Work {
  company: string;
  title: string;
  date_start: Date;
  date_end: Date;
  descr: string;
}

interface Studies {
  institution: string;
  title: string;
  date_start: Date;
  date_end: Date;
  descr: string;
}

// interface ChatMessage {
//     message: string,
//     name: string
// }

// interface ChatFormProps {
//     preventReload: (e: React.FormEvent<HTMLFormElement>) =>  void
//     sendMessage: () => void
// }

// interface UpdateLoginParams {
//     resStatus: number
//     resMsg: ResponseMessage
// }

// type ResponseMessage = {
//     msg: string
// }

// // Redux
// const SET_LOGIN = 'SET_LOGIN'

// interface LoginAction {
//     type: typeof SET_LOGIN
//     login: string | null
// }
