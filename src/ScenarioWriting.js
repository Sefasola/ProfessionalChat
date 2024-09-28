import { useState } from "react";
import "./ScenarioWriting.css"; // CSS dosyasını ekledik

const ScenarioWriting = () => {
  const [topic, setTopic] = useState("Yapay Zeka"); // Varsayılan konu
  const [customTopic, setCustomTopic] = useState(""); // Manuel ekleme seçeneği için
  const [isManualTopic, setIsManualTopic] = useState(false); // Manuel ekleme açık mı
  const [scenarioText, setScenarioText] = useState("");

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
    // Burada senaryonun backend'e gönderilmesi işlemi yapılabilir.
    setScenarioText(""); // Senaryo alanını temizle
  };

  return (
    <div className="scenario-writing-page">
      <h1>Senaryo Yazma</h1>

      <form onSubmit={handleScenarioSubmit} className="form-container">
        <label htmlFor="topic">Senaryo Konusu:</label>
        <select
          id="topic"
          value={topic}
          onChange={handleTopicChange}
          className="dropdown-menu"
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
