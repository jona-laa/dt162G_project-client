import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Resume from './components/Resume/Resume';
import Portfolio from './components/Portfolio/Portfolio';
import Contact from './components/Contact/Contact';

const App: React.FC = (): JSX.Element => {
  return (
    <>
      <Header />
      <main>
        <About />
        <Skills />
        <Resume />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
