import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ScenarioCreation.css";

const ScenarioCreation = ({ userName, profilePicture }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setResponse(`Sorduğunuz soru: "${input}" analiz ediliyor...`);
    setInput("");
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleProfilePage = () => {
    navigate("/profile");
  };

  const handleScenaricreateByAI = () => {
    navigate("/scenario-creation");
  };

  const handleScenaricreateByuser = () => {
    if (location.pathname === "/scenario-writing") {
      setIsMenuOpen(false);
    } else {
      navigate("/scenario-writing");
      setIsMenuOpen(false);
    }
  };

  const handleScenarioList = () => {
    navigate("/scenario-list");
  };

  return (
    <div className="scenario-page">
      {/* Sağ üst köşede açılır menü */}
      <div className="tab-menu">
        <button onClick={toggleMenu}>Menü</button>
        {isMenuOpen && (
          <div className="dropdown-content">
            <button onClick={handleScenaricreateByAI}>AI ile Senaryo Oluştur</button>
            <button onClick={handleScenaricreateByuser}>Senaryo Yaz</button>
            <button onClick={handleScenarioList}>Yazılan Senaryolar</button>
            <button onClick={handleProfilePage}>Profil Sayfası</button>
            <button onClick={handleLogout}>Çıkış Yap</button>
          </div>
        )}
      </div>

      <h1>Senaryo Oluşturma</h1>

      {/* Kullanıcı profil resmi ve ismi */}
      <div className="user-info">
        <img src={profilePicture} alt="Profile" className="profile-picture" />
        <h2>{userName}</h2>
      </div>

      {response && (
        <div className="response">
          <h3>Cevap:</h3>
          <p>{response}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="form-container">
        <label>Soru Sorun:</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Gelecekteki senaryolar hakkında bir soru sorun..."
          required
        />
        <button type="submit">Gönder</button>
      </form>
    </div>
  );
};

export default ScenarioCreation;
