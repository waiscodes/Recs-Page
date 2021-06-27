import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./components/pages/Dashboard";
import PrivateRoute from "./components/pages/PrivateRoute";
import ProfilePage from "./components/pages/ProfilePage";
import MyNavbar from "./components/templates/Navbar";
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
              <PrivateRoute path='/home' component={Dashboard} />
              <Route exact path='/' component={Welcome} />
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
