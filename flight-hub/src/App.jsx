import { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.jsx'
import MainText from './components/MainText.jsx';
import FormEmail from './components/FormEmail.jsx';
import ButtonToServices from './components/ButtonToServices.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <div>
      <Header />
      <MainText />
      <FormEmail />
      <ButtonToServices name="See our offers!" buttonName = "Offers"/>
      <ButtonToServices name="See our blog!" buttonName = "Blog"/>
      <Footer />
    </div>
    
   
  )
}

export default App
