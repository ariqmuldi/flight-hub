import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.jsx'
import MainText from './components/MainText.jsx';
import FormEmail from './components/FormEmail.jsx';

function App() {
  return (
    <div>
      <Header />
      <MainText />
      <FormEmail />

    </div>
    
   
  )
}

export default App
