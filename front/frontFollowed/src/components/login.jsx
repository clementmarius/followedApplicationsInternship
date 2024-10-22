import { useContext, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  const tryLogin = async () => {
    console.log("trylogin ");

    const result = await fetch("http://localhost:3000/user/login/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await result.json();
    const { token } = response;

    if (token) {
      cookies.set("token", token);
      console.log(response);

      const display = await fetch("http://localhost:3000/profile/me", {
        method: "GET",
        headers: { authorization: `Bearer ${token}` },
      });

      const responseDisplay = await display.json();

      console.log(responseDisplay);

      navigate("/landingPage");
    } else {
      console.error("login failed");
    }
  };

  return (
    <>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Login</h5>
          <div className="input-group mb-3">
            <span
              className="input-group-text justify-content-center"
              id="username-prefix"
              style={{
                width: "2.5rem",
              }}
            >
              @
            </span>
            <input
              type="text"
              name="mail"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="username-prefix"
              value={email}
              onChange={(event) => setMail(event.target.value)}
            />
          </div>
          <div className="input-group mb-3">
            <span
              className="input-group-text justify-content-center"
              id="password-prefix"
              style={{
                width: "2.5rem",
              }}
            >
              *
            </span>
            <input
              type="password"
              name="password"
              className="form-control"
              aria-describedby="password-prefix"
              placeholder="Password..."
              aria-label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div className="d-grid gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={tryLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
