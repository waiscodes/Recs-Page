import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import RecommendPage from "./pages/RecommendPage";
import ProfilePage from "./pages/ProfilePage";
import CompleteProfile from "./pages/CompleteProfile";
import Navbar1 from "./pages/Navbar";

function App() {
  return (
    <Container>
      <Router>
        <AuthProvider className='App'>
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <PrivateRoute
              path='/complete-profile'
              component={CompleteProfile}
            />
            <Route path='/signup' component={SignupPage} />
            <Route path='/signin' component={SigninPage} />
            <Route path='/recommend/:username' component={RecommendPage} />
            <Route path='/:profile' component={ProfilePage} />
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
