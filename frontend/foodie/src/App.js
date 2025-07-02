import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screen/home';
import Logincard from './components/logincard';
import Signupcard from './components/signupcard';

function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Logincard/>}/>
          <Route exact path='/signup' element={<Signupcard/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
