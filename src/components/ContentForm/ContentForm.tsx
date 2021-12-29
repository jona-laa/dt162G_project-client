import React, { useContext } from 'react'
import { ContentContext } from '../../context/contentContext';
import AboutForm from './AboutForm/AboutForm';
import ProjectsForm from './ProjectsForm/ProjectsForm';
import SkillsForm from './SkillsForm/SkillsForm';
import StudiesForm from './StudiesForm/StudiesForm';
import WorkForm from './WorkForm/WorkForm';

const ContentForm: React.FC = (): JSX.Element => {
  const { addItem } = useContext(ContentContext);

  const renderForm = () => {
    switch (addItem) {
      case 'about':
        return <AboutForm />

      case 'skill':
        return <SkillsForm />

      case 'work':
        return <WorkForm />

      case 'studies':
        return <StudiesForm />

      case 'project':
        return <ProjectsForm />

      default:

        break;
    }
  }

  return addItem && (
    renderForm()
  )
}

export default ContentForm;