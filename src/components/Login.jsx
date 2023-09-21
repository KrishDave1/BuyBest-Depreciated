import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState('');
  const { login } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      setSuccessMessage('Logging in ...');
      setEmail("");
      setPassword("");
      setLoggedIn(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
      setError("Failed to sign in");
    }
    setLoading(false);
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
      {successMessage && <p className="register-success">{successMessage}</p>}
        <h2 className="login-title">Login</h2>
        {error && <p className="register-error">{error}</p>}
        <div className="login-inputs">
          <label className="login-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            placeholder="Enter your email"
          />
          <label className="login-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            placeholder="Enter your password"
          />
          <button type="submit" className="login-button" disabled={loading}>
            <Link className="nav-link">
              Login
            </Link>
          </button>
          <Link to="/forgot-password" className="nav-forgot">
            Forgot Password?
          </Link>
          <div className="login-link">
            Need an account?
            <Link to="/register" className="nav-link nav-login">
              Sign Up
            </Link>
          </div>
        </div> 
      </form>
    </div>
  );
};

export default Login;
