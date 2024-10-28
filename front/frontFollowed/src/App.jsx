import { useContext } from "react";
import { StoreContext } from "./store";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import LoginForm from "./components/Login";
import Dashboard from "./components/landingPage"; 
import landingPage from "./components/landingPage"; 

const App = () => {
  const { state } = useContext(StoreContext);

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          {state.auth.isLoggedIn ? (
            <>
              <Route path="/landingPage" element={<landingPage />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <>
                    <p>
                      To login, use any username and the password <kbd>abcdef</kbd>
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
