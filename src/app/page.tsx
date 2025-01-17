"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import GraphOne from "@/components/GraphOne";
import GraphTwo from "@/components/GraphTwo";
import GraphThree from "@/components/GraphThree";
import GraphFour from "@/components/GraphFour"; // Import GraphFour

export default function Home() {
  const [activeComponent, setActiveComponent] = useState<number>(1);
  const [region, setRegion] = useState<number | null>(null); // Shared state for region
  const [organization, setOrganization] = useState<string>(""); // Shared state for organization
  const [dateFrom, setDateFrom] = useState<string>(""); // Shared state for start date
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
      case 3:
        return (
          <GraphThree
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
      case 4:
        return (
          <GraphFour
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
        <button
          className={`${styles.button} ${
            activeComponent === 3 ? styles.activeButton : ""
          }`}
          onClick={() => setActiveComponent(3)}
        >
          Атриовентрикулярная блокада
        </button>
        <button
          className={`${styles.button} ${
            activeComponent === 4 ? styles.activeButton : ""
          }`}
          onClick={() => setActiveComponent(4)}
        >
          Нарушение внутрижелудочковой проводимости
        </button>
      </div>

      <div className={styles.componentContainer}>{renderComponent()}</div>
    </div>
  );
}
