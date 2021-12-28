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
import { Login } from './components/Login/Login';

const App: React.FC = (): JSX.Element => {
  return (
    <AuthProvider>

      <Header />
      <main>
        <About />
        <Skills />
        <Resume />
        <Portfolio />
        <Contact />
      </main>
      <Login />
      <Footer />
    </AuthProvider>
  );
}

export default App;
