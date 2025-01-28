import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./GraphThree.css";

interface ECGData {
  ecgDescription: string;
}

interface GraphThreeProps {
  ecgData: ECGData[];
  setFilteredPatients: (patients: any[] | null) => void;
}

const GraphThree: React.FC<GraphThreeProps> = ({ ecgData, setFilteredPatients }) => {
  const [graphData, setGraphData] = useState<any>(null);

  useEffect(() => {
    if (!ecgData) return;
    processGraphData(ecgData);
  }, [ecgData]);

  const processGraphData = (data: ECGData[]) => {
    const blockCounts: Record<string, number> = {
      "I ст": 0,
      "II ст": 0,
      "III ст": 0,
    };
  
    data.forEach((record) => {
      const desc = record.ecgDescription.toLowerCase();
  
      // Assign patients to the highest-priority condition they match
      if (desc.includes("iii ст")) {
        blockCounts["III ст"]++;
      } else if (desc.includes("ii ст")) {
        blockCounts["II ст"]++;
      } else if (desc.includes("i ст")) {
        blockCounts["I ст"]++;
      }
    });
  
    setGraphData({
      labels: Object.keys(blockCounts),
      datasets: [
        {
          label: "Атриовентрикулярная блокада",
          data: Object.values(blockCounts),
          backgroundColor: "#9C27B0", // Purple
        },
      ],
    });
  };
  

  const handleBarClick = (elements: any) => {
    if (elements.length === 0) return; // No bar clicked, do nothing
  
    const index = elements[0].index; // Get the clicked bar's index
    const label = graphData.labels[index]; // Retrieve the label for the bar
  
    // Filter only if there are matching patients
    const filtered = ecgData.filter((record) =>
      record.ecgDescription.toLowerCase().includes(label.toLowerCase())
    );
  
    // Prevent infinite state updates by checking if the filtered data has changed
    if (filtered.length > 0) {
      setFilteredPatients(filtered.map((record) => ({ ...record, severity: label })));
    }
  };
  
  
  

  return (
    <div className="graph-container">
      <h2 className="graph-title" style={{ marginBottom: "1rem" }}>АВ-блокада</h2>
   

      {!ecgData.length ? (
        <p className="no-data-label">Нет данных для отображения.</p>
      ) : !graphData ? (
        <p>Обработка данных...</p>
      ) : (
        <div className="graph-display">
          <Bar
  data={graphData}
  options={{
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "#ffffff",
        titleColor: "#333",
        bodyColor: "#4F4F4F",
        borderColor: "#e0e0e0",
        borderWidth: 1,
      },
      datalabels: {
        display: true, // Enable percentage and number labels
        align: "top",
        anchor: "end",
        offset: -8, // Space between label and bar
        formatter: (value, context) => {
          const total = context.chart.data.datasets[0].data
            .map((val) => (typeof val === "number" ? val : 0)) // Ensure numeric values
            .reduce((sum, val) => sum + val, 0); // Calculate total cases

          if (total === 0) return ""; // Skip if total is 0 to avoid division by zero

          const percentage = ((value / total) * 100).toFixed(1);
          return `${percentage}% (${value})`; // Show percentage and number
        },
        font: {
          size: 12,
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
        },
      },
      y: {
        title: {
          display: true,
          text: "Количество случаев",
        },
      },
    },
    onClick: (event, elements) => handleBarClick(elements),
  }}
  plugins={[ChartDataLabels]} // Register datalabels plugin
/>

        </div>
      )}
    </div>
  );
};

export default GraphThree;
