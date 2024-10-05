import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import SignIn from "./SignIn";
import ScenarioCreation from "./ScenarioCreation";
import ScenarioWriting from "./ScenarioWriting";
import ScenarioList from "./ScenarioList"; // Senaryo listesi import edildi
import ProfilePage from "./ProfilePage"; // Profil sayfasını import et
import { useState } from "react";

function App() {
  // State olarak kullanıcı bilgilerini tanımlıyoruz ki bu veriler güncellenebilir olsun
  const [userName, setUserName] = useState("Sefa");
  const [email, setEmail] = useState("sefa@example.com");
  const [profilePicture, setProfilePicture] = useState("https://cdn-icons-png.flaticon.com/512/1077/1077035.png");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} /> {/* Ana sayfa olarak SignIn */}
        <Route path="/register" element={<Register />} /> {/* Kayıt sayfası */}
        <Route path="/signin" element={<SignIn />} /> {/* Giriş sayfası */}
        <Route path="/scenario-creation" element={<ScenarioCreation />} /> {/* Senaryo oluşturma */}
        <Route path="/scenario-list" element={<ScenarioList />} /> {/* Senaryo listesi */}
        <Route
          path="/scenario-writing"
          element={<ScenarioWriting userName={userName} profilePicture={profilePicture} />} // Prop olarak geçtik
        />
        <Route
          path="/profile"
          element={
            <ProfilePage
              userName={userName}
              setUserName={setUserName}
              email={email}
              setEmail={setEmail}
              profilePicture={profilePicture}
              setProfilePicture={setProfilePicture}
            />
          } // Profil sayfasına kullanıcı bilgilerini ve set fonksiyonlarını gönderiyoruz
        />
      </Routes>
    </Router>
  );
}

export default App;
