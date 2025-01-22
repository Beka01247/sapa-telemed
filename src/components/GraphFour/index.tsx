import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
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
    const blnpgCounts = { ПБЛНПГ: 0, НБЛНПГ: 0 };
    const brnpgCounts = { ПБПНПГ: 0, НБПНПГ: 0 };

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

    const totalBLNPG = blnpgCounts["ПБЛНПГ"] + blnpgCounts["НБЛНПГ"];
    const totalBRNPG = brnpgCounts["ПБПНПГ"] + brnpgCounts["НБПНПГ"];
    const totalOverall = totalBLNPG + totalBRNPG;

    const blnpgPercentage = totalOverall > 0 ? ((totalBLNPG / totalOverall) * 100).toFixed(1) : "0";
    const brnpgPercentage = totalOverall > 0 ? ((totalBRNPG / totalOverall) * 100).toFixed(1) : "0";

    setChartDataBLNPG({
      labels: ["ПБЛНПГ", "НБЛНПГ"], // Smaller labels without percentages
      datasets: [
        {
          label: "БЛНПГ",
          data: [blnpgCounts["ПБЛНПГ"], blnpgCounts["НБЛНПГ"]],
          backgroundColor: ["#f44336", "#4caf50"],
        },
      ],
      overallPercentage: blnpgPercentage, // Overall percentage
    });

    setChartDataBRNPG({
      labels: ["ПБПНПГ", "НБПНПГ"], // Smaller labels without percentages
      datasets: [
        {
          label: "БПНПГ",
          data: [brnpgCounts["ПБПНПГ"], brnpgCounts["НБПНПГ"]],
          backgroundColor: ["#f44336", "#1E88E5"],
        },
      ],
      overallPercentage: brnpgPercentage, // Overall percentage
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
            <h3>БЛНПГ ({chartDataBLNPG?.overallPercentage}%)</h3>
            <Doughnut
              data={chartDataBLNPG}
              options={{
                plugins: {
                  legend: {
                    position: "top",
                  },
                  datalabels: {
                    display: true,
                    formatter: (value, context) => {
                      const total = context.dataset.data
                        .filter((val): val is number => typeof val === "number")
                        .reduce((sum, val) => sum + val, 0);

                      if (total === 0) return "";
                      const percentage = ((value / total) * 100).toFixed(1);
                      return `${percentage}%`;
                    },
                    color: "#000",
                    font: {
                      size: 14,
                      weight: "bold",
                    },
                  },
                },
              }}
              plugins={[ChartDataLabels]}
            />
          </div>
          <div className="section">
            <h3>БПНПГ ({chartDataBRNPG?.overallPercentage}%)</h3>
            <Doughnut
              data={chartDataBRNPG}
              options={{
                plugins: {
                  legend: {
                    position: "top",
                  },
                  datalabels: {
                    display: true,
                    formatter: (value, context) => {
                      const total = context.dataset.data
                        .filter((val): val is number => typeof val === "number")
                        .reduce((sum, val) => sum + val, 0);

                      if (total === 0) return "";
                      const percentage = ((value / total) * 100).toFixed(1);
                      return `${percentage}%`;
                    },
                    color: "#000",
                    font: {
                      size: 14,
                      weight: "bold",
                    },
                  },
                },
              }}
              plugins={[ChartDataLabels]}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphFour;
