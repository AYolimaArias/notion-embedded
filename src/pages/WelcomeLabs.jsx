import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SimpleNotionEmbed from "../components/SimpleNotionEmbed";
import "./WelcomeLabs.css";

const WelcomeLabs = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="welcome-container">
      <header className="welcome-header">
        <div className="header-content">
          <h1>Welcome Labs</h1>
          <div className="user-section">
            <span className="user-greeting">
              👋 Hola, <strong>{user?.username}</strong>
            </span>
            <button onClick={handleLogout} className="logout-button">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <main className="notion-content">
        <div className="notion-wrapper">
          <SimpleNotionEmbed />
        </div>
      </main>
    </div>
  );
};

export default WelcomeLabs;
