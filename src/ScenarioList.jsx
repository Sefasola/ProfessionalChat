import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios ile backend bağlantısı
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import "./ScenarioList.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ScenarioList = () => {
  const [scenarios, setScenarios] = useState([]); // Senaryolar
  const [statistics, setStatistics] = useState({
    mostWrittenTopic: "",
    mostActiveWriter: "",
    topicCounts: {},
    authorCounts: {},
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menü açma/kapama durumu
  const navigate = useNavigate(); // Yönlendirme işlevi

  useEffect(() => {
    const fetchScenarios = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/scenarios"); // Backend'den senaryoları çekin
        setScenarios(response.data); // Gelen senaryoları state'e kaydedin

        // İstatistik hesaplama
        const topicCounts = response.data.reduce((acc, scenario) => {
          acc[scenario.topic] = (acc[scenario.topic] || 0) + 1;
          return acc;
        }, {});

        const authorCounts = response.data.reduce((acc, scenario) => {
          acc[scenario.author] = (acc[scenario.author] || 0) + 1;
          return acc;
        }, {});

        const mostWrittenTopic = Object.keys(topicCounts).reduce((a, b) =>
          topicCounts[a] > topicCounts[b] ? a : b
        );

        const mostActiveWriter = Object.keys(authorCounts).reduce((a, b) =>
          authorCounts[a] > authorCounts[b] ? a : b
        );

        setStatistics({
          mostWrittenTopic,
          mostActiveWriter,
          topicCounts,
          authorCounts,
        });
      } catch (error) {
        console.error("Senaryolar alınırken bir hata oluştu:", error);
      }
    };

    fetchScenarios();
  }, []);

  const topThreeAuthorsChartData = (() => {
    if (statistics.authorCounts) {
      const sortedEntries = Object.entries(statistics.authorCounts)
        .sort(([, aCount], [, bCount]) => bCount - aCount)
        .slice(0, 3);

      const top3Authors = sortedEntries.map(([author]) => author);
      const top3Counts = sortedEntries.map(([, count]) => count);

      return {
        labels: top3Authors,
        datasets: [
          {
            label: "Yazara Göre Senaryo Sayısı",
            data: top3Counts,
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      };
    }
    return { labels: [], datasets: [] };
  })();

  const topicChartData = {
    labels: Object.keys(statistics.topicCounts),
    datasets: [
      {
        label: "Konuya Göre Senaryo Sayısı",
        data: Object.values(statistics.topicCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="scenario-list-page">
      <div className="tab-menu">
        <button onClick={toggleMenu}>Menü</button>
        {isMenuOpen && (
          <div className={`dropdown-custom ${isMenuOpen ? "show" : ""}`}>
            <button onClick={() => navigate("/scenario-creation")}>
              AI ile Senaryo Oluştur
            </button>
            <button onClick={() => navigate("/scenario-writing")}>
              Senaryo Yaz
            </button>
            <button onClick={() => navigate("/scenario-list")}>
              Senaryo Listesi
            </button>
            <button onClick={() => navigate("/profile")}>Profil Sayfası</button>
            <button onClick={() => navigate("/signin")}>Çıkış Yap</button>
          </div>
        )}
      </div>

      <div className="content-container">
        <div className="scenarios-section">
          <h2>Uzmanlar Tarafından Yazılan Senaryolar</h2>
          {scenarios.map((scenario, index) => (
            <div key={index} className="scenario-item">
              <h3>Yazar: {scenario.author}</h3>
              <p>Konu: {scenario.topic}</p>
              <p>Başlık: {scenario.title}</p>
              <p>{scenario.content}</p>
            </div>
          ))}
        </div>

        <div className="charts-and-stats-section">
          <div className="statistics-section">
            <p><strong>En Çok Yazılan Konu:</strong> {statistics.mostWrittenTopic}</p>
            <p><strong>En Aktif Yazar:</strong> {statistics.mostActiveWriter}</p>
          </div>

          <div className="chart-container">
            <h3>En Aktif 3 Yazar</h3>
            <Bar data={topThreeAuthorsChartData} />
          </div>

          <div className="chart-container">
            <h3>Konuya Göre Senaryolar</h3>
            <Pie data={topicChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScenarioList;
