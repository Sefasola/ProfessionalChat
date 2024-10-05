import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./ProfilePage.css"; // Profil sayfası için özel stil dosyası

const ProfilePage = ({ userName, setUserName, email, setEmail, profilePicture, setProfilePicture }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menü durumu
  const navigate = useNavigate();
  const location = useLocation();

  // Dosya seçimi işlemi
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setProfilePicture(imageURL); // Seçilen dosya yeni profil resmi olarak atanır
    }
  };

  // Profil fotoğrafını değiştirme butonuna basıldığında dosya seçiciyi tetikleme
  const handleProfilePicClick = () => {
    document.getElementById("fileInput").click();
  };

  // Menü aç/kapa işlevi
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Sayfa yönlendirme işlemleri
  const handleProfilePage = () => navigate("/profile");
  const handleScenaricreateByAI = () => navigate("/scenario-creation");
  const handleScenaricreateByuser = () => navigate("/scenario-writing");
  const handleScenarioList = () => navigate("/scenario-list");
  const handleLogout = () => navigate("/signin");

  return (
    <div className="profile-page">
      {/* Sağ üstte menü butonu */}
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

      <div className="profile-picture-section">
        <img
          src={profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-picture"
        />
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }} // Dosya seç inputu gizli
          onChange={handleFileChange}
        />
        <button className="upload-button" onClick={handleProfilePicClick}>
          Profil fotoğrafını değiştir
        </button>
      </div>

      <div className="profile-info">
        <div className="info-row">
          <label>Ad:</label>
          <input
            type="text"
            className="text-input"
            value={userName}
            onChange={(e) => setUserName(e.target.value)} // İsim değiştiğinde state güncellenir
          />
        </div>
        <div className="info-row">
          <label>Soyad:</label>
          <input type="text" className="text-input" value="Korkmaz" readOnly />
        </div>
        <div className="info-row">
          <label>Email:</label>
          <input
            type="email"
            className="text-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // E-posta değiştiğinde state güncellenir
          />
        </div>
        <p>Yazdığı Senaryolar: Henüz yazılan senaryo yok.</p>
      </div>
    </div>
  );
};

export default ProfilePage;
