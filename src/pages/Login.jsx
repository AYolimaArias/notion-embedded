import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simular un delay de red
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = login(username, password);

    if (result.success) {
      navigate("/welcome");
    } else {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Codeable Labs</h1>
          <p>Ingresa tus credenciales para continuar</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        <div className="login-footer">
          <p className="hint">💡 Usuarios de prueba:</p>
          <ul className="credentials-list">
            <li>
              <code>admin / admin123</code>
            </li>
            <li>
              <code>user / user123</code>
            </li>
            <li>
              <code>demo / demo123</code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;
