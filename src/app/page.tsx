"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import GraphOne from "@/components/GraphOne";
import GraphTwo from "@/components/GraphTwo";

export default function Home() {
  const [activeComponent, setActiveComponent] = useState<number>(1);
  const [region, setRegion] = useState<number | null>(null);
  const [organization, setOrganization] = useState<string>(""); 
  const [dateFrom, setDateFrom] = useState<string>(""); 
  const [dateTo, setDateTo] = useState<string>(""); // Shared state for end date

  const renderComponent = () => {
    switch (activeComponent) {
      case 1:
        return (
          <GraphOne
            region={region}
            setRegion={setRegion}
            organization={organization}
            setOrganization={setOrganization}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
          />
        );
      case 2:
        return (
          <GraphTwo
            region={region}
            setRegion={setRegion}
            organization={organization}
            setOrganization={setOrganization}
            dateFrom={dateFrom}
            setDateFrom={setDateFrom}
            dateTo={dateTo}
            setDateTo={setDateTo}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Результаты телеметрии Sapa Telemed</h1>

      <div className={styles.switcher}>
        <button
          className={`${styles.button} ${
            activeComponent === 1 ? styles.activeButton : ""
          }`}
          onClick={() => setActiveComponent(1)}
        >
          Общие результаты пациентов
        </button>
        <button
          className={`${styles.button} ${
            activeComponent === 2 ? styles.activeButton : ""
          }`}
          onClick={() => setActiveComponent(2)}
        >
          Нарушения ритма сердца
        </button>
      </div>

      <div className={styles.componentContainer}>{renderComponent()}</div>
    </div>
  );
}
