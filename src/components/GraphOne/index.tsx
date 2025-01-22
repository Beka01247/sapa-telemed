import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { Chart, ChartOptions } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./GraphOne.css";

Chart.register(ChartDataLabels);

interface ECGData {
  ecgDate: string;
  ecgDescription: string;
}

interface GraphData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
}

interface GraphOneProps {
  ecgData: ECGData[];
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
    const dateCounts: Record<string, { green: number; yellow: number; red: number; total: number }> = {};

    const redConditionsLower = redConditions.map((c) => c.toLowerCase());
    const yellowConditionsLower = yellowConditions.map((c) => c.toLowerCase());

    data.forEach((record) => {
      const date = record.ecgDate.split("T")[0];
      const descLower = record.ecgDescription.toLowerCase();

      if (!dateCounts[date]) {
        dateCounts[date] = { green: 0, yellow: 0, red: 0, total: 0 };
      }

      dateCounts[date].total++;

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

    const gradientColors = (color: string) => {
      const gradient = new Array(labels.length).fill(color);
      return gradient;
    };

    setGraphData({
      labels,
      datasets: [
        {
          label: "В норме",
          data: greenData,
          backgroundColor: gradientColors("#81c784"),
        },
        {
          label: "С патологией",
          data: yellowData,
          backgroundColor: gradientColors("#fff176"),
        },
        {
          label: "Аритмия",
          data: redData,
          backgroundColor: gradientColors("#e57373"),
        },
      ],
    });
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: {
            size: 12,
            family: "Arial",
            weight: "bold",
          },
          padding: 10, // Use positive padding to ensure proper spacing
          color: "#4F4F4F",
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#ffffff",
        titleColor: "#333",
        bodyColor: "#4F4F4F",
        borderColor: "#e0e0e0",
        borderWidth: 1,
        titleFont: {
          size: 14,
          weight: "bold",
        },
        bodyFont: {
          size: 12,
        },
      },
      datalabels: {
        display: true,
        align: "top",
        anchor: "end",
        formatter: (value, context) => {
          const total = context.chart.data.datasets
            .map((dataset) => {
              const dataValue = dataset.data[context.dataIndex];
              return typeof dataValue === "number" ? dataValue : 0; // Ensure only numbers are summed
            })
            .reduce((sum, val) => sum + val, 0); // Safely sum up numbers
        
          if (total === 0) return ""; // Skip if total is 0 to avoid division by zero
        
          const percentage = ((value / total) * 100).toFixed(1);
          return percentage === "0.0" ? "" : `${percentage}%`; // Skip if percentage is 0%
        },
        offset: -5 , // Positive offset to avoid overlapping with bars
        font: {
          size: 12,
          weight: "bold",
        },
        color: "#333",
      },
    },
    layout: {
      padding: {
        top: 20, // Use positive padding to add extra space above the chart
      },
    },
    scales: {
      x: {
        stacked: false,
        ticks: {
          font: {
            size: 12,
            weight: "bold",
          },
          color: "#4F4F4F",
        },
        title: {
          display: true,
          text: "Даты",
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#4F4F4F",
        },
      },
      y: {
        stacked: false,
        beginAtZero: true,
        ticks: {
          font: {
            size: 12,
            weight: "bold",
          },
          color: "#4F4F4F",
        },
        title: {
          display: true,
          text: "Кол-во обследованных",
          font: {
            size: 14,
            weight: "bold",
          },
          color: "#4F4F4F",
        },
        grid: {
          color: "#e0e0e0",
        },
      },
    },
  };
  
  
  return (
    <div className="graph-container">
      <h2 className="graph-title">Результаты ЭКГ скрининга</h2>

      {!ecgData.length ? (
        <p className="no-data-label">Нет данных для отображения.</p>
      ) : !graphData ? (
        <p>Обработка данных...</p>
      ) : (
        <div className="graph-display">
          <Bar data={graphData} options={options} />
        </div>
      )}
    </div>
  );
};
export default GraphOne;