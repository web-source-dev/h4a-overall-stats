import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import NewHome from './components/NewHome';
import TabsHome from './components/Tabs';
const App = () => {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<TabsHome />} />
          <Route path='/new' element={<NewHome />} />
        </Routes>
    </Router>
  );
};

export default App;