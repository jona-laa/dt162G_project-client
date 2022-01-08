import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Resume from './components/Resume/Resume';
import Portfolio from './components/Portfolio/Portfolio';
import Contact from './components/Contact/Contact';
import { AuthProvider } from './context/authContext';
import LoginForm from './components/LoginForm/LoginForm';
import { ContentProvider } from './context/contentContext';
import { FeedbackProvider } from './context/feedbackContext';
import ContentForm from './components/ContentForm/ContentForm';
import FeedbackMessage from './components/FeedbackMessage/FeedbackMessage';

const App: React.FC = (): JSX.Element => {
  return (
    <AuthProvider>
      <FeedbackProvider>
        <ContentProvider>
          <Header />
          <main>
            <About />
            <Skills />
            <Resume />
            <Portfolio />
            <Contact />
            <ContentForm />
            <FeedbackMessage />
          </main>
          <LoginForm />
          <Footer />
        </ContentProvider>
      </FeedbackProvider>
    </AuthProvider>
  );
}

export default App;
