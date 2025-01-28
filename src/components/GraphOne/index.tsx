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
    backgroundColor: string;
  }[];
}

interface GraphOneProps {
  ecgData: ECGData[];
}

const redConditions = [
	"Политопная экстрасистолия",
	"Пароксизмальная тахикардия наджелудочковая", 
	"Желудочковая тахикардия", 
	"Синдром Фридерика", 
	"Фибрилляция желудочков",
  "Атриовентрикулярная блокада 3-й степени (полная)", 
  "Синдром удлиненного Q-T", 
];

const orangeConditions = [
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
	"Искусственный водитель ритма", 
  "Нарушения проводимости", 
	"Синоатриальная блокада неполная", 
	"Синоатриальная блокада полная", 
	"Атриовентрикулярная блокада 1-й степени", 
	"Атриовентрикулярная блокада 2-й степени",  
	"Неполная блокада правой ветви пучка Гиса", 
	"Полная блокада правой ветви пучка Гиса", 
	"Блокада левой ножки пучка Гиса", 
	"Блокада передней левой ветви пучка Гиса", 
	"Блокада задней левой ветви пучка Гиса", 
	"Синдром WPW", 
	"Синдром укороченного PQ", 

];

const yellowConditions = [
"Инфаркт миокарда без зубца Q рубцовые изменения",  
"Инфаркт миокарда без зубца Q очаговые изменения миокарда",  
"Признаки хронической коронарной недостаточности (с учетом клиники)",  
"Локализация",  
"передне-перегородочная",  
"передне-верхушечная",  
"боковая",  
"задне-нижняя",  
"задне-базальная",  
"Некоронарогенные изменения миокарда",  
"Синдром ранней реполяризации желудочков",  
"Диффузные изменения процессов реполяризации", 
"Признаки дигиталисной интоксикации", 
"Легочное сердце (SIQIII)", 
"Гипертрофии", 
"Гипертрофия правого предсердия", 
"Гипертрофия левого предсердия", 
"Гипертрофия правого желудочка", 
"Гипертрофия левого желудочка", 
"С нарушением процессов реполяризации",  
];

const blackConditions = [
  "Нарушение коронарного кровообращения", 
	"Ишемия миокарда", 
	"Повреждение миокарда субэндокардиальное", 
	"Повреждение миокарда трансмуральное", 
	"Инфаркт миокарда с зубцом Q", 
	"Инфаркт миокарда без зубца Q острый период", 
	"Инфаркт миокарда без зубца Q подострый период", 
];

const GraphOne: React.FC<GraphOneProps> = ({ ecgData }) => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  useEffect(() => {
    if (!ecgData) return;
    processGraphData(ecgData);
  }, [ecgData]);

  const processGraphData = (data: ECGData[]) => {
    const dateCounts: Record<string, { green: number; yellow: number; orange: number; red: number; black: number }> = {};

    const redConditionsLower = redConditions.map((c) => c.toLowerCase());
    const orangeConditionsLower = orangeConditions.map((c) => c.toLowerCase());
    const yellowConditionsLower = yellowConditions.map((c) => c.toLowerCase());
    const blackConditionsLower = blackConditions.map((c) => c.toLowerCase());

    data.forEach((record) => {
      const date = record.ecgDate.split("T")[0];
      const descLower = record.ecgDescription.toLowerCase();

      if (!dateCounts[date]) {
        dateCounts[date] = { green: 0, yellow: 0, orange: 0, red: 0, black: 0 };
      }

      if (redConditionsLower.some((c) => descLower.includes(c))) {
        dateCounts[date].red++;
      } else if (blackConditionsLower.some((c) => descLower.includes(c))) {
        dateCounts[date].black++;
      } else if (orangeConditionsLower.some((c) => descLower.includes(c))) {
        dateCounts[date].orange++;
      } else if (yellowConditionsLower.some((c) => descLower.includes(c))) {
        dateCounts[date].yellow++;
      } else {
        dateCounts[date].green++;
      }
    });

    const labels = Object.keys(dateCounts);
    const greenData = labels.map((label) => dateCounts[label].green);
    const yellowData = labels.map((label) => dateCounts[label].yellow);
    const orangeData = labels.map((label) => dateCounts[label].orange);
    const redData = labels.map((label) => dateCounts[label].red);
    const blackData = labels.map((label) => dateCounts[label].black);

    setGraphData({
      labels,
      datasets: [
        {
          label: "В норме",
          data: greenData,
          backgroundColor: "#81c784",
        },
        {
          label: "Патологии",
          data: yellowData,
          backgroundColor: "#fff176",
        },
        {
          label: "Аритмии",
          data: orangeData,
          backgroundColor: "#ffb74d",
        },
        
        {
          label: "Жизнеугрожающие аритмии",
          data: redData,
          backgroundColor: "#e57373",
        },
        {
          label: "ОКС",
          data: blackData,
          backgroundColor: "#424242",
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
          color: "#4F4F4F",
        },
      },
      datalabels: {
        display: false
      },
    },
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Даты",
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: "Количество записей",
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
