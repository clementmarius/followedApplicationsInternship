import { useContext } from "react";
import { StoreContext } from "./store";
import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import LoginForm from "./components/Login";
import LandingPage from "./components/LandingPage";

const App = () => {
  const { state } = useContext(StoreContext);

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          {state.auth.isLoggedIn ? (
            <Route path="/landingPage" element={<LandingPage />} />
          ) : (
            <Route
              path="/"
              element={
                <>
                  <p>
                    Pour vous connecter, utilisez un nom d'utilisateur et le mot de passe <kbd>abcdef</kbd>
                  </p>
                  <LoginForm />
                </>
              }
            />
          )}
          {/* Redirection en cas d'URL incorrecte */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
