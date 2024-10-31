import { useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Contact from "./Contact"; // Assurez-vous que le chemin est correct


const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  const tryLogin = async () => {
    console.log("Trying to log in...");

    const response = await fetch("http://localhost:3000/user/login/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    const { token } = data;

    if (token) {
      cookies.set("token", token);
      console.log("Login successful:", data);

      // Récupérer les informations de profil
      const profileResponse = await fetch("http://localhost:3000/profile/me", {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });

      const profileData = await profileResponse.json();
      console.log("User profile:", profileData);

      return true;
    } else {
      console.error("Login failed");
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const success = await tryLogin();
    if (success) {
      navigate("/landingPage");
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text" id="username-prefix">@</span>
              <input
                type="text"
                name="mail"
                className="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="username-prefix"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="password-prefix">*</span>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Password..."
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
      <Footer />
      <Contact />
    </>
  );
};

export default LoginForm;
