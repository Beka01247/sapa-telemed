"use client"
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from "date-fns/locale";

import RegionOrganizationSelector from "@/components/RegionOrganizationSelector";
import { organizations } from "@/components/RegionOrganizationSelector";

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
  severity?: string; // Add severity property
}

function getRegionIdForOrgId(orgId: string): number | null {
  const org = organizations.find((o) => o.site_name === orgId);
  return org ? org.region_id : null;
}

export default function Home() {
  const [region, setRegion] = useState<number | null>(null);
  const [organization, setOrganization] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [showRegionNote, setShowRegionNote] = useState<boolean>(true);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ecgData, setEcgData] = useState<ECGData[] | null>(null);
  const [filteredPatients, setFilteredPatients] = useState<any[] | null>(null);

  const [summary, setSummary] = useState({
    total: 0,
    green: 0,
    yellow: 0,
    orange: 0,
    red: 0,
    black: 0,
    lvh: 0,  
  });

  useEffect(() => {
    if (region !== null) {
      setShowRegionNote(false);
    } else {
      setShowRegionNote(true);
    }
  }, [region]);

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
    if (!dateFrom || !dateTo) {
      alert("Пожалуйста, выберите даты.");
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
    setFilteredPatients(null);

    try {
      let url = "";

      if (organization) {
        url = `https://client.sapatelemed.kz/ecgList/api/ECGResults/${organization}/${formattedDateFrom}/${formattedDateTo}`;
      } else {
        url = `https://client.sapatelemed.kz/ecgList/api/ECGResults/${formattedDateFrom}/${formattedDateTo}`;
      }

      const response = await axios.get<ECGData[]>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      let finalData = response.data;
      if (region && !organization) {
        finalData = response.data.filter((item) => {
          if (!item.recordedByOrgId) return false;
          const itemRegionId = getRegionIdForOrgId(item.recordedByOrgId); 
          return itemRegionId === region;
        });
      }
      setEcgData(finalData);
    } catch (error) {
      console.error("Error fetching ECG data:", error);
      setEcgData(null);  // Reset ECG data on error
    } finally {
      setIsLoading(false);
    }
  };

  // Add an effect to reset data when organization changes
  useEffect(() => {
    setEcgData(null);
    setFilteredPatients(null);
  }, [organization]);

  useEffect(() => {
    if (ecgData) {
      const total = ecgData.length;
      const green = ecgData.filter((patient) => !patient.severity).length;
      const yellow = ecgData.filter((patient) => patient.severity === "yellow").length;
      const orange = ecgData.filter((patient) => patient.severity === "orange").length;
      const red = ecgData.filter((patient) => patient.severity === "red").length;
      const black = ecgData.filter((patient) => patient.severity === "black").length;
      const lvh = ecgData.filter((patient) => patient.severity === "lvh").length;  

      setSummary({ total, green, yellow, orange, red, black, lvh });
    }
  }, [ecgData]);

  const calculateAge = (birthDate: string | null): number => {
    if (!birthDate) {
      return 0; // Return 0 or handle the missing data case appropriately
    }
    const parts = birthDate.split("/");
    if (parts.length !== 3) {
      return 0; // Handle incorrect date format gracefully
    }
    const birthYear = parseInt(parts[2], 10);
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  // Transform data to include age
  const transformedData = ecgData
    ? ecgData.map((item) => ({
        age: calculateAge(item.bDate || ""), // Ensure a fallback if bDate is null
        ecgDescription: item.ecgDescription,
      }))
    : [];

  return (
    <div className={styles.pageWrapper}>
      <h1 className={styles.title}>ЭКГ-скрининг «Sapa Telemed»</h1>

      <div className={styles.selectorContainer}>
        <RegionOrganizationSelector
          region={region}
          setRegion={setRegion}
          organization={organization}
          setOrganization={setOrganization}
        />
        <br />
        <h2 className={styles.dateLabel}>Данные за период</h2>
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
          {isLoading
            ? "Загрузка..."
            : organization
            ? "Получить результаты для организации"
            : "Получить все результаты"}
        </button>
      </div>

      {isLoading ? (
        <div className={styles.loadingSpinnerContainer}>
          <div className={styles.loadingSpinner}></div>
          <p>Загрузка данных...</p>
        </div>
      ) : ecgData && ecgData.length === 0 ? (
        <p className={styles.noDataMessage}>Нет данных для отображения.</p>
      ) : ecgData ? (
        <>
          <div className={styles.summaryBox}>
            <p>Всего пациентов ЭКГ: <span className={styles.bold}>{summary.total}</span></p>
            <p>Пациенты в зеленой категории (В норме): <span className={styles.bold}>{summary.green}</span></p>
            <p>Пациенты в желтой категории (Патологии): <span className={styles.bold}>{summary.yellow}</span></p>
            <p>Пациенты в оранжевой категории (Aритмии): <span className={styles.bold}>{summary.orange}</span></p>
            <p>Пациенты в красной категории (Жизнеугрожающие аритмии): <span className={styles.bold}>{summary.red}</span></p>
            <p>Пациенты в черной категории (ОКС): <span className={styles.bold}>{summary.black}</span></p>
            <p>Пациенты с гипертонией: <span className={styles.bold}>{summary.lvh}</span></p>
          </div>
          <div className={styles.allGraphsContainer}>
            <div className={styles.graphCard}>
              <GraphOne ecgData={ecgData} />
            </div>
            <div className={styles.graphCard}>
              <GraphTwo ecgData={ecgData} setFilteredPatients={setFilteredPatients} />
            </div>
            <div className={styles.graphCard}>
              <GraphThree ecgData={ecgData} setFilteredPatients={setFilteredPatients} />
            </div>
            <div className={styles.graphCard}>
              <GraphFour ecgData={ecgData} setFilteredPatients={setFilteredPatients} />
            </div>
          </div>
          {organization && (
            <>
              <div className={styles.allGraphsContainer}>
                <div className={styles.graphCard}>
                  <GraphFive ecgData={ecgData} />
                </div>
                <div className={styles.graphCard}>
                  <GraphSix ecgData={transformedData} />
                </div>
              </div>
            </>
          )}

          <div className={styles.patientListWrapper}>
            <PatientDetailsList ecgData={ecgData} filteredPatients={filteredPatients} setFilteredPatients={setFilteredPatients} />
          </div>
        </>
      ) : (
        <p className={styles.noDataMessage}>Пожалуйста, выберите параметры и нажмите "Получить результаты".</p>
      )}
    </div>
  );
}
