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

function App() {
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
              <Route path='/signin' component={SigninPage} />
              <Route path='/:profile' component={ProfilePage} />
            </Switch>
          </Container>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
