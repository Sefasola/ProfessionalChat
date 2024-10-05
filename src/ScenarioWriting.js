import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ScenarioWriting.css";
import "./ScenarioCreation.css";

const ScenarioWriting = ({ userName, profilePicture }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const [topic, setTopic] = useState(""); 
  const [customTopic, setCustomTopic] = useState(""); 
  const [isManualTopic, setIsManualTopic] = useState(false); 
  const [scenarioText, setScenarioText] = useState(""); 

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
  const handleLogout = () => {
    navigate("/signin");
  };

  const handleTopicChange = (e) => {
    const selectedTopic = e.target.value;

    if (selectedTopic === "Manuel Ekle") {
      setIsManualTopic(true);
      setTopic(""); 
    } else {
      setIsManualTopic(false);
      setTopic(selectedTopic); 
    }
  };

  const handleScenarioSubmit = (e) => {
    e.preventDefault();
    const finalTopic = isManualTopic ? customTopic : topic; 
    console.log(`Senaryo Konusu: ${finalTopic}`);
    console.log(`Senaryo: ${scenarioText}`);
    setScenarioText(""); 
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

      <h1>Senaryo Yazma</h1>

      {/* Kullanıcı profil resmi ve ismi */}
      <div className="user-info">
        <img src={profilePicture} alt="Profile" className="profile-picture" /> 
        <h2>{userName}</h2> 
      </div>

      <form onSubmit={handleScenarioSubmit} className="form-container">
        <label htmlFor="topic">Senaryo Konusu:</label>
        <select
          id="topic"
          value={isManualTopic ? "" : topic} 
          onChange={handleTopicChange} 
          className="topic-dropdown"
        >
          <option value="">Konu Seçin</option>
          <option value="Yapay Zeka">Yapay Zeka</option>
          <option value="Blockchain">Blockchain</option>
          <option value="IoT">IoT</option>
          <option value="Manuel Ekle">Manuel Ekle</option>
        </select>

        {isManualTopic && (
          <input
            type="text"
            value={customTopic}
            onChange={(e) => setCustomTopic(e.target.value)}
            placeholder="Kendi konunuzu girin"
            className="manual-input"
            autoFocus
            required
          />
        )}

        <label htmlFor="scenarioText">Senaryo Yazın:</label>
        <textarea
          id="scenarioText"
          value={scenarioText}
          onChange={(e) => setScenarioText(e.target.value)}
          placeholder="Senaryonuzu yazın..."
          rows="10"
          className="scenario-textarea"
          required
        />

        <button type="submit">Senaryoyu Kaydet</button>
      </form>
    </div>
  );
};

export default ScenarioWriting;
