import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./GraphOne.css";

interface ECGData {
  ecgDate: string;
  ecgDescription: string;
}

interface GraphData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

interface GraphOneProps {
  ecgData: ECGData[]; // Received from parent
}

const redConditions = [
  "Брадиаритмии",
  "Синдром слабости синусового узла (остановка синусового узла)",
  "AV-блокада 2-й степени типа Мобитц",
  "Полная AV-блокада",
  "Тахиаритмии",
  "Пароксизмальная желудочковая тахикардия",
  "ЖТ типа «пируэт» torsades de pointes",
  "Желудочковые экстрасистолы (плитопные ЖЭС, ранние ЖЭС по типу R на Т)",
  "Синдром бругада",
  "Long QT",
];

const yellowConditions = [
  "Синусовая брадикардия",
  "Синусовая тахикардия",
  "Синусовая аритмия",
  "Фибрилляция (мерцание) предсердий",
  "нормосистолическая форма",
  "тахисистолическая форма",
  "Трепетание предсердий, правильная форма",
  "Трепетание предсердий, неправильная форма",
  "Экстрасистолия наджелудочковая",
  "Экстрасистолия желудочковая",
  "единичные экстрасистолы",
  "парные экстрасистолы",
  "групповые экстрасистолы",
  "вставочные экстрасистолы",
  "аллоритмия",
  "Политопная экстрасистолия",
  "Пароксизмальная тахикардия наджелудочковая",
  "Желудочковая тахикардия",
  "Синдром Фридерика",
  "Фибрилляция желудочков",
  "Искусственный водитель ритма",
  "Синоатриальная блокада неполная",
  "Синоатриальная блокада полная",
  "Атриовентрикулярная блокада 1-й степени",
  "Атриовентрикулярная блокада 2-й степени",
  "Атриовентрикулярная блокада 3-й степени (полная)",
  "Неполная блокада правой ветви пучка Гиса",
  "Полная блокада правой ветви пучка Гиса",
  "Блокада левой ножки пучка Гиса",
  "Блокада передней левой ветви пучка Гиса",
  "Блокада задней левой ветви пучка Гиса",
  "Синдром WPW",
  "Синдром укороченного PQ",
  "Ишемия миокарда",
  "Повреждение миокарда",
  "субэндокардиальное",
  "трансмуральное",
  "Инфаркт миокарда с зубцом Q",
  "Инфаркт миокарда без зубца Q",
  "острый период",
  "подострый период",
  "рубцовые изменения",
  "очаговые изменения миокарда",
  "Признаки хронической коронарной недостаточности",
  "передне-перегородочная",
  "передне-верхушечная",
  "боковая",
  "задне-нижняя",
  "задне-базальная",
  "Синдром ранней реполяризации желудочков",
  "Синдром удлиненного Q-T",
  "Диффузные изменения процессов реполяризации",
  "Признаки дигиталисной интоксикации",
  "Легочное сердце (SIQIII)",
  "Гипертрофия правого предсердия",
  "Гипертрофия левого предсердия",
  "Гипертрофия правого желудочка",
  "Гипертрофия левого желудочка",
  "С нарушением процессов реполяризации",
];

const GraphOne: React.FC<GraphOneProps> = ({ ecgData }) => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  useEffect(() => {
    if (!ecgData) return;

    processGraphData(ecgData);
  }, [ecgData]);

  const processGraphData = (data: ECGData[]) => {
    const dateCounts: Record<string, { green: number; yellow: number; red: number }> = {};

    // Normalize arrays for case-insensitive comparisons
    const redConditionsLower = redConditions.map((c) => c.toLowerCase());
    const yellowConditionsLower = yellowConditions.map((c) => c.toLowerCase());

    data.forEach((record) => {
      const date = record.ecgDate.split("T")[0];
      const descLower = record.ecgDescription.toLowerCase();

      if (!dateCounts[date]) {
        dateCounts[date] = { green: 0, yellow: 0, red: 0 };
      }

      if (redConditionsLower.some((c) => descLower.includes(c))) {
        dateCounts[date].red++;
      } else if (yellowConditionsLower.some((c) => descLower.includes(c))) {
        dateCounts[date].yellow++;
      } else {
        dateCounts[date].green++;
      }
    });

    const labels = Object.keys(dateCounts);
    const greenData = labels.map((label) => dateCounts[label].green);
    const yellowData = labels.map((label) => dateCounts[label].yellow);
    const redData = labels.map((label) => dateCounts[label].red);

    setGraphData({
      labels,
      datasets: [
        {
          label: "Зеленый (В норме)",
          data: greenData,
          backgroundColor: "#4caf50",
        },
        {
          label: "Желтый (Есть осложнения)",
          data: yellowData,
          backgroundColor: "#ffeb3b",
        },
        {
          label: "Красный (Плохо)",
          data: redData,
          backgroundColor: "#f44336",
        },
      ],
    });
  };

  return (
    <div className="graph-container">
      <h2 className="graph-title">Общие результаты пациентов</h2>

      {!ecgData.length ? (
        <p className="no-data-label">Нет данных для отображения.</p>
      ) : !graphData ? (
        <p>Обработка данных...</p>
      ) : (
        <div className="graph-display">
          <Bar data={graphData} />
        </div>
      )}
    </div>
  );
};

export default GraphOne;
