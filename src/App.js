import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./components/pages/PrivateRoute";
import SigninPage from "./components/accounts/SigninPage";
import SignupPage from "./components/accounts/SignupPage";
import ProfilePage from "./components/pages/ProfilePage";
import MyNavbar from "./components/templates/Navbar";
import EditProfile from "./components/accounts/EditProfile";
import Welcome from "./components/pages/Welcome";
import NotFound404 from "./components/pages/NotFound404";

const App = () => {
  return (
    <>
      <Router>
        <AuthProvider className='App'>
          <MyNavbar />
          <Container className='container'>
            <Switch>
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute path='/edit-profile' component={EditProfile} />
              <Route path='/signup' component={SignupPage} />
              <Route path='/welcome' component={Welcome} />
              <Route path='/signin' component={SigninPage} />
              <Route path='/404/:username' component={NotFound404} />
              <Route path='/:profileUrl' component={ProfilePage} />
            </Switch>
          </Container>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;
