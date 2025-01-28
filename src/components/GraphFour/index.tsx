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
  setFilteredPatients: (patients: ECGData[] | null) => void; // Pass filtered data to parent
}

const GraphFour: React.FC<GraphFourProps> = ({ ecgData, setFilteredPatients }) => {
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
      labels: ["ПБЛНПГ", "НБЛНПГ"],
      datasets: [
        {
          data: [blnpgCounts["ПБЛНПГ"], blnpgCounts["НБЛНПГ"]],
          backgroundColor: ["#FF6384", "#36A2EB"],
          hoverBackgroundColor: ["#FF80A4", "#64B6F2"],
          borderWidth: 2,
          cutout: "0%",
        },
      ],
      overallPercentage: blnpgPercentage,
    });

    setChartDataBRNPG({
      labels: ["ПБПНПГ", "НБПНПГ"],
      datasets: [
        {
          data: [brnpgCounts["ПБПНПГ"], brnpgCounts["НБПНПГ"]],
          backgroundColor: ["#FFCD56", "#4BC0C0"],
          hoverBackgroundColor: ["#FFE08A", "#72D7D7"],
          borderWidth: 2,
          cutout: "0%",
        },
      ],
      overallPercentage: brnpgPercentage,
    });
  };

  const handleSliceClick = (elements: any, chartData: any, side: string) => {
    if (elements.length === 0) return;
  
    const index = elements[0].index; // Get the index of the clicked slice
    const label = chartData.labels[index]; // Get the label of the slice (e.g., "ПБЛНПГ")
  
    // Filter ecgData based on the clicked label
    const filteredPatients = ecgData.filter((record) => {
      const desc = record.ecgDescription.toLowerCase();
      if (side === "BLNPG") {
        if (label === "ПБЛНПГ" && desc.includes("полная блокада левой ножки пучка гиса")) return true;
        if (label === "НБЛНПГ" && desc.includes("неполная блокада левой ножки пучка гиса")) return true;
      } else if (side === "BRNPG") {
        if (label === "ПБПНПГ" && desc.includes("полная блокада правой ножки пучка гиса")) return true;
        if (label === "НБПНПГ" && desc.includes("неполная блокада правой ножки пучка гиса")) return true;
      }
      return false;
    });
  
    // Map the label as severity for display in the status column
    const labeledPatients = filteredPatients.map((patient) => ({
      ...patient,
      severity: label, // Set the label as the severity
    }));
  
    setFilteredPatients(labeledPatients); // Pass filtered and labeled data to the table
  };
  

  return (
    <div className="graph-container">
      <h2 className="graph-title" style={{ marginBottom: "1rem" }}>
        Нарушение внутрижелудочковой проводимости
      </h2>

      {!ecgData.length ? (
        <p className="no-data-label" style={{ color: "#888" }}>Нет данных для отображения.</p>
      ) : !chartDataBLNPG || !chartDataBRNPG ? (
        <p style={{ color: "#888" }}>Обработка данных...</p>
      ) : (
        <div className="graph-display" style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
          <div className="section" style={{ textAlign: "center", width: "45%" }}>
            <h3 style={{ color: "#000", fontWeight: "bold", marginBottom: "1rem" }}>
              БЛНПГ ({chartDataBLNPG?.overallPercentage}%)
            </h3>
            <Doughnut
              data={chartDataBLNPG}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                    labels: {
                      font: {
                        size: 14,
                        weight: "bold",
                      },
                      color: "#555",
                    },
                  },
                  datalabels: {
                    display: true,
                    formatter: (value, context) => {
                      const total = context.dataset.data
                        .filter((val): val is number => typeof val === "number")
                        .reduce((sum, val) => sum + val, 0);

                      if (total === 0) return "";
                      const percentage = ((value / total) * 100).toFixed(1);
                      return `${percentage}% (${value})`;
                    },
                    color: "#000",
                    font: {
                      size: 14,
                      weight: "bold",
                    },
                  },
                },
                onClick: (event, elements) => handleSliceClick(elements, chartDataBLNPG, "BLNPG"),
              }}
              plugins={[ChartDataLabels]}
            />
          </div>
          <div className="section" style={{ textAlign: "center", width: "45%" }}>
            <h3 style={{ color: "#000", fontWeight: "bold", marginBottom: "1rem" }}>
              БПНПГ ({chartDataBRNPG?.overallPercentage}%)
            </h3>
            <Doughnut
              data={chartDataBRNPG}
              options={{
                plugins: {
                  legend: {
                    display: true,
                    position: "top",
                    labels: {
                      font: {
                        size: 14,
                        weight: "bold",
                      },
                      color: "#555",
                    },
                  },
                  datalabels: {
                    display: true,
                    formatter: (value, context) => {
                      const total = context.dataset.data
                        .filter((val): val is number => typeof val === "number")
                        .reduce((sum, val) => sum + val, 0);

                      if (total === 0) return "";
                      const percentage = ((value / total) * 100).toFixed(1);
                      return `${percentage}% (${value})`;
                    },
                    color: "#000",
                    font: {
                      size: 14,
                      weight: "bold",
                    },
                  },
                },
                onClick: (event, elements) => handleSliceClick(elements, chartDataBRNPG, "BRNPG"),
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
