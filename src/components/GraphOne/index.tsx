import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import "./GraphOne.css";
import RegionOrganizationSelector from "@/components/RegionOrganizationSelector";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";

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
  region: number | null;
  setRegion: (region: number | null) => void;
  organization: string;
  setOrganization: (organization: string) => void;
  dateFrom: string;
  setDateFrom: (date: string) => void;
  dateTo: string;
  setDateTo: (date: string) => void;
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

const GraphOne: React.FC<GraphOneProps> = ({
  region,
  setRegion,
  organization,
  setOrganization,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
}) => {
  const [graphData, setGraphData] = useState<GraphData | null>(null);
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
    const dateCounts: Record<
      string,
      { green: number; yellow: number; red: number }
    > = {};

    // Normalize conditions for case-insensitive matching
    const redConditionsLower = redConditions.map((condition) =>
      condition.toLowerCase()
    );
    const yellowConditionsLower = yellowConditions.map((condition) =>
      condition.toLowerCase()
    );

    data.forEach((record) => {
      const date = record.ecgDate.split("T")[0];
      const ecgDescriptionLower = record.ecgDescription.toLowerCase(); // Normalize description

      if (!dateCounts[date]) {
        dateCounts[date] = { green: 0, yellow: 0, red: 0 };
      }

      if (
        redConditionsLower.some((condition) =>
          ecgDescriptionLower.includes(condition)
        )
      ) {
        dateCounts[date].red++;
      } else if (
        yellowConditionsLower.some((condition) =>
          ecgDescriptionLower.includes(condition)
        )
      ) {
        dateCounts[date].yellow++;
      } else {
        dateCounts[date].green++;
      }
    });

    const labels = Object.keys(dateCounts);
    const greenData = labels.map((label) => dateCounts[label].green);
    const yellowData = labels.map((label) => dateCounts[label].yellow);
    const redData = labels.map((label) => dateCounts[label].red);

    setGraphData({
      labels,
      datasets: [
        {
          label: "Зеленый - В Норме",
          data: greenData,
          backgroundColor: "#4caf50",
        },
        {
          label: "Желтый - Есть осложнения",
          data: yellowData,
          backgroundColor: "#ffeb3b",
        },
        {
          label: "Красный - Плохо",
          data: redData,
          backgroundColor: "#f44336",
        },
      ],
    });
  };

  return (
    <div className="graph-container">
      <h1 className="graph-title">Аналитика ЭКГ скрининга</h1>
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
          {isLoading ? "Загрузка..." : "Результаты"}
        </button>
      </form>

      {isLoading ? (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <p>Загрузка данных...</p>
        </div>
      ) : graphData ? (
        <div className="graph-display">
          <Bar data={graphData} />
        </div>
      ) : (
        <p className="no-data-message">
          Пожалуйста, выберите параметры и обновите данные.
        </p>
      )}
    </div>
  );
};

export default GraphOne;
