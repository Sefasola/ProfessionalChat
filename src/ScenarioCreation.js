import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // useLocation eklendi
import "./ScenarioCreation.css"; // CSS dosyasını ekledik

const ScenarioCreation = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const navigate = useNavigate(); // Yönlendirme için navigate kullanımı
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menü açma/kapama durumu
  const location = useLocation(); // Mevcut sayfa konumunu almak için

  const handleSubmit = (e) => {
    e.preventDefault();
    setResponse(`Sorduğunuz soru: "${input}" analiz ediliyor...`); // Simüle edilmiş cevap
    setInput(""); // Soru gönderildikten sonra input'u temizler
  };

  const handleLogout = () => {
    // Çıkış yap butonuna basıldığında giriş sayfasına yönlendirme
    navigate("/signin");
  };

  const handleScenarioList = () => {
    // Yazılan senaryolar sayfasına yönlendirme
    navigate("/scenario-list");
  };

  const handleScenaricreateByuser = () => {
    // Yazılan senaryolar sayfasına yönlendirme
    navigate("/scenario-writing");
  };

  const handleScenaricreateByAI = () => {
    // Yazılan senaryolar sayfasına yönlendirme
    if (location.pathname === "/scenario-creation") {
      setIsMenuOpen(false); // Menü kapansın
    } else {
      navigate("/scenario-creation"); // Farklı sayfadaysa yönlendirme yap
      setIsMenuOpen(false); // Menü kapansın
    }
    //navigate("/scenario-creation");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    const dropdown = document.querySelector(".dropdown-custom");
    if (dropdown) {
      if (isMenuOpen) {
        dropdown.classList.remove("show"); // Gizle
      } else {
        dropdown.classList.add("show"); // Göster
      }
    }
  };

  return (
    <div className="scenario-page">
      {/* Sağ üst köşede dropdown menü */}
      <div className="tab-menu">
        <button onClick={toggleMenu}>Menü</button>
        <div className="dropdown-custom">
          <button onClick={handleScenaricreateByuser}>Senaryo Yaz</button>
          <button onClick={handleScenarioList}>Yazılan Senaryolar</button>
          <button onClick={handleLogout}>Çıkış Yap</button>
        </div>
      </div>

      <h1>Senaryo Oluşturma</h1>

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
