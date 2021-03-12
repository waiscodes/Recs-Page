import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";

function App() {
  return (
    <AuthProvider className='App'>
      <Container>
        <ProfilePage />
        <SignupPage />
      </Container>
    </AuthProvider>
  );
}

export default App;
