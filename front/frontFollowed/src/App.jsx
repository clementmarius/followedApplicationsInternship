import { useContext } from "react";
import { StoreContext } from "./store";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import LoginForm from "./components/Login";
import LandingPage from "./components/landingPage";

const App = () => {
  const { state } = useContext(StoreContext); // Récupérer l'état de l'authentification

  return (
    <>
      <Header /> {/* Affichage du header pour toutes les pages */}
      <div className="container">
        <Routes>
          {state.auth.isLoggedIn ? ( // Si l'utilisateur est connecté
            <>
              {/* Redirection vers la landing page */}
              <Route path="/landingPage" element={<LandingPage />} />
              <Dashboard />
            </>
          ) : (
            <>
              {/* Formulaire de connexion si non connecté */}
              <Route
                path="/"
                element={
                  <>
                    <p>
                      Example app with login system using cookies. To login, use
                      any username and the password <kbd>abcdef</kbd>
                    </p>
                    <LoginForm />
                  </>
                }
              />
            </>
          )}
        </Routes>
      </div>
    </>
  );
};

export default App;
