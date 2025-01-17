import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

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
    else {
      console.log("i have token: ", token)
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

      // Example logic for categorizing data into colors
      if (record.ecgDescription === 'OK') {
        dateCounts[date].green++;
      } else if (record.ecgDescription === 'Not So Good') {
        dateCounts[date].yellow++;
      } else {
        dateCounts[date].red++;
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
          label: 'Green - OK',
          data: greenData,
          backgroundColor: 'green',
        },
        {
          label: 'Yellow - Not So Good',
          data: yellowData,
          backgroundColor: 'yellow',
        },
        {
          label: 'Red - Not OK',
          data: redData,
          backgroundColor: 'red',
        },
      ],
    });
  };

  return (
    <div>
      <h1>Graph One</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchData();
        }}
      >
        <div>
          <label htmlFor="orgId">Organization ID:</label>
          <input
            type="text"
            id="orgId"
            value={orgId}
            onChange={(e) => setOrgId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateFrom">Date From:</label>
          <input
            type="date"
            id="dateFrom"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dateTo">Date To:</label>
          <input
            type="date"
            id="dateTo"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {graphData && (
        <div style={{ width: '80%', margin: '0 auto' }}>
          <Bar data={graphData} />
        </div>
      )}
    </div>
  );
};

export default GraphOne;
