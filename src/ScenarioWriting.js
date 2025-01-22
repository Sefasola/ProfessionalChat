import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; // Axios kütüphanesini ekleyin
import "./ScenarioWriting.css";
import "./ScenarioCreation.css";

const ScenarioWriting = ({ userName, profilePicture }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [isManualTopic, setIsManualTopic] = useState(false);
  const [scenarioTitle, setScenarioTitle] = useState("");
  const [scenarioText, setScenarioText] = useState("");
  const [error, setError] = useState(""); // Hata mesajı için state

  // userName değeri için kontrol
  useEffect(() => {
    console.log("Logged in as user:", userName);
  }, [userName]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleProfilePage = () => navigate("/profile");

  const handleScenaricreateByAI = () => navigate("/scenario-creation");

  const handleScenaricreateByuser = () => {
    if (location.pathname === "/scenario-writing") {
      setIsMenuOpen(false);
    } else {
      navigate("/scenario-writing");
      setIsMenuOpen(false);
    }
  };

  const handleScenarioList = () => navigate("/scenario-list");

  const handleLogout = () => navigate("/signin");

  const handleTopicChange = (e) => {
    const selectedTopic = e.target.value;
    setIsManualTopic(selectedTopic === "Manuel Ekle");
    setTopic(selectedTopic === "Manuel Ekle" ? "" : selectedTopic);
  };

  // Senaryo gönderme işlevi
  const handleScenarioSubmit = async (e) => {
    e.preventDefault();
    const finalTopic = isManualTopic ? customTopic : topic;

    try {
      const response = await axios.post(
        "http://localhost:5000/api/scenarios",
        {
          author: userName, // author olarak userName kullanılıyor
          topic: finalTopic,
          title: scenarioTitle,
          content: scenarioText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log(response.data.message); // Başarı mesajı
      setScenarioText("");
      setScenarioTitle("");
      setTopic("");
      setCustomTopic("");
      setError(""); // Hata mesajını temizleyin
    } catch (error) {
      setError("Senaryo kaydedilirken bir hata oluştu.");
      console.error("Error saving scenario:", error);
    }
  };

  return (
    <div className="scenario-page">
      <div className="tab-menu">
        <button onClick={toggleMenu}>Menü</button>
        {isMenuOpen && (
          <div className="dropdown-content">
            <button onClick={handleScenaricreateByAI}>
              AI ile Senaryo Oluştur
            </button>
            <button onClick={handleScenaricreateByuser}>Senaryo Yaz</button>
            <button onClick={handleScenarioList}>Yazılan Senaryolar</button>
            <button onClick={handleProfilePage}>Profil Sayfası</button>
            <button onClick={handleLogout}>Çıkış Yap</button>
          </div>
        )}
      </div>

      <h1>Senaryo Yazma</h1>

      <div className="user-info">
        <img src={profilePicture} alt="Profile" className="profile-picture" />
        <h2>{userName}</h2>
      </div>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleScenarioSubmit} className="form-container">
        <label htmlFor="topic">Senaryo Konusu:</label>
        <select
          id="topic"
          value={isManualTopic ? "" : topic}
          onChange={handleTopicChange}
          className="topic-dropdown"
        >
          <option value="">Konu Seçin</option>
          <option value="Artificial Intelligence">
            Artificial Intelligence
          </option>
          <option value="Blockchain">Blockchain</option>
          <option value="Internet of Things">Internet of Things</option>
          <option value="Add manual">Add manual </option>
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

        <label htmlFor="scenarioTitle">Senaryo Başlığı:</label>
        <input
          type="text"
          id="scenarioTitle"
          value={scenarioTitle}
          onChange={(e) => setScenarioTitle(e.target.value)}
          placeholder="Senaryonuzun başlığını yazın..."
          className="scenario-title-input"
          required
        />

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
