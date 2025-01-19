import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import "./GraphFour.css";

interface ECGData {
  ecgDescription: string;
}

interface GraphFourProps {
  ecgData: ECGData[];
}

const GraphFour: React.FC<GraphFourProps> = ({ ecgData }) => {
  const [chartDataBLNPG, setChartDataBLNPG] = useState<any>(null);
  const [chartDataBRNPG, setChartDataBRNPG] = useState<any>(null);

  useEffect(() => {
    if (!ecgData) return;
    processGraphData(ecgData);
  }, [ecgData]);

  const processGraphData = (data: ECGData[]) => {
    const blnpgCounts = { ПБЛНПГ: 0, НБЛНПГ: 0 }; // "Полная" vs "Неполная" блокада левой ножки
    const brnpgCounts = { ПБПНПГ: 0, НБПНПГ: 0 }; // "Полная" vs "Неполная" блокада правой ножки

    data.forEach((record) => {
      const desc = record.ecgDescription.toLowerCase();
      if (desc.includes("полная блокада левой ножки пучка гиса")) {
        blnpgCounts["ПБЛНПГ"]++;
      } 
      if (desc.includes("неполная блокада левой ножки пучка гиса")) {
        blnpgCounts["НБЛНПГ"]++;
      }
      if (desc.includes("полная блокада правой ножки пучка гиса")) {
        brnpgCounts["ПБПНПГ"]++;
      }
      if (desc.includes("неполная блокада правой ножки пучка гиса")) {
        brnpgCounts["НБПНПГ"]++;
      }
    });

    setChartDataBLNPG({
      labels: ["ПБЛНПГ", "НБЛНПГ"],
      datasets: [
        {
          label: "БЛНПГ",
          data: [blnpgCounts["ПБЛНПГ"], blnpgCounts["НБЛНПГ"]],
          backgroundColor: ["#f44336", "#4caf50"],
        },
      ],
    });

    setChartDataBRNPG({
      labels: ["ПБПНПГ", "НБПНПГ"],
      datasets: [
        {
          label: "БПНПГ",
          data: [brnpgCounts["ПБПНПГ"], brnpgCounts["НБПНПГ"]],
          backgroundColor: ["#f44336", "#1E88E5"],
        },
      ],
    });
  };

  return (
    <div className="graph-container">
      <h2 className="graph-title">Нарушение внутрижелудочковой проводимости</h2>

      {!ecgData.length ? (
        <p className="no-data-label">Нет данных для отображения.</p>
      ) : !chartDataBLNPG || !chartDataBRNPG ? (
        <p>Обработка данных...</p>
      ) : (
        <div className="graph-display">
          <div className="section">
            <h3>БЛНПГ</h3>
            <Doughnut data={chartDataBLNPG} />
          </div>
          <div className="section">
            <h3>БПНПГ</h3>
            <Doughnut data={chartDataBRNPG} />
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphFour;
