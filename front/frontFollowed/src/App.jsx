import { useContext } from "react";
import { StoreContext } from "./store";
import { Routes, Route, Link } from "react-router-dom"; // Ajoutez Link ici
import LoginButton from "./components/LoginButton";
import RegisterButton from "./components/RegisterButton";

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen space-x-4">
        <LoginButton />
        <RegisterButton />

        <Routes>
          <Route
            path="/"
            element={
              <div>
                Home page
                <nav>
                  <Link to="/contact">Contact</Link> {/* Utilisation de Link */}
                  <Link to="/blog">Blog</Link> {/* Utilisation de Link */}
                </nav>
              </div>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
