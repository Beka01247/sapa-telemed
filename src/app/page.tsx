"use client";

import React, { useState, useEffect } from "react";
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
import GraphFive from "@/components/GraphFive";
import GraphSix from "@/components/GraphSix";

import PatientDetailsList from "@/components/PatientDetailsList";

interface ECGData {
  ecgDate: string;
  bDate: string;
  monitorSN: string;
  fio: string;
  sex: string;
  iin: string;
  ecgDescription: string;
  recordedBy: string;
  recordedById: string | null;
  recordedByOrg: string;
  recordedByOrgId: string | null;
  diagnosedBy: string;
  diagnosedById: string | null;
  diagnosedByOrg: string;
  ecgLink: string;
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

    const formattedDateFrom = dateFrom.split("-").reverse().join("-");
    const formattedDateTo = dateTo.split("-").reverse().join("-");

    const token = await fetchToken();
    if (!token) {
      alert("Failed to fetch authorization token");
      return;
    }

    setIsLoading(true);
    setEcgData(null);

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

  const calculateAge = (birthDate: string): number => {
    const birthYear = parseInt(birthDate.split("/")[2], 10);
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  // Transform data to include age
  const transformedData = ecgData
    ? ecgData.map((item) => ({
        age: calculateAge(item.bDate),
        ecgDescription: item.ecgDescription,
      }))
    : [];

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>ЭКГ-скриннинг "SapaTelemed"</h1>

      <div className={styles.selectorContainer}>
        <RegionOrganizationSelector
          region={region}
          setRegion={setRegion}
          organization={organization}
          setOrganization={setOrganization}
        />

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
                dateTo ? new Date(dateTo.split("-").reverse().join("-")) : null
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

        <button
          className={styles.fetchButton}
          onClick={fetchAllGraphsData}
          disabled={isLoading}
        >
          {isLoading ? "Загрузка..." : "Получить результаты"}
        </button>
      </div>

      {isLoading && (
        <div className={styles.loadingSpinnerContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Загрузка данных...</p>
        </div>
      )}
      {ecgData && !isLoading && (
        <h2 className={styles.sectionTitle}>Общее</h2>
      )}
      {ecgData && !isLoading && (
        <div className={styles.allGraphsContainer}>
          <div className={styles.graphCard}>
            <GraphFive ecgData={ecgData} />
          </div>
          <div className={styles.graphCard}>
            <GraphSix ecgData={transformedData} />
          </div>
        </div>
      )}

      {ecgData && !isLoading &&(
      <h2 className={styles.sectionTitle}>Детально</h2>
      )}
      
      {ecgData && !isLoading &&(
        <div className={styles.allGraphsContainer}>
          <div className={styles.graphCard}>
            <GraphOne ecgData={ecgData} />
          </div>
          <div className={styles.graphCard}>
            <GraphTwo ecgData={ecgData} />
          </div>
          <div className={styles.graphCard}>
            <GraphThree ecgData={ecgData} />
          </div>
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

      {!isLoading && !ecgData && (
        <p className={styles.noDataMessage}>
          Пожалуйста, выберите параметры и нажмите "Получить результаты".
        </p>
      )}
    </div>
  );
}
