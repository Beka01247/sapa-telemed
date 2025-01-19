"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";

import RegionOrganizationSelector from "@/components/RegionOrganizationSelector";
import GraphOne from "@/components/GraphOne";
import GraphTwo from "@/components/GraphTwo";
import GraphThree from "@/components/GraphThree";
import GraphFour from "@/components/GraphFour";
import PatientDetailsList from "@/components/PatientDetailsList";

interface ECGData {
  ecgDate: string;
  ecgDescription: string;
}

export default function Home() {
  const [region, setRegion] = useState<number | null>(null);
  const [organization, setOrganization] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ecgData, setEcgData] = useState<ECGData[] | null>(null);

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

  const fetchAllGraphsData = async (): Promise<void> => {
    if (!organization || !dateFrom || !dateTo) {
      alert("Пожалуйста, выберите регион, организацию и дату.");
      return;
    }

    // Convert dd-MM-yyyy => yyyy-MM-dd
    const formattedDateFrom = dateFrom.split("-").reverse().join("-");
    const formattedDateTo = dateTo.split("-").reverse().join("-");

    const token = await fetchToken();
    if (!token) {
      alert("Failed to fetch authorization token");
      return;
    }

    setIsLoading(true);
    setEcgData(null); // Reset existing data

    try {
      const response = await axios.get<ECGData[]>(
        `https://client.sapatelemed.kz/ecgList/api/ECGResults/${organization}/${formattedDateFrom}/${formattedDateTo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEcgData(response.data);
    } catch (error) {
      console.error("Error fetching ECG data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>Результаты телеметрии Sapa Telemed</h1>

      <div className={styles.selectorContainer}>
        {/* Region / Organization Selector */}
        <RegionOrganizationSelector
          region={region}
          setRegion={setRegion}
          organization={organization}
          setOrganization={setOrganization}
        />

        {/* Date Range Pickers */}
        <div className={styles.datePickers}>
          <div className={styles.datePickers}>
            <div className={styles.datePickerItem}>
              <label className={styles.datePickerLabel}>От (дата):</label>
              <DatePicker
                selected={
                  dateFrom
                    ? new Date(dateFrom.split("-").reverse().join("-"))
                    : null
                }
                onChange={(date: Date | null) => {
                  if (date) {
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear();
                    setDateFrom(`${day}-${month}-${year}`);
                  } else {
                    setDateFrom("");
                  }
                }}
                dateFormat="dd-MM-yyyy"
                locale={ru}
                className={styles.datePickerInput}
              />
            </div>

            <div className={styles.datePickerItem}>
              <label className={styles.datePickerLabel}>До (дата):</label>
              <DatePicker
                selected={
                  dateTo
                    ? new Date(dateTo.split("-").reverse().join("-"))
                    : null
                }
                onChange={(date: Date | null) => {
                  if (date) {
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear();
                    setDateTo(`${day}-${month}-${year}`);
                  } else {
                    setDateTo("");
                  }
                }}
                dateFormat="dd-MM-yyyy"
                locale={ru}
                className={styles.datePickerInput}
              />
            </div>
          </div>
        </div>

        {/* Fetch Data Button */}
        <button
          className={styles.fetchButton}
          onClick={fetchAllGraphsData}
          disabled={isLoading}
        >
          {isLoading ? "Загрузка..." : "Получить результаты"}
        </button>
      </div>

      {/* Loading indicator */}
      {isLoading && (
        <div className={styles.loadingSpinnerContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Загрузка данных...</p>
        </div>
      )}

      {/* If data is fetched, show all four graphs */}
      {ecgData && !isLoading && (
        <div className={styles.allGraphsContainer}>
          {/* Graph 1 */}
          <div className={styles.graphCard}>
            <GraphOne ecgData={ecgData} />
          </div>

          {/* Graph 2 */}
          <div className={styles.graphCard}>
            <GraphTwo ecgData={ecgData} />
          </div>

          {/* Graph 3 */}
          <div className={styles.graphCard}>
            <GraphThree ecgData={ecgData} />
          </div>

          {/* Graph 4 */}
          <div className={styles.graphCard}>
            <GraphFour ecgData={ecgData} />
          </div>
        </div>
      )}

      {ecgData && !isLoading && (
        <div className={styles.patientListWrapper}>
          <PatientDetailsList ecgData={ecgData} />
        </div>
      )}

      {/* If no data and not loading, show placeholder */}
      {!isLoading && !ecgData && (
        <p className={styles.noDataMessage}>
          Пожалуйста, выберите параметры и нажмите "Получить результаты".
        </p>
      )}
    </div>
  );
}
