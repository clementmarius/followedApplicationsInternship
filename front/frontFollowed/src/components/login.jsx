import { useContext, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../store";
import displayLandingPage from "./DisplayLandingPage";
import Footer from "./Footer";
import Contact from "./contact";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();
  const {dispatch} = useContext(StoreContext);

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

      const profileResponse = await fetch("http://localhost:3000/profile/me", {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });

      const profileData = await profileResponse.json();
      console.log("User profile:", profileData);
      dispatch({ type: "SET_LOGGED_IN", payload: true });
      return true;
    } else {
      console.error("Login failed");
      return false;
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <div className="input-group mb-3">
            <span
              className="input-group-text justify-content-center"
              id="username-prefix"
              style={{ width: "2.5rem" }}
            >
              @
            </span>
            <form
              onSubmit={(event) =>
                displayLandingPage(event, navigate, tryLogin)
              }
            >
              <div>
                <label>
                  Email:{" "}
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
                </label>
              </div>
              <div className="input-group mb-3">
                <span
                  className="input-group-text justify-content-center"
                  id="password-prefix"
                  style={{ width: "2.5rem" }}
                >
                  *
                </span>
                <div>
                  <label>
                    Password:{" "}
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      aria-describedby="password-prefix"
                      placeholder="Password..."
                      aria-label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </label>
                </div>
              </div>
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <Contact />
    </>
  );
};

export default LoginForm;
