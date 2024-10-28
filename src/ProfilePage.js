import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api/axios";
import "./ProfilePage.css";

const ProfilePage = ({ profilePicture, setProfilePicture }) => {
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Sayfa yüklendiğinde kullanıcı bilgilerini almak için useEffect kullanımı
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setUserName(response.data.name);
      } catch (err) {
        console.error("Kullanıcı bilgisi alınırken hata oluştu", err);
      }
    };
    fetchProfile();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="profile-page">
      <div className="tab-menu">
        <button onClick={toggleMenu}>Menü</button>
        {isMenuOpen && (
          <div className="dropdown-content">
            <button onClick={() => navigate("/scenario-creation")}>
              AI ile Senaryo Oluştur
            </button>
            <button onClick={() => navigate("/scenario-writing")}>
              Senaryo Yaz
            </button>
            <button onClick={() => navigate("/scenario-list")}>
              Yazılan Senaryolar
            </button>
            <button onClick={() => navigate("/profile")}>Profil Sayfası</button>
            <button onClick={() => navigate("/signin")}>Çıkış Yap</button>
          </div>
        )}
      </div>

      <div className="profile-picture-section">
        <img
          src={profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="profile-picture"
        />
        <button onClick={() => document.getElementById("fileInput").click()}>
          Profil fotoğrafını değiştir
        </button>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) setProfilePicture(URL.createObjectURL(file));
          }}
        />
      </div>

      <div className="profile-info">
        <div className="info-row">
          <label>Kullanıcı Adı:</label>
          <input type="text" className="text-input" value={userName} readOnly />
        </div>
        <p>Yazdığı Senaryolar: Henüz yazılan senaryo yok.</p>
      </div>
    </div>
  );
};

export default ProfilePage;
