import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.jsx'
import MainText from './components/MainText.jsx';
import FormEmail from './components/FormEmail.jsx';
import ButtonToServices from './components/ButtonToServices.jsx';
import Footer from './components/Footer.jsx';
import UserForm from './components/UserForm.jsx';

function App() {
  return (
    <div app="app-container">
      <Router>
        <Routes>

          <Route exact path = "/" element = {
            <>
              <Header />
              <MainText />
              <FormEmail />
              <ButtonToServices name="See our offers!" buttonName = "Offers"/>
              <ButtonToServices name="See our blog!" buttonName = "Blog"/>
              <Footer />
            </>
          } > 
          </Route>

          <Route exact path = "/register" element = {
            <>
              <Header />
              <UserForm formType="register"/>
              <Footer />
            </>
          
          } >
          </Route>

          <Route exact path = "/login" element = {
            <>
              <Header />
              <UserForm formType="login"/>
              <Footer />
            </>
          
          } >
          </Route>

        </Routes>
      </Router>
      
    </div>
    
   
  )
}

export default App
