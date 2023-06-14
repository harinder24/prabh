import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css'
import Background from './Background'
import Countries from './Countries'
import Country from './Country'

function App() {


  return (
    <>
  <Background/>
  <BrowserRouter>
  <Routes>
   
        <Route path="/" element={<Countries/>} />
        <Route path="/*" element={<Country/>} />
        
    </Routes>
    </BrowserRouter>
  
    </>
  )
}

export default App
