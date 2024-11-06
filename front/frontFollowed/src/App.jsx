import { useContext } from "react";
import { StoreContext } from "./store";
import { Routes, Route, Link, NavLink, Outlet } from "react-router-dom";
import LoginButton from "./components/LoginButton";
import RegisterButton from "./components/RegisterButton";
import { Single } from "./pages/RegisterPage";
import LoginForm from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";

function Root() {
  return (
    <>
      <header>
        <nav className="flex space-x-4">
          <NavLink to="/" className="text-blue-500">Home</NavLink>
          <NavLink to="/blog" className="text-blue-500">Blog</NavLink>
          <NavLink to="/contact" className="text-blue-500">Contact</NavLink>
        </nav>
      </header>
      <div className="container my-4">
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen space-y-4 bg-gray-100">
      <Link to="/login">
            <LoginButton />
      </Link>


      <Link to="/register">
        <RegisterButton />
      </Link>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<div className="text-center">Home page</div>} />
          <Route path="blog" element={<div className="text-center">Blog</div>} />
          <Route path="contact" element={<div className="text-center">Contact</div>} />
        </Route>
        <Route path="/register" element={<Single />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/landingPage" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
