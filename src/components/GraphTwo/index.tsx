import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./GraphTwo.css";

interface ECGData {
  ecgDescription: string;
}

interface GraphTwoProps {
  ecgData: ECGData[];
}

const GraphTwo: React.FC<GraphTwoProps> = ({ ecgData }) => {
  const [graphData, setGraphData] = useState<any>(null);

  useEffect(() => {
    if (!ecgData) return;
    processGraphData(ecgData);
  }, [ecgData]);

  const processGraphData = (data: ECGData[]) => {
    const rhythmCounts: Record<string, number> = {
      "AV блокада": 0,
      "БНП": 0,
      "Синусовая брадикардия": 0,
      "Синусовая тахикардия": 0,
      "ФП": 0,
      "Экстрасистолы": 0,
      "CLC": 0,
      "Синдром WPW": 0,
      "LongQT": 0,
      "Пароксизмальная ЖТ": 0,
      "Пароксизмальная НЖТ": 0,
    };
  
    data.forEach((record) => {
      const desc = record.ecgDescription.toLowerCase();
  
      Object.keys(rhythmCounts).forEach((condition) => {
        if (desc.includes(condition.toLowerCase())) {
          rhythmCounts[condition]++;
        }
      });
    });
  
    const totalCases = Object.values(rhythmCounts).reduce((sum, count) => sum + count, 0);
    const labels = Object.keys(rhythmCounts); // Clean labels without percentages
    const counts = Object.values(rhythmCounts);
  
    setGraphData({
      labels: labels, // No percentages in the labels
      datasets: [
        {
          label: "Количество случаев",
          data: counts,
          backgroundColor: [
            "#ff6f61",
            "#6a1b9a",
            "#00c853",
            "#00b8d4",
            "#ffab00",
            "#ffaeae",
            "#4a148c",
            "#2e7d32",
            "#01579b",
            "#c6ff00",
            "#3e2723",
          ],
          borderWidth: 1,
          borderColor: "#fff",
          hoverBorderColor: "#000",
        },
      ],
    });
  };
  
  return (
    <div className="graph-container">
      <h2 className="graph-title">Выявленные аритмии</h2>
  
      {!ecgData.length ? (
        <p className="no-data-label">Нет данных для отображения.</p>
      ) : !graphData ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <p>Обработка данных...</p>
        </div>
      ) : (
        <div className="graph-display">
          <Bar
            data={graphData}
            options={{
              plugins: {
                legend: {
                  display: false, // Remove legend if not needed
                },
                tooltip: {
                  backgroundColor: "#ffffff",
                  titleColor: "#333",
                  bodyColor: "#4F4F4F",
                  borderColor: "#e0e0e0",
                  borderWidth: 1,
                },
                datalabels: {
                  display: true, // Enable percentage labels
                  align: "top",
                  anchor: "end",
                  offset: -5, // Increase offset to avoid overlap with bars
                  formatter: (value, context) => {
                    const total = context.chart.data.datasets[0].data
                      .map((val) => (typeof val === "number" ? val : 0)) // Ensure only numeric values
                      .reduce((sum, val) => sum + val, 0); // Safely sum up numbers
                
                    if (total === 0) return ""; // Skip if total is 0 to avoid division by zero
                
                    const percentage = ((value / total) * 100).toFixed(1);
                    const absoluteValue = value; // Get the count itself
                    return `${percentage}% (${absoluteValue})`; // Display percentage and count
                  },
                  font: {
                    size: 10,
                    weight: "bold",
                  },
                  color: "#333",
                },
                
              },
              scales: {
                x: {
                  ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    color: "#4F4F4F",
                    font: {
                      size: 14,
                    },
                  },
                  grid: {
                    display: false, // Hide gridlines on the x-axis
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Количество случаев",
                    font: {
                      size: 16,
                      weight: "bold",
                    },
                    color: "#4F4F4F",
                  },
                  ticks: {
                    color: "#4F4F4F",
                    font: {
                      size: 14,
                    },
                  },
                  grid: {
                    color: "#e0e0e0", // Subtle gridline color
                  },
                },
              },
              maintainAspectRatio: false, // Make the chart responsive
            }}
            plugins={[ChartDataLabels]} // Add ChartDataLabels plugin
            height={400}
            width={800}
          />
        </div>
      )}
    </div>
  );
};

export default GraphTwo;
