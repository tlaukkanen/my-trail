import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Home from './Components/Home';

function App() {
  return (
    <>
      <Route exact path='/' component={Home} />
    </>
  );
}

export default App;
