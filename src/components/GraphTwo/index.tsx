import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import RegionOrganizationSelector from "@/components/RegionOrganizationSelector";
import "./GraphTwo.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";

interface ECGData {
  ecgDescription: string;
}

interface GraphTwoProps {
  region: number | null;
  setRegion: (region: number | null) => void;
  organization: string;
  setOrganization: (organization: string) => void;
  dateFrom: string;
  setDateFrom: (date: string) => void;
  dateTo: string;
  setDateTo: (date: string) => void;
}

const GraphTwo: React.FC<GraphTwoProps> = ({
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      setErrorMessage("Не удалось получить токен авторизации.");
      return null;
    }
  };

  const fetchData = async (): Promise<void> => {
    if (!organization || !dateFrom || !dateTo) {
      alert("Пожалуйста, выберите регион, организацию и дату.");
      return;
    }

    const formattedDateFrom = dateFrom.split("-").reverse().join("-");
    const formattedDateTo = dateTo.split("-").reverse().join("-");

    const token = await fetchToken();
    if (!token) {
      alert("Failed to fetch authorization token");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.get<ECGData[]>(
        `https://client.sapatelemed.kz/ecgList/api/ECGResults/${organization}/${formattedDateFrom}/${formattedDateTo}`,
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
    const rhythmCounts: Record<string, number> = {
      "AV блокада": 0,
      БНП: 0,
      "Синусовая брадикардия": 0,
      "Синусовая тахикардия": 0,
      ФП: 0,
      Экстрасистолы: 0,
      CLC: 0,
      "Синдром WPW": 0,
      LongQT: 0,
      "Пароксизмальная ЖТ": 0,
      "Пароксизмальная НЖТ": 0,
    };

    data.forEach((record) => {
      const { ecgDescription } = record;

      const description = ecgDescription.toLowerCase();
      Object.keys(rhythmCounts).forEach((condition) => {
        if (description.includes(condition.toLowerCase())) {
          rhythmCounts[condition]++;
        }
      });
    });

    const totalCases = Object.values(rhythmCounts).reduce(
      (sum, count) => sum + count,
      0
    );
    const labels = Object.keys(rhythmCounts);
    const counts = Object.values(rhythmCounts);

    setGraphData({
      labels: labels.map(
        (label, index) =>
          `${label} (${((counts[index] / totalCases) * 100).toFixed(1)}%)`
      ),
      datasets: [
        {
          label: "Нарушения ритма сердца",
          data: counts,
          backgroundColor: "#1E88E5",
        },
      ],
    });
  };

  return (
    <div className="graph-container">
      <h1 className="graph-title">Нарушения ритма сердца</h1>

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
              selected={
                dateFrom
                  ? new Date(dateFrom.split("-").reverse().join("-"))
                  : null
              } // Correctly use dateFrom
              onChange={(date: Date | null) => {
                if (date) {
                  const day = date.getDate().toString().padStart(2, "0");
                  const month = (date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const year = date.getFullYear();
                  setDateFrom(`${day}-${month}-${year}`);
                } else {
                  setDateFrom("");
                }
              }}
              dateFormat="dd-MM-yyyy"
              locale={ru}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateTo">До (дата):</label>
            <DatePicker
              selected={
                dateTo ? new Date(dateTo.split("-").reverse().join("-")) : null
              } // Correctly use dateTo
              onChange={(date: Date | null) => {
                if (date) {
                  const day = date.getDate().toString().padStart(2, "0");
                  const month = (date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0");
                  const year = date.getFullYear();
                  setDateTo(`${day}-${month}-${year}`);
                } else {
                  setDateTo("");
                }
              }}
              dateFormat="dd-MM-yyyy"
              locale={ru}
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
      ) : errorMessage ? (
        <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>
      ) : graphData ? (
        <div className="graph-display">
          <Bar
            data={graphData}
            options={{
              plugins: {
                legend: {
                  display: false,
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
            }}
          />
        </div>
      ) : (
        <p className="no-data-message">
          Пожалуйста, выберите параметры и обновите данные.
        </p>
      )}
    </div>
  );
};

export default GraphTwo;
