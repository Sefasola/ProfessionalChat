import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation eklendi
import "./ScenarioWriting.css"; // CSS dosyasını ekledik
import "./ScenarioCreation.css"; // CSS dosyasını ekledik

const ScenarioWriting = () => {
  const [topic, setTopic] = useState("Yapay Zeka"); // Varsayılan konu
  const [customTopic, setCustomTopic] = useState(""); // Manuel ekleme seçeneği için
  const [isManualTopic, setIsManualTopic] = useState(false); // Manuel ekleme açık mı
  const [scenarioText, setScenarioText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menü açma/kapama durumu
  const navigate = useNavigate(); // Yönlendirme işlevi
  const location = useLocation(); // Mevcut sayfa konumunu almak için

  const handleTopicChange = (e) => {
    if (e.target.value === "Manuel Ekle") {
      setIsManualTopic(true);
      setTopic("");
    } else {
      setIsManualTopic(false);
      setTopic(e.target.value);
    }
  };

  const handleScenarioSubmit = (e) => {
    e.preventDefault();
    const selectedTopic = isManualTopic ? customTopic : topic;
    console.log(`Senaryo Yazılıyor: ${selectedTopic}`);
    console.log(`Senaryo: ${scenarioText}`);
    setScenarioText(""); // Senaryo alanını temizle
  };

  const handleLogout = () => {
    navigate("/signin");
  };

  const handleScenarioList = () => {
    navigate("/scenario-list");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Menü açma/kapama işlevi
  };

  const handleScenaricreateByuser = () => {
    // Eğer şu anda "Senaryo Yazma" sayfasındaysak, yönlendirme yapma, sadece menüyü kapat
    if (location.pathname === "/scenario-writing") {
      setIsMenuOpen(false); // Menü kapansın
    } else {
      navigate("/scenario-writing"); // Farklı sayfadaysa yönlendirme yap
      setIsMenuOpen(false); // Menü kapansın
    }
  };

  const handleScenaricreateByAI = () => {
    // Yazılan senaryolar sayfasına yönlendirme
    navigate("/scenario-creation");
  };

  return (
    <div className="scenario-page">
      {/* Sağ üst köşede dropdown menü */}
      <div className="tab-menu">
        <button onClick={toggleMenu}>Menü</button>
        {isMenuOpen && (
          <div className="dropdown-content">
            <button onClick={handleScenaricreateByAI}>
              {" "}
              AI ile Senaryo Oluştur
            </button>
            <button onClick={handleScenaricreateByuser}>Senaryo Yaz</button>
            <button onClick={handleScenarioList}>Yazılan Senaryolar</button>
            <button onClick={handleLogout}>Çıkış Yap</button>
          </div>
        )}
      </div>

      <h1>Senaryo Yazma</h1>

      <form onSubmit={handleScenarioSubmit} className="form-container">
        <label htmlFor="topic">Senaryo Konusu:</label>
        <select
          id="topic"
          value={topic}
          onChange={handleTopicChange}
          className="topic-dropdown"
        >
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
