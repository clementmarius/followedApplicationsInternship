import { useContext } from "react";
import { StoreContext } from "./store";
import { Routes, Route, Navigate } from "react-router-dom";

/* import LoginForm from "./components/Login";
import LandingPage from "./components/LandingPage"; */
import CounterApp from "./components/Counter";
/* import LoginForm from "./components/Login";
 */import LoginButton from "./components/LoginButton";

/* const App = () => {
  const { state } = useContext(StoreContext);

  return (
    <>
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

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}; */

function App() {
  return <CounterApp />;
}

function LoginFromHome() {
  return <LoginButton />;
}


export default App;
LoginFromHome;
