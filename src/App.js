import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./Register";
import SignIn from "./SignIn";
import ScenarioCreation from "./ScenarioCreation";
import ScenarioWriting from "./ScenarioWriting"; // Senaryo yazma sayfası eklendi
import ScenarioList from "./ScenarioList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} /> {/* Ana sayfa olarak SignIn */}
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/scenario-creation" element={<ScenarioCreation />} />{" "}
        <Route path="/scenario-writing" element={<ScenarioWriting />} />{" "}
        <Route path="/scenario-list" element={<ScenarioList />} />{" "}
        {/* Yönlendirme buraya */}
      </Routes>
    </Router>
  );
}

export default App;
