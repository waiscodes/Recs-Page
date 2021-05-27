import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import MyNavbar from "./components/Navbar";
import EditProfile from "./pages/EditProfile";
import Welcome from "./pages/Welcome";
import NotFound404 from "./pages/NotFound404";

function App() {
  return (
    <>
      <Router>
        <AuthProvider className='App'>
          <MyNavbar />
          <Container className='container'>
            <Switch>
              <PrivateRoute path='/home' component={Dashboard} />
              <PrivateRoute path='/edit-profile' component={EditProfile} />
              <Route path='/signup' component={SignupPage} />
              <Route path='/welcome' component={Welcome} />
              <Route path='/signin' component={SigninPage} />
              <Route path='/404/:username' component={NotFound404} />
              <Route path='/:profile' component={ProfilePage} />
            </Switch>
          </Container>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
