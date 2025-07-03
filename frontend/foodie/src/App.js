import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './screen/home';
import Logincard from './components/logincard';
import Signupcard from './components/signupcard';
import Foodlist from './screen/foodlist';
import Ownerhome from './screen/ownerhome';

function App() {
  return (
    <>
    <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/login' element={<Logincard/>}/>
          <Route exact path='/signup' element={<Signupcard/>}/>
          <Route exact path='/foodlist/:ownerId' element={<Foodlist/>}/>
          <Route exact path='/ownerhome' element={<Ownerhome/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
