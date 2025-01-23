import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./GraphSix.css";
import { ChartOptions } from "chart.js";

interface ECGData {
  age: number;
  ecgDescription: string;
}

interface GraphSixProps {
  ecgData: ECGData[];
}

const GraphSix: React.FC<GraphSixProps> = ({ ecgData }) => {
  const [graphData, setGraphData] = useState<any>(null);

  useEffect(() => {
    if (!ecgData) return;
    processGraphData(ecgData);
  }, [ecgData]);

  const processGraphData = (data: ECGData[]) => {
    const ageGroups = {
      "14-15": { total: 0, withArrhythmia: 0 },
      "17-18": { total: 0, withArrhythmia: 0 },
      "20-40": { total: 0, withArrhythmia: 0 },
      "40-50": { total: 0, withArrhythmia: 0 },
      "50-60": { total: 0, withArrhythmia: 0 },
      "60+": { total: 0, withArrhythmia: 0 },
    };

    data.forEach((record) => {
      const hasArrhythmia = record.ecgDescription.toLowerCase().includes("аритмия");
      let groupKey: keyof typeof ageGroups;

      if (record.age >= 14 && record.age <= 15) groupKey = "14-15";
      else if (record.age >= 17 && record.age <= 18) groupKey = "17-18";
      else if (record.age >= 20 && record.age <= 40) groupKey = "20-40";
      else if (record.age >= 40 && record.age <= 50) groupKey = "40-50";
      else if (record.age >= 50 && record.age <= 60) groupKey = "50-60";
      else groupKey = "60+";

      ageGroups[groupKey].total++;
      if (hasArrhythmia) ageGroups[groupKey].withArrhythmia++;
    });

    setGraphData({
      labels: Object.keys(ageGroups),
      datasets: [
        {
          label: "С аритмией",
          data: Object.values(ageGroups).map((group) => group.withArrhythmia),
          backgroundColor: "#56324b",
        },
        {
          label: "Без аритмии",
          data: Object.values(ageGroups).map((group) => group.total - group.withArrhythmia),
          backgroundColor: "#B784A7",
          borderWidth: 1,
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
          padding: 10,
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
              return typeof dataValue === "number" ? dataValue : 0;
            })
            .reduce((sum, val) => sum + val, 0);

          if (total === 0) return "";

          const percentage = ((value / total) * 100).toFixed(1);
          return percentage === "0.0" ? "" : `${percentage}%`;
        },
        offset: -5,
        font: {
          size: 12,
          weight: "bold",
        },
        color: "#333",
      },
    },
    layout: {
      padding: {
        top: 20,
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
          text: "Возраст",
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
    <div className="graph-container-v3">
      <h2 className="graph-title">Аритмия в разрезе возраста</h2>

      {!ecgData.length ? (
        <p className="no-data-label" style={{ color: "#000" }}>Нет данных для отображения.</p>
      ) : !graphData ? (
        <p>Обработка данных...</p>
      ) : (
        <div className="graph-display">
          <Bar data={graphData} options={options} plugins={[ChartDataLabels]} />
        </div>
      )}
    </div>
  );
};

export default GraphSix;
