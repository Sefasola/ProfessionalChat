import { useEffect, useState } from "react";
import axios from "../api/axios"; // Axios'u import et

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // Korunan endpoint'e istek gönder
    axios
      .get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data); // Kullanıcı verilerini state'e kaydet
      })
      .catch((error) => {
        console.error("Erişim hatası:", error);
      });
  }, []);

  return (
    <div>
      <h1>Profil Bilgileri</h1>
      {userData ? (
        <div>
          <p>Ad: {userData.name}</p>
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Veriler yükleniyor...</p>
      )}
    </div>
  );
};

export default ProfilePage;
