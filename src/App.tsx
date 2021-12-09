import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const App: React.FC = (): JSX.Element => {
  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
