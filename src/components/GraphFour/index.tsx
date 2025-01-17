import React, { useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import RegionOrganizationSelector from "@/components/RegionOrganizationSelector";
import "./GraphFour.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface ECGData {
  ecgDescription: string;
}

interface GraphFourProps {
  region: number | null;
  setRegion: (region: number | null) => void;
  organization: string;
  setOrganization: (organization: string) => void;
  dateFrom: string;
  setDateFrom: (date: string) => void;
  dateTo: string;
  setDateTo: (date: string) => void;
}

const GraphFour: React.FC<GraphFourProps> = ({
  region,
  setRegion,
  organization,
  setOrganization,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
}) => {
  const [graphData, setGraphData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchToken = async (): Promise<string | null> => {
    try {
      const response = await axios.post(
        "https://client.sapatelemed.kz/ecgList/token",
        null,
        {
          params: {
            username: "webStat",
            password: "QupiyaSozWebPageBirBir",
          },
        }
      );
      return response.data.access_token;
    } catch (error) {
      console.error("Error fetching token:", error);
      return null;
    }
  };

  const fetchData = async (): Promise<void> => {
    if (!organization || !dateFrom || !dateTo) {
      alert("Пожалуйста, выберите регион, организацию и дату.");
      return;
    }

    const token = await fetchToken();
    if (!token) {
      alert("Failed to fetch authorization token");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get<ECGData[]>(
        `https://client.sapatelemed.kz/ecgList/api/ECGResults/${organization}/${dateFrom}/${dateTo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      processGraphData(response.data);
    } catch (error) {
      console.error("Error fetching ECG data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const processGraphData = (data: ECGData[]): void => {
    const blnpgCounts = {
      ПБЛНПГ: 0,
      НБЛНПГ: 0,
    };

    const brnpgCounts = {
      ПБПНПГ: 0,
      НБПНПГ: 0,
    };

    data.forEach((record) => {
      const ecgDescription = record.ecgDescription.toLowerCase();

      if (ecgDescription.includes("полная блокада левой ножки пучка гиса"))
        blnpgCounts["ПБЛНПГ"]++;
      if (ecgDescription.includes("неполная блокада левой ножки пучка гиса"))
        blnpgCounts["НБЛНПГ"]++;

      if (ecgDescription.includes("полная блокада правой ножки пучка гиса"))
        brnpgCounts["ПБПНПГ"]++;
      if (ecgDescription.includes("неполная блокада правой ножки пучка гиса"))
        brnpgCounts["НБПНПГ"]++;
    });

    const blnpgTotal = blnpgCounts["ПБЛНПГ"] + blnpgCounts["НБЛНПГ"];
    const brnpgTotal = brnpgCounts["ПБПНПГ"] + brnpgCounts["НБПНПГ"];

    setGraphData({
      blnpg: {
        labels: ["ПБЛНПГ", "НБЛНПГ"],
        datasets: [
          {
            label: "БЛНПГ",
            data: [blnpgCounts["ПБЛНПГ"], blnpgCounts["НБЛНПГ"]],
            backgroundColor: ["#f44336", "#4caf50"],
          },
        ],
      },
      brnpg: {
        labels: ["ПБПНПГ", "НБПНПГ"],
        datasets: [
          {
            label: "БПНПГ",
            data: [brnpgCounts["ПБПНПГ"], brnpgCounts["НБПНПГ"]],
            backgroundColor: ["#f44336", "#1E88E5"],
          },
        ],
      },
    });
  };

  return (
    <div className="graph-container">
      <h1 className="graph-title">
        Нарушение внутрижелудочковой проводимости сердца
      </h1>

      <form
        className="graph-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
      >
        <div className="form-group">
          <RegionOrganizationSelector
            region={region}
            setRegion={setRegion}
            organization={organization}
            setOrganization={setOrganization}
          />
        </div>
        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="dateFrom">От (дата):</label>
            <DatePicker
              selected={dateFrom ? new Date(dateFrom) : null}
              onChange={(date: Date | null) =>
                setDateFrom(date ? date.toISOString().split("T")[0] : "")
              }
              dateFormat="dd-MM-yyyy"
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateTo">До (дата):</label>
            <DatePicker
              selected={dateTo ? new Date(dateTo) : null}
              onChange={(date: Date | null) =>
                setDateTo(date ? date.toISOString().split("T")[0] : "")
              }
              dateFormat="dd-MM-yyyy"
              className="form-input"
            />
          </div>
        </div>
        <button type="submit" className="form-button" disabled={isLoading}>
          {isLoading ? "Загрузка..." : "Обновить данные"}
        </button>
      </form>

      {isLoading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <p>Загрузка данных...</p>
        </div>
      ) : graphData ? (
        <div className="graph-display">
          <div className="section">
            <h2>БЛНПГ (Блокада левой ножки пучка Гиса)</h2>
            <div className="pie-chart">
              <Doughnut data={graphData.blnpg} />
            </div>
          </div>
          <div className="section">
            <h2>БПНПГ (Блокада правой ножки пучка Гиса)</h2>
            <div className="pie-chart">
              <Doughnut data={graphData.brnpg} />
            </div>
          </div>
        </div>
      ) : (
        <p className="no-data-message">
          Пожалуйста, выберите параметры и обновите данные.
        </p>
      )}
    </div>
  );
};

export default GraphFour;
