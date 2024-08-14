import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Adjust the path to where your AuthContext is located
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.jsx'
import MainText from './components/MainText.jsx';
import FormEmail from './components/FormEmail.jsx';
import ButtonToServices from './components/ButtonToServices.jsx';
import Footer from './components/Footer.jsx';
import UserForm from './components/UserForm.jsx';
import Container from 'react-bootstrap/esm/Container.js';
import Row from 'react-bootstrap/esm/Row.js';
import OffersInput from './components/OffersInput.jsx';
import OffersContainer from './components/OffersContainer.jsx';
import BlogShowcase from './components/BlogShowcase.jsx';
import CreateBlogPost from './components/CreateBlogPost.jsx';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import Posts from './components/Posts.jsx';
import EditPosts from './components/EditPosts.jsx';

function App() {
  return (
    <AuthProvider>

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

          <Route exact path = "/offers" element = {
            <>
              <Header />
              <Container className="d-flex justify-content-around align-items-center mt-3 mb-3">
                <Row className="h2 text-light">
                  Flights
                </Row>
              </Container>
              <OffersContainer />
              <Footer />
            </>
          
          } >
          </Route>

          <Route exact path = "/blog" element = {
            <>
              <Header />
              <BlogShowcase />
              <Footer />
            </>
          
          } >
          </Route>

          <Route exact path = "/blog/create-post" element = {
            <>
              <Header />
              <CreateBlogPost />
              <Footer />
            </>
          
          } >
          </Route>

          <Route exact path = "/blog/post/:postId" element = {
            <>
              <Header />
              <Posts />
              <Footer />
            </>
          
          } >
          </Route>

          <Route exact path = "/blog/edit-post/:postId" element = {
            <>
              <Header />
              <EditPosts />
              <Footer />
            </>
          
          } >
          </Route>

          

        </Routes>
      </Router>
      
    </AuthProvider>
    
  )
}

export default App
