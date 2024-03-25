import React from 'react';
import { createRoot } from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/HomePage';
import DescriptionPage from './pages/DescriptionPage';
import TeamPage from './pages/TeamPage';
import TimelinePage from './pages/TimelinePage';
const rootElement = document.getElementById('root')

if (rootElement) {
  const root = createRoot(rootElement)
  root.render(
    <Router>
        <Routes>
          <>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/description' element={<DescriptionPage/>}/>
            <Route path='/team' element={<TeamPage/>}/>
            <Route path='/timeline' element={<TimelinePage/>}/>
          </>
        </Routes>
    </Router>
  )
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
