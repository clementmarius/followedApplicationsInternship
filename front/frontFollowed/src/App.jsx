import { useContext } from "react";
import { StoreContext } from "./store";
import { Routes, Route, Link, NavLink } from "react-router-dom"; 
import LoginButton from "./components/LoginButton";
import RegisterButton from "./components/RegisterButton";
import { Single } from "./pages/RegisterPage";

function App() {
  return (
    <>
      <div className="flex justify-center items-center h-screen space-x-4">
        <LoginButton />
        <Link to="/register">
          <RegisterButton />
        </Link>


        <Routes>
        <Route
          path="/"
          element={
            <div>
              Home page
              <nav>
                <NavLink to="/contact">Contact</NavLink>{" "}
                <NavLink to="/blog">Blog</NavLink>
              </nav>
            </div>
          }
        />
        <Route path="/register" element={<Single />} />
        {/* Ajoutez d'autres routes ici si nécessaire */}
      </Routes>
      </div>

      
    </>
  );
}

export default App;
