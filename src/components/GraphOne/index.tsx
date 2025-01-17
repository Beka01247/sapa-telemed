import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import './GraphOne.css';
import RegionOrganizationSelector from '@/components/RegionOrganizationSelector';

interface ECGData {
  ecgDate: string;
  bDate: string;
  monitorSN: string;
  fio: string;
  sex: string;
  iin: string;
  ecgDescription: string;
  recordedBy: string;
  recordedByOrg: string;
  diagnosedBy: string;
  diagnosedByOrg: string;
  ecgLink: string;
}

interface GraphData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
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

const greenConditions = [
  "Ритм синусовый. ЧСС 78 уд/мин. Вольтаж достаточный. Нормальное положение электрической оси сердца."
];

const GraphOne: React.FC = () => {
  const [orgId, setOrgId] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string>('');
  const [dateTo, setDateTo] = useState<string>('');
  const [graphData, setGraphData] = useState<GraphData | null>(null);

  const fetchToken = async (): Promise<string | null> => {
    try {
      const config = {
        method: 'post',
        url: 'https://client.sapatelemed.kz/ecgList/token',
        params: {
          username: 'webStat',
          password: 'QupiyaSozWebPageBirBir',
        },
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await axios(config);
      console.log('Token Response:', response.data.access_token);
      return response.data.access_token;
    } catch (error: any) {
      console.error('Error fetching token:', error.response?.data || error.message);
      return null;
    }
  };

  const fetchData = async (): Promise<void> => {
    const token = await fetchToken();
    if (!token) {
      alert('Failed to fetch authorization token');
      return;
    }

    try {
      const response = await axios.get<ECGData[]>(
        `https://client.sapatelemed.kz/ecgList/api/ECGResults/${orgId}/${dateFrom}/${dateTo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      processGraphData(response.data);
    } catch (error) {
      console.error('Error fetching ECG data:', error);
    }
  };

  const processGraphData = (data: ECGData[]): void => {
    const dateCounts: Record<string, { green: number; yellow: number; red: number }> = {};

    data.forEach((record) => {
      const date = record.ecgDate.split('T')[0];
      if (!dateCounts[date]) {
        dateCounts[date] = { green: 0, yellow: 0, red: 0 };
      }

      if (redConditions.some((condition) => record.ecgDescription.includes(condition))) {
        dateCounts[date].red++;
      } else if (greenConditions.some((condition) => record.ecgDescription.includes(condition))) {
        dateCounts[date].green++;
      } else {
        dateCounts[date].yellow++;
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
          label: 'Зеленый - В Норме',
          data: greenData,
          backgroundColor: '#4caf50',
        },
        {
          label: 'Желтый - Есть ослажнения',
          data: yellowData,
          backgroundColor: '#ffeb3b',
        },
        {
          label: 'Красный - Плохо',
          data: redData,
          backgroundColor: '#f44336',
        },
      ],
    });
  };

  return (
    <div className="graph-container">
      <h1 className="graph-title">График реузльтатов ЭКГ</h1>
      <form
        className="graph-form"
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
      >
        <div className="form-group">
          <RegionOrganizationSelector onOrganizationSelect={(id) => setOrgId(id)} />
        </div>
        <div className="form-group">
          <label htmlFor="dateFrom">От (дата):</label>
          <input
            type="date"
            id="dateFrom"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateTo">До (дата):</label>
          <input
            type="date"
            id="dateTo"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">Результаты</button>
      </form>

      {graphData && (
        <div className="graph-display">
          <Bar data={graphData} />
        </div>
      )}
    </div>
  );
};

export default GraphOne;
