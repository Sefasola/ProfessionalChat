import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2"; // Grafikler için Chart.js ve react-chartjs-2
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
import "./ScenarioList.css"; // CSS dosyasını ekliyoruz

// Chart.js'yi yapılandırmak için register işlemi yapıyoruz
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
  const [scenarios, setScenarios] = useState([]);
  const [statistics, setStatistics] = useState({
    mostWrittenTopic: "",
    mostActiveWriter: "",
    topicCounts: {},
    authorCounts: {},
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menü açma/kapama durumu
  const navigate = useNavigate(); // Yönlendirme işlevi
  const location = useLocation(); // Mevcut sayfa konumunu almak için

  // Senaryoları çekme işlemi (örnek veriler)
  useEffect(() => {
    const mockScenarios = [
      {
        author: "Ali",
        topic: "Yapay Zeka",
        content: "Gelecekte AI insanları yönlendirecek.",
      },
      {
        author: "fatma",
        topic: "Blockchain",
        content: "Blockchain ile güvenli ticaret.",
      },
      {
        author: "Ahmet",
        topic: "Yapay Zeka",
        content: "AI eğitim sistemlerini değiştirecek.",
      },
      {
        author: "Fatma",
        topic: "IoT",
        content: "IoT cihazlar evlerde devrim yapacak.",
      },
      {
        author: "Ali",
        topic: "Yapay Zeka",
        content: "AI ile daha iyi sağlık hizmetleri.",
      },
      {
        author: "fatma",
        topic: "Yapay Zeka",
        content: "AI ile daha iyi sağlık hizmetleri.",
      },
      {
        author: "fatma",
        topic: "Yapay Zeka",
        content: "AI ile daha iyi sağlık hizmetleri.",
      },
      {
        author: "fatma",
        topic: "Yapay Zeka",
        content: "AI ile daha iyi sağlık hizmetleri.",
      },
    ];
    setScenarios(mockScenarios);

    // İstatistiksel verileri güncellemek için
    const topicCounts = mockScenarios.reduce((acc, scenario) => {
      acc[scenario.topic] = (acc[scenario.topic] || 0) + 1;
      return acc;
    }, {});

    const authorCounts = mockScenarios.reduce((acc, scenario) => {
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
  }, []);

  // Grafik verileri (en çok yazı yazan 3 yazar)
  const topThreeAuthorsChartData = (() => {
    if (statistics.authorCounts) {
      // authorCounts objesini entries formatına çevirip sıralıyoruz
      const sortedEntries = Object.entries(statistics.authorCounts)
        .sort(([, aCount], [, bCount]) => bCount - aCount) // En çoktan en aza doğru sıralama
        .slice(0, 3); // İlk 3 yazarı alıyoruz

      // Sıralanmış verilerden etiketler (authors) ve sayılar (counts) oluşturuyoruz
      const top3Authors = sortedEntries.map(([author]) => author);
      const top3Counts = sortedEntries.map(([, count]) => count);

      return {
        labels: top3Authors, // İlk 3 yazarı etiket olarak kullanıyoruz
        datasets: [
          {
            label: "Yazara Göre Senaryo Sayısı (En Çok Yazı Yazan 3 Yazar)",
            data: top3Counts, // İlk 3 yazarın senaryo sayıları
            backgroundColor: "rgba(153, 102, 255, 0.6)",
            borderColor: "rgba(153, 102, 255, 1)",
            borderWidth: 1,
          },
        ],
      };
    }
    return {
      labels: [],
      datasets: [],
    };
  })();

  // Dropdown menüsü için fonksiyonlar
  const handleLogout = () => {
    navigate("/signin");
  };

  const handleScenarioWriting = () => {
    navigate("/scenario-writing");
  };

  const handleScenarioCreationByAI = () => {
    if (location.pathname === "/scenario-creation") {
      setIsMenuOpen(false);
    } else {
      navigate("/scenario-creation");
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Menü açma/kapama işlevi
  };

  // Grafik verileri
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

  return (
    <div className="scenario-list-page">
      {/* Sağ üst köşede dropdown menü */}
      <div className="tab-menu">
        <button onClick={toggleMenu}>Menü</button>
        {isMenuOpen && (
          <div className={`dropdown-custom ${isMenuOpen ? "show" : ""}`}>
            <button onClick={handleScenarioCreationByAI}>
              AI ile Senaryo Oluştur
            </button>
            <button onClick={handleScenarioWriting}>Senaryo Yaz</button>
            <button onClick={handleLogout}>Çıkış Yap</button>
          </div>
        )}
      </div>

      <div className="content-container">
        {/* Senaryoların listelendiği bölüm */}
        <div className="scenarios-section">
          <h2>Uzmanlar Tarafından Yazılan Senaryolar</h2>
          {scenarios.map((scenario, index) => (
            <div key={index} className="scenario-item">
              <h3>Yazar: {scenario.author}</h3>
              <p>Konu: {scenario.topic}</p>
              <p>{scenario.content}</p>
            </div>
          ))}
        </div>

        {/* Grafikler ve istatistiksel veriler sağ tarafta */}
        <div className="charts-and-stats-section">
          <div className="statistics-section">
            <p>
              <strong>En Çok Yazılan Senaryo Konusu:</strong>{" "}
              {statistics.mostWrittenTopic}
            </p>
            <p>
              <strong>En Aktif Yazar:</strong> {statistics.mostActiveWriter}
            </p>
          </div>

          {/* En çok yazı yazan 3 yazarı gösteren grafik */}
          <div className="chart-container">
            <h3>Yazara Göre Senaryolar (En Çok Yazı Yazan 3 Yazar)</h3>
            <Bar data={topThreeAuthorsChartData} />
          </div>

          {/* Konuya göre senaryo sayısı */}
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
