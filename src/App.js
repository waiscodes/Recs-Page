import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./pages/PrivateRoute";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import RecommendPage from "./pages/RecommendPage";

function App() {
  return (
    <Container>
      <Router>
        <AuthProvider className='App'>
          <Switch>
            <PrivateRoute exact path='/' component={Dashboard} />
            <Route path='/signup' component={SignupPage} />
            <Route path='/signin' component={SigninPage} />
            <Route path='/recommend' component={RecommendPage} />
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;
